import { Test, TestingModule } from '@nestjs/testing';
import { WorkflowsProcessor } from './workflows/workflows.processor';
import { WorkflowsService } from './workflows/workflows.service';
import { PrismaService } from './database/prisma.service';
import { TelnyxService } from './telnyx/telnyx.service';
import { WORKFLOW_REDIS_TOKEN, WORKFLOW_QUEUE_TOKEN } from './workflows/workflows.constants';
import { WorkflowRunStatus } from '@prisma/client';

// Mock BullMQ Worker
jest.mock('bullmq', () => {
    return {
        Worker: jest.fn().mockImplementation(() => ({
            on: jest.fn(),
            close: jest.fn(),
        })),
        Queue: jest.fn(),
    };
});

describe('Day 2 Verification', () => {
    let processor: WorkflowsProcessor;
    let prismaService: any;
    let telnyxService: any;
    let workflowsService: any;

    const mockContact = {
        id: 'contact_1',
        userId: 'user_1',
        firstName: 'John',
        phone: '+15551234567',
    };

    const mockRun = {
        id: 'run_1',
        contactId: 'contact_1',
        status: WorkflowRunStatus.RUNNING,
    };

    beforeEach(async () => {
        jest.clearAllMocks();

        prismaService = {
            contact: {
                findUnique: jest.fn().mockResolvedValue(mockContact),
            },
            workflowRun: {
                findFirst: jest.fn().mockResolvedValue(null), // Always create new run
                create: jest.fn().mockResolvedValue(mockRun),
                update: jest.fn().mockResolvedValue(mockRun),
            },
            message: {
                create: jest.fn().mockResolvedValue({ id: 'msg_1' }),
                update: jest.fn(),
            },
            workflowStep: {
                create: jest.fn(),
            },
            task: {
                create: jest.fn(),
            },
        };

        telnyxService = {
            sendSms: jest.fn().mockResolvedValue({ sid: 'telnyx_1' }),
        };

        workflowsService = {
            enqueue: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                WorkflowsProcessor,
                { provide: PrismaService, useValue: prismaService },
                { provide: TelnyxService, useValue: telnyxService },
                { provide: WorkflowsService, useValue: workflowsService },
                { provide: WORKFLOW_REDIS_TOKEN, useValue: { quit: jest.fn() } }, // Mock Redis
                { provide: WORKFLOW_QUEUE_TOKEN, useValue: { add: jest.fn() } },
            ],
        }).compile();

        processor = module.get<WorkflowsProcessor>(WorkflowsProcessor);
    });

    it('should handle SELLER_LEAD_START (Step 0)', async () => {
        const job = {
            id: 'job_1',
            data: {
                type: 'SELLER_LEAD_START',
                payload: { contactId: 'contact_1', stepIndex: 0 },
            },
        };

        // Access private method
        await (processor as any).handleJob(job);

        // Verify run creation
        expect(prismaService.workflowRun.create).toHaveBeenCalledWith(expect.objectContaining({
            data: expect.objectContaining({ workflowKey: 'SELLER_LEAD_START' }),
        }));

        // Verify message sent
        expect(telnyxService.sendSms).toHaveBeenCalledWith(expect.objectContaining({
            to: mockContact.phone,
            body: expect.stringContaining('7 Signs'),
        }));

        // Verify next step scheduled
        expect(workflowsService.enqueue).toHaveBeenCalledWith(
            'SELLER_LEAD_START',
            { contactId: 'contact_1', stepIndex: 1 },
            expect.objectContaining({ delayMs: 86400000 })
        );
    });

    it('should handle BUYER_LEAD_START (Step 0 - Create Task)', async () => {
        const job = {
            id: 'job_2',
            data: {
                type: 'BUYER_LEAD_START',
                payload: { contactId: 'contact_1', stepIndex: 0 },
            },
        };

        await (processor as any).handleJob(job);

        // Verify task creation
        expect(prismaService.task.create).toHaveBeenCalledWith(expect.objectContaining({
            data: expect.objectContaining({
                title: 'Validate Buyer with UBEE',
                contactId: 'contact_1',
            }),
        }));

        // Verify next step scheduled (short delay)
        expect(workflowsService.enqueue).toHaveBeenCalledWith(
            'BUYER_LEAD_START',
            { contactId: 'contact_1', stepIndex: 1 },
            expect.objectContaining({ delayMs: 5000 })
        );
    });

    it('should handle FIVE_DAYS_OF_JOY (Step 0)', async () => {
        const job = {
            id: 'job_3',
            data: {
                type: 'FIVE_DAYS_OF_JOY',
                payload: { contactId: 'contact_1', stepIndex: 0 },
            },
        };

        await (processor as any).handleJob(job);

        // Verify message sent
        expect(telnyxService.sendSms).toHaveBeenCalledWith(expect.objectContaining({
            body: expect.stringContaining('Welcome to the 10 Days of Joy'),
        }));

        // Verify next step scheduled (Day 0 -> Day 2 = 2 days)
        expect(workflowsService.enqueue).toHaveBeenCalledWith(
            'FIVE_DAYS_OF_JOY',
            { contactId: 'contact_1', stepIndex: 1 },
            expect.objectContaining({ delayMs: 2 * 86400000 })
        );
    });
});
