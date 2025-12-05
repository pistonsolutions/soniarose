import { Logger, NotFoundException } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { WorkflowsService } from '../workflows/workflows.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

describe('ContactsService', () => {
  const createDto: CreateContactDto = {
    phone: '+15551234567',
    tags: ['Joy'],
  };

  const prismaMock = {
    contact: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      count: jest.fn(),
      delete: jest.fn(),
    },
  } as const;

  const workflowsMock: Pick<WorkflowsService, 'scheduleFiveDaysOfJoy'> = {
    scheduleFiveDaysOfJoy: jest.fn(),
  };

  let service: ContactsService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new ContactsService(prismaMock as unknown as any, workflowsMock as unknown as any);
  });

  it('creates a contact and enqueues the onboarding workflow', async () => {
    const createdContact = { id: 'contact-1' };
    prismaMock.contact.create.mockResolvedValue(createdContact);

    const result = await service.create(createDto);

    expect(prismaMock.contact.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          phone: createDto.phone,
          tags: {
            create: [
              {
                tag: {
                  connectOrCreate: {
                    where: { name: 'Joy' },
                    create: { name: 'Joy' },
                  },
                },
              },
            ],
          },
        }),
      }),
    );
    expect(workflowsMock.scheduleFiveDaysOfJoy).toHaveBeenCalledWith(createdContact.id);
    expect(result).toBe(createdContact);
  });

  it('logs a warning if workflow enqueue fails but still returns the contact', async () => {
    const createdContact = { id: 'contact-2' };
    prismaMock.contact.create.mockResolvedValue(createdContact);
    (workflowsMock.scheduleFiveDaysOfJoy as jest.Mock).mockRejectedValueOnce(new Error('queue down'));
    const warnSpy = jest
      .spyOn((service as unknown as { logger: Logger }).logger, 'warn')
      .mockImplementation();

    const result = await service.create(createDto);

    expect(result).toEqual(createdContact);
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('Failed to enqueue Five Days of Joy workflow for contact-2'),
    );
  });

  it('returns paginated contacts via findAll', async () => {
    const contacts = [{ id: 'a' }, { id: 'b' }];
    prismaMock.contact.findMany.mockResolvedValue(contacts);

    await expect(service.findAll()).resolves.toEqual(contacts);
    expect(prismaMock.contact.findMany).toHaveBeenCalled();
  });

  it('finds a contact or throws when missing', async () => {
    const contact = { id: 'existing' };
    prismaMock.contact.findUnique.mockResolvedValueOnce(contact);
    await expect(service.findOne('existing')).resolves.toEqual(contact);

    prismaMock.contact.findUnique.mockResolvedValueOnce(null);
    await expect(service.findOne('missing')).rejects.toBeInstanceOf(NotFoundException);
  });

  it('updates an existing contact and rewrites tags when provided', async () => {
    const id = 'contact-3';
    const existing = { id };
    prismaMock.contact.findUnique.mockResolvedValue(existing);
    prismaMock.contact.update.mockResolvedValue({ id, firstName: 'Updated' });

    const updateDto = {
      firstName: 'Updated',
      tags: ['UpdatedTag'],
    } as UpdateContactDto;

    const result = await service.update(id, updateDto);

    expect(prismaMock.contact.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id },
        data: expect.objectContaining({
          firstName: 'Updated',
          tags: {
            deleteMany: {},
            create: [
              {
                tag: {
                  connectOrCreate: {
                    where: { name: 'UpdatedTag' },
                    create: { name: 'UpdatedTag' },
                  },
                },
              },
            ],
          },
        }),
      }),
    );
    expect(result).toEqual({ id, firstName: 'Updated' });
  });

  it('remove deletes contact when found and throws when absent', async () => {
    prismaMock.contact.count.mockResolvedValueOnce(1);
    prismaMock.contact.delete.mockResolvedValueOnce({ id: 'contact-4' });

    await expect(service.remove('contact-4')).resolves.toEqual({ id: 'contact-4' });

    prismaMock.contact.count.mockResolvedValueOnce(0);
    await expect(service.remove('missing')).rejects.toBeInstanceOf(NotFoundException);
  });
});
