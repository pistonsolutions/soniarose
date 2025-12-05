import { Inject, Injectable, Logger, OnModuleDestroy, forwardRef } from '@nestjs/common';
import { Job, Worker } from 'bullmq';
import Redis from 'ioredis';
import { WORKFLOW_QUEUE_NAME, WORKFLOW_REDIS_TOKEN } from './workflows.constants';
import { WorkflowQueueData, WorkflowsService } from './workflows.service';
import { PrismaService } from '../database/prisma.service';
import { TelnyxService } from '../telnyx/telnyx.service';
import { WorkflowKey, WorkflowRunStatus, MessageDirection, MessageStatus } from '@prisma/client';

@Injectable()
export class WorkflowsProcessor implements OnModuleDestroy {
  private readonly logger = new Logger(WorkflowsProcessor.name);
  private readonly worker: Worker<WorkflowQueueData>;
  private readonly connection: Redis;

  constructor(
    @Inject(WORKFLOW_REDIS_TOKEN) connection: Redis,
    private readonly prisma: PrismaService,
    private readonly telnyxService: TelnyxService,
    @Inject(forwardRef(() => WorkflowsService)) private readonly workflowsService: WorkflowsService,
  ) {
    this.connection = connection;
    this.worker = new Worker<WorkflowQueueData>(
      WORKFLOW_QUEUE_NAME,
      (job: Job<WorkflowQueueData>) => this.handleJob(job),
      {
        connection,
      },
    );

    this.worker.on('completed', (job: Job<WorkflowQueueData>) => {
      this.logger.debug(`Workflow job ${job.id} completed`);
    });

    this.worker.on('failed', (job: Job<WorkflowQueueData> | undefined, error: Error) => {
      this.logger.error(`Workflow job ${job?.id ?? 'unknown'} failed`, error.stack);
    });
  }

  private async handleJob(job: Job<WorkflowQueueData>) {
    const { type, payload } = job.data;
    this.logger.log(`Processing workflow job ${job.id} of type ${type}`);

    switch (type) {
      case 'FIVE_DAYS_OF_JOY':
        await this.handleFiveDaysOfJoy(payload);
        break;
      case 'BIRTHDAY_VIDEO':
        // TODO: Implement birthday video sending logic.
        break;
      case 'SEND_VIDEO':
        // TODO: Implement manual video sending logic.
        break;
      default:
        this.logger.warn(`Unhandled workflow job type: ${type}`);
    }
  }

  private async handleFiveDaysOfJoy(payload: any) {
    const { contactId, stepIndex = 0 } = payload;
    const contact = await this.prisma.contact.findUnique({ where: { id: contactId } });
    if (!contact) {
      this.logger.warn(`Contact ${contactId} not found for workflow`);
      return;
    }

    // Find or create run
    let run = await this.prisma.workflowRun.findFirst({
      where: {
        contactId,
        workflowKey: WorkflowKey.FIVE_DAYS_OF_JOY,
        status: { in: [WorkflowRunStatus.PENDING, WorkflowRunStatus.RUNNING] },
      },
    });

    if (!run) {
      run = await this.prisma.workflowRun.create({
        data: {
          contactId,
          userId: contact.userId,
          workflowKey: WorkflowKey.FIVE_DAYS_OF_JOY,
          status: WorkflowRunStatus.RUNNING,
          startedAt: new Date(),
        },
      });
    }

    const messages = [
      "Day 0: Welcome to the Five Days of Joy! Here is your PDF link: [LINK]",
      "Day 1: Nurturing message for you.",
      "Day 2: Insightful message for you.",
      "Day 3: Resource message for you.",
      "Day 4: Relationship builder message.",
      "Day 5: Final CTA message.",
    ];

    if (stepIndex >= messages.length) {
      await this.prisma.workflowRun.update({
        where: { id: run.id },
        data: { status: WorkflowRunStatus.COMPLETED, completedAt: new Date() },
      });
      return;
    }

    const body = messages[stepIndex];

    // Send SMS
    try {
      // Create message record
      const message = await this.prisma.message.create({
        data: {
          contactId,
          direction: MessageDirection.OUTBOUND,
          status: MessageStatus.QUEUED,
          body,
        },
      });

      const telnyxMessage = await this.telnyxService.sendSms({
        to: contact.phone,
        body,
      });

      await this.prisma.message.update({
        where: { id: message.id },
        data: {
          providerMessageId: telnyxMessage.sid, // We mapped 'id' to 'sid' in TelnyxService
          status: MessageStatus.SENT,
          sentAt: new Date(),
        },
      });

      // Log step
      await this.prisma.workflowStep.create({
        data: {
          workflowRunId: run.id,
          name: `Day ${stepIndex}`,
          sequence: stepIndex,
          status: WorkflowRunStatus.COMPLETED,
          executedAt: new Date(),
        },
      });

      // Schedule next step
      if (stepIndex + 1 < messages.length) {
        await this.workflowsService.enqueue(
          'FIVE_DAYS_OF_JOY',
          { contactId, stepIndex: stepIndex + 1 },
          { delayMs: 24 * 60 * 60 * 1000 } // 24 hours
        );
      } else {
        await this.prisma.workflowRun.update({
          where: { id: run.id },
          data: { status: WorkflowRunStatus.COMPLETED, completedAt: new Date() },
        });
      }

    } catch (error: any) {
      this.logger.error(`Failed to execute step ${stepIndex} for contact ${contactId}: ${error.message}`);
      await this.prisma.workflowRun.update({
        where: { id: run.id },
        data: { status: WorkflowRunStatus.FAILED, errorMessage: error.message },
      });
      throw error;
    }
  }

  async onModuleDestroy() {
    await this.worker.close();
    if (typeof this.connection.quit === 'function') {
      await this.connection.quit();
    }
  }
}
