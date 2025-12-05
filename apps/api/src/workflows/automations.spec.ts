import { Test, TestingModule } from '@nestjs/testing';
import { WorkflowsProcessor } from './workflows.processor';
import { WorkflowsService } from './workflows.service';
import { PrismaService } from '../database/prisma.service';
import { TelnyxService } from '../telnyx/telnyx.service';
import { Job } from 'bullmq';
import { WORKFLOW_REDIS_TOKEN } from './workflows.constants';

// Mock BullMQ Worker
jest.mock('bullmq', () => {
    return {
        Worker: jest.fn().mockImplementation(() => ({
            on: jest.fn(),
            close: jest.fn(),
        })),
        Job: class { },
    };
});

describe('WorkflowsProcessor Automations', () => {
    let processor: WorkflowsProcessor;
    let prismaService: PrismaService;
    let workflowsService: WorkflowsService;
    let telnyxService: TelnyxService;

    const mockJob = (data: any): Job => ({
        id: 'job-1',
        data,
    } as any);

    const mockContact = {
        id: 'contact-1',
        userId: 'user-1',
        firstName: 'John',
        phone: '+1234567890',
    };

    const mockRun = {
        id: 'run-1',
        contactId: 'contact-1',
        workflowKey: 'TEST_WORKFLOW',
        status: 'RUNNING',
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                WorkflowsProcessor,
                {
                    provide: PrismaService,
                    useValue: {
                        contact: {
                            findUnique: jest.fn().mockResolvedValue(mockContact),
                        },
                        workflowRun: {
                            findFirst: jest.fn().mockResolvedValue(null),
                            create: jest.fn().mockResolvedValue(mockRun),
                            update: jest.fn().mockResolvedValue(mockRun),
                        },
                        workflowStep: {
                            create: jest.fn().mockResolvedValue({}),
                        },
                        message: {
                            create: jest.fn().mockResolvedValue({ id: 'msg-1' }),
                            update: jest.fn().mockResolvedValue({}),
                        },
                        task: {
                            create: jest.fn().mockResolvedValue({}),
                        },
                    },
                },
                {
                    provide: WorkflowsService,
                    useValue: {
                        enqueue: jest.fn().mockResolvedValue(undefined),
                    },
                },
                {
                    provide: TelnyxService,
                    useValue: {
                        sendSms: jest.fn().mockResolvedValue({ sid: 'telnyx-1' }),
                    },
                },
                {
                    provide: WORKFLOW_REDIS_TOKEN,
                    useValue: {
                        quit: jest.fn(),
                    },
                },
            ],
        }).compile();

        processor = module.get<WorkflowsProcessor>(WorkflowsProcessor);
        prismaService = module.get<PrismaService>(PrismaService);
        workflowsService = module.get<WorkflowsService>(WorkflowsService);
        telnyxService = module.get<TelnyxService>(TelnyxService);
    });

    it('should handle Birthday Greeting and reschedule', async () => {
        // Access private method via any cast or just call handleJob
        await (processor as any).handleJob(mockJob({
            type: 'BIRTHDAY_GREETING',
            payload: { contactId: 'contact-1' },
        }));

        expect(prismaService.contact.findUnique).toHaveBeenCalledWith({ where: { id: 'contact-1' } });
        expect(telnyxService.sendSms).toHaveBeenCalledWith(expect.objectContaining({
            body: expect.stringContaining('Happy Birthday'),
        }));
        expect(workflowsService.enqueue).toHaveBeenCalledWith(
            'BIRTHDAY_GREETING',
            { contactId: 'contact-1' },
            expect.objectContaining({ delayMs: expect.any(Number) })
        );
    });

    it('should handle Holiday Greeting and reschedule', async () => {
        await (processor as any).handleJob(mockJob({
            type: 'HOLIDAY_GREETING',
            payload: { contactId: 'contact-1' },
        }));

        expect(telnyxService.sendSms).toHaveBeenCalledWith(expect.objectContaining({
            body: expect.stringContaining('Merry Christmas'),
        }));
        expect(workflowsService.enqueue).toHaveBeenCalledWith(
            'HOLIDAY_GREETING',
            { contactId: 'contact-1' },
            expect.objectContaining({ delayMs: expect.any(Number) })
        );
    });

    it('should handle Expired Listing sequence', async () => {
        await (processor as any).handleJob(mockJob({
            type: 'EXPIRED_LISTING_SEQ',
            payload: { contactId: 'contact-1', stepIndex: 0 },
        }));

        expect(telnyxService.sendSms).toHaveBeenCalledWith(expect.objectContaining({
            body: expect.stringContaining('expired recently'),
        }));
        expect(workflowsService.enqueue).toHaveBeenCalledWith(
            'EXPIRED_LISTING_SEQ',
            { contactId: 'contact-1', stepIndex: 1 },
            expect.objectContaining({ delayMs: expect.any(Number) })
        );
    });

    it('should handle Call Pipeline by creating a task', async () => {
        await (processor as any).handleJob(mockJob({
            type: 'CALL_PIPELINE_SEQ',
            payload: { contactId: 'contact-1' },
        }));

        expect(prismaService.task.create).toHaveBeenCalledWith(expect.objectContaining({
            data: expect.objectContaining({
                title: 'Call Pipeline Lead',
            }),
        }));
        // Should not send SMS
        expect(telnyxService.sendSms).not.toHaveBeenCalled();
    });

    it('should handle Monthly Newsletter and reschedule', async () => {
        await (processor as any).handleJob(mockJob({
            type: 'MONTHLY_NEWSLETTER',
            payload: { contactId: 'contact-1' },
        }));

        expect(telnyxService.sendSms).toHaveBeenCalledWith(expect.objectContaining({
            body: expect.stringContaining('market update'),
        }));
        expect(workflowsService.enqueue).toHaveBeenCalledWith(
            'MONTHLY_NEWSLETTER',
            { contactId: 'contact-1' },
            expect.objectContaining({ delayMs: expect.any(Number) })
        );
    });
});
