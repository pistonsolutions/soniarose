import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks/tasks.controller';
import { TasksService } from './tasks/tasks.service';
import { TemplatesController } from './templates/templates.controller';
import { TemplatesService } from './templates/templates.service';
import { WorkflowsService } from './workflows/workflows.service';
import { PrismaService } from './database/prisma.service';
import { WORKFLOW_QUEUE_TOKEN } from './workflows/workflows.constants';
import { TaskStatus, TaskPriority, TemplateType } from '@prisma/client';

describe('Day 1 Verification', () => {
    let tasksController: TasksController;
    let templatesController: TemplatesController;
    let workflowsService: WorkflowsService;
    let prismaService: PrismaService;

    const mockPrismaService = {
        task: {
            create: jest.fn(),
            findMany: jest.fn(),
            findUnique: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        },
        messageTemplate: {
            create: jest.fn(),
            findMany: jest.fn(),
            findUnique: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        },
        workflowRun: {
            findMany: jest.fn(),
        },
    };

    const mockQueue = {
        add: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TasksController, TemplatesController],
            providers: [
                TasksService,
                TemplatesService,
                WorkflowsService,
                {
                    provide: PrismaService,
                    useValue: mockPrismaService,
                },
                {
                    provide: WORKFLOW_QUEUE_TOKEN,
                    useValue: mockQueue,
                },
            ],
        }).compile();

        tasksController = module.get<TasksController>(TasksController);
        templatesController = module.get<TemplatesController>(TemplatesController);
        workflowsService = module.get<WorkflowsService>(WorkflowsService);
        prismaService = module.get<PrismaService>(PrismaService);
        jest.clearAllMocks();
    });

    describe('Tasks Module', () => {
        it('should create a task', async () => {
            const dto = { title: 'Test Task', priority: TaskPriority.HIGH };
            const userId = 'user_123';

            mockPrismaService.task.create.mockResolvedValue({ id: 'task_1', ...dto, userId });

            const result = await tasksController.create({ user: { id: userId } }, dto);

            expect(result).toEqual({ id: 'task_1', ...dto, userId });
            expect(mockPrismaService.task.create).toHaveBeenCalledWith({
                data: { ...dto, userId },
            });
        });

        it('should list tasks', async () => {
            const userId = 'user_123';
            mockPrismaService.task.findMany.mockResolvedValue([]);

            await tasksController.findAll({ user: { id: userId } });

            expect(mockPrismaService.task.findMany).toHaveBeenCalledWith(
                expect.objectContaining({ where: { userId } })
            );
        });
    });

    describe('Templates Module', () => {
        it('should create a template', async () => {
            const dto = { name: 'Welcome', body: 'Hello!', type: TemplateType.SMS };
            const userId = 'user_123';

            mockPrismaService.messageTemplate.create.mockResolvedValue({ id: 'tpl_1', ...dto, userId });

            const result = await templatesController.create({ user: { id: userId } }, dto);

            expect(result).toEqual({ id: 'tpl_1', ...dto, userId });
            expect(mockPrismaService.messageTemplate.create).toHaveBeenCalledWith({
                data: { ...dto, userId },
            });
        });
    });

    describe('Workflows Module', () => {
        it('should schedule a seller lead workflow', async () => {
            const contactId = 'contact_123';

            await workflowsService.scheduleSellerLead(contactId);

            expect(mockQueue.add).toHaveBeenCalledWith(
                expect.stringContaining('seller_lead_start'),
                { type: 'SELLER_LEAD_START', payload: { contactId } },
                expect.any(Object)
            );
        });

        it('should schedule a buyer lead workflow', async () => {
            const contactId = 'contact_123';

            await workflowsService.scheduleBuyerLead(contactId);

            expect(mockQueue.add).toHaveBeenCalledWith(
                expect.stringContaining('buyer_lead_start'),
                { type: 'BUYER_LEAD_START', payload: { contactId } },
                expect.any(Object)
            );
        });
    });
});
