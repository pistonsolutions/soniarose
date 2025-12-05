import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Twilio, validateRequest } from 'twilio';
import { PrismaService } from '../database/prisma.service';
import { MessageDirection, MessageStatus } from '@prisma/client';

export interface SendSmsPayload {
  to: string;
  body: string;
  mediaUrl?: string;
}

@Injectable()
export class TwilioService {
  private readonly logger = new Logger(TwilioService.name);
  private client?: Twilio;
  private readonly messagingServiceSid: string;
  private readonly callerId?: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    this.messagingServiceSid = this.configService.get<string>('TWILIO_MESSAGING_SERVICE_SID', '');
    this.callerId = this.configService.get<string>('TWILIO_CALLER_ID');
  }

  validateWebhook(url: string, params: any, signature: string): boolean {
    const authToken = this.configService.get<string>('TWILIO_AUTH_TOKEN');
    if (!authToken) {
      this.logger.error('TWILIO_AUTH_TOKEN not configured');
      return false;
    }
    return validateRequest(authToken, signature, url, params);
  }

  async handleIncomingMessage(params: any) {
    const { From, Body, MessageSid } = params;

    // Find or create contact
    // TODO: This lookup is ambiguous if multiple users have the same contact phone.
    // Needs Phone Number -> User mapping to identify the correct user context.
    let contact = await this.prisma.contact.findFirst({ where: { phone: From } });
    if (!contact) {
      contact = await this.prisma.contact.create({
        data: {
          phone: From,
          leadSource: 'INBOUND_SMS',
          // TODO: Implement proper mapping from Twilio number (To) to User.
          // For now, assigning to 'system' to satisfy schema requirements.
          userId: 'system',
        },
      });
      this.logger.log(`Created new contact for ${From}`);
    }

    // Create message
    return this.prisma.message.create({
      data: {
        contactId: contact.id,
        direction: MessageDirection.INBOUND,
        status: MessageStatus.RECEIVED,
        body: Body || '',
        providerMessageId: MessageSid,
        receivedAt: new Date(),
        metadata: params,
      },
    });
  }

  async handleStatusUpdate(params: any) {
    const { MessageSid, MessageStatus: TwilioStatus } = params;

    let status: MessageStatus = MessageStatus.SENT;
    if (TwilioStatus === 'delivered') status = MessageStatus.DELIVERED;
    if (TwilioStatus === 'failed' || TwilioStatus === 'undelivered') status = MessageStatus.FAILED;
    if (TwilioStatus === 'sent') status = MessageStatus.SENT;
    if (TwilioStatus === 'queued') status = MessageStatus.QUEUED;
    if (TwilioStatus === 'sending') status = MessageStatus.SENDING;

    try {
      await this.prisma.message.update({
        where: { providerMessageId: MessageSid },
        data: {
          status,
          deliveredAt: status === MessageStatus.DELIVERED ? new Date() : undefined
        },
      });
      this.logger.debug(`Updated status for message ${MessageSid} to ${status}`);
    } catch (error: any) {
      this.logger.warn(`Could not update status for message ${MessageSid}: ${error.message}`);
    }
  }

  async sendSms(payload: SendSmsPayload) {
    const { to, body, mediaUrl } = payload;

    this.logger.debug(`Sending SMS to ${to}`);

    const client = this.getClient();

    const message = await client.messages.create({
      to,
      from: this.messagingServiceSid ? undefined : this.callerId,
      messagingServiceSid: this.messagingServiceSid || undefined,
      body,
      mediaUrl: mediaUrl ? [mediaUrl] : undefined,
    });

    // We should also save the outbound message to the DB here, or let the caller do it.
    // Ideally, the caller (Workflows or API) creates the DB record first as QUEUED, then we update it with the SID.
    // But for simplicity, let's assume the caller handles the DB creation for now, or we return the SID and they update it.
    // Actually, looking at the plan, I didn't specify where outbound messages are saved.
    // Let's return the full message object so the caller can use the SID.

    return message;
  }

  private getClient() {
    if (!this.client) {
      const accountSid = this.configService.get<string>('TWILIO_ACCOUNT_SID');
      const authToken = this.configService.get<string>('TWILIO_AUTH_TOKEN');

      if (!accountSid || !authToken) {
        throw new Error('Twilio credentials are not configured');
      }

      this.client = new Twilio(accountSid, authToken);
    }

    return this.client;
  }
}
