import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { WorkflowsService } from '../workflows/workflows.service';
import { TelnyxService } from '../telnyx/telnyx.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { MessageDirection, MessageStatus } from '@prisma/client';

@Injectable()
export class ContactsService {
  private readonly logger = new Logger(ContactsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly workflowsService: WorkflowsService,
    private readonly telnyxService: TelnyxService,
  ) { }

  async create(userId: string, payload: CreateContactDto) {
    const { tags = [], ...contactData } = payload;

    try {
      // 1. Upsert Contact (Update details if exists, Create if new)
      // We do NOT update tags here to avoid unique constraint violations on existing ContactTags
      const contact = await this.prisma.contact.upsert({
        where: {
          userId_phone: {
            userId,
            phone: contactData.phone,
          },
        },
        update: {
          ...contactData,
          birthday: contactData.birthday ? new Date(contactData.birthday) : undefined,
        },
        create: {
          ...contactData,
          birthday: contactData.birthday ? new Date(contactData.birthday) : undefined,
          userId,
        },
      });

      // 2. Handle Tags (Idempotent)
      if (tags && tags.length > 0) {
        for (const tagName of tags) {
          // Ensure Tag exists
          const tag = await this.prisma.tag.upsert({
            where: { userId_name: { userId, name: tagName } },
            update: {},
            create: { userId, name: tagName },
          });

          // Ensure Link exists (Ignore if already exists)
          try {
            await this.prisma.contactTag.create({
              data: {
                contactId: contact.id,
                tagId: tag.id,
              },
            });
          } catch (error) {
            // Ignore unique constraint violation (link already exists)
          }
        }
      }

      // 3. Schedule Workflow (Only if new)
      const isNew = contact.createdAt.getTime() > Date.now() - 5000;
      if (isNew) {
        try {
          await this.workflowsService.scheduleFiveDaysOfJoy(contact.id);
        } catch (error) {
          this.logger.warn(`Failed to enqueue Five Days of Joy workflow for ${contact.id}: ${error}`);
        }
      }

      // 4. Return full object
      return this.prisma.contact.findUnique({
        where: { id: contact.id },
        include: {
          tags: {
            include: {
              tag: true,
            },
          },
        },
      });
    } catch (error: any) {
      this.logger.error(`Failed to create/update contact: ${error.message}`, error.stack);
      if (error.code === 'P2002') {
        throw new ConflictException(`Contact with this ${error.meta?.target?.join(', ')} already exists.`);
      }
      throw error;
    }
  }

  findAll(userId: string) {
    return this.prisma.contact.findMany({
      where: { userId },
      include: {
        tags: {
          include: { tag: true },
        },
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });
  }

  async findOne(userId: string, id: string) {
    const contact = await this.prisma.contact.findUnique({
      where: { id },
      include: {
        tags: {
          include: { tag: true },
        },
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 20,
        },
        timeline: {
          orderBy: { occurredAt: 'desc' },
          take: 20,
        },
        complianceEvents: {
          orderBy: { occurredAt: 'desc' },
          take: 20,
        },
      },
    });

    if (!contact || contact.userId !== userId) {
      throw new NotFoundException(`Contact ${id} not found`);
    }

    return contact;
  }

  async update(userId: string, id: string, payload: UpdateContactDto) {
    const { tags, ...contactData } = payload;

    const contact = await this.prisma.contact.findUnique({ where: { id } });
    if (!contact || contact.userId !== userId) {
      throw new NotFoundException(`Contact ${id} not found`);
    }

    return this.prisma.contact.update({
      where: { id },
      data: {
        ...contactData,
        ...(contactData.birthday && { birthday: new Date(contactData.birthday) }),
        ...(tags && {
          tags: {
            deleteMany: {},
            create: tags.map((name: string) => ({
              tag: {
                connectOrCreate: {
                  where: { userId_name: { userId, name } },
                  create: { userId, name },
                },
              },
            })),
          },
        }),
      },
      include: {
        tags: {
          include: { tag: true },
        },
      },
    });
  }

  async remove(userId: string, id: string) {
    const contact = await this.prisma.contact.findUnique({ where: { id } });
    if (!contact || contact.userId !== userId) {
      throw new NotFoundException(`Contact ${id} not found`);
    }

    return this.prisma.contact.delete({ where: { id } });
  }

  async getMessages(userId: string, contactId: string) {
    const contact = await this.prisma.contact.findUnique({ where: { id: contactId } });
    if (!contact || contact.userId !== userId) {
      throw new NotFoundException(`Contact ${contactId} not found`);
    }

    return this.prisma.message.findMany({
      where: { contactId },
      orderBy: { createdAt: 'asc' },
    });
  }

  async sendMessage(userId: string, contactId: string, body: string) {
    const contact = await this.prisma.contact.findUnique({ where: { id: contactId } });
    if (!contact || contact.userId !== userId) {
      throw new NotFoundException(`Contact ${contactId} not found`);
    }

    // Create message in DB first
    const message = await this.prisma.message.create({
      data: {
        contactId,
        direction: MessageDirection.OUTBOUND,
        status: MessageStatus.QUEUED,
        body,
      },
    });

    this.logger.log(`Created queued message ${message.id}. Sending to Telnyx...`);

    try {
      const telnyxMessage = await this.telnyxService.sendSms({
        to: contact.phone,
        body,
      });

      // Update with SID and status
      await this.prisma.message.update({
        where: { id: message.id },
        data: {
          providerMessageId: telnyxMessage.sid,
          status: MessageStatus.SENT, // Assumed sent to Telnyx
          sentAt: new Date(),
        },
      });

      return this.prisma.message.findUnique({ where: { id: message.id } });
    } catch (error: any) {
      this.logger.error(`Failed to send SMS to ${contact.phone}: ${error.message}`);
      await this.prisma.message.update({
        where: { id: message.id },
        data: {
          status: MessageStatus.FAILED,
          errorMessage: error.message,
        },
      });
      throw error;
    }
  }
}
