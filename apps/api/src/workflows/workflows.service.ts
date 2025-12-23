import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Queue } from 'bullmq';
import { PrismaService } from '../database/prisma.service';
import { WORKFLOW_QUEUE_NAME, WORKFLOW_QUEUE_TOKEN } from './workflows.constants';

export type WorkflowJobType =
  | 'FIVE_DAYS_OF_JOY'
  | 'BIRTHDAY_VIDEO'
  | 'SEND_VIDEO'
  | 'SELLER_LEAD_START'
  | 'BUYER_LEAD_START'
  | 'SOCIAL_LEAD_IMPORT'
  | 'EXPIRED_LISTING_SEQ'
  | 'FSBO_SEQ'
  | 'CALL_PIPELINE_SEQ'
  | 'SIGNS_OF_LIFE'
  | 'MONTHLY_NEWSLETTER'
  | 'POST_TRANSACTION_SEQ'
  | 'BIRTHDAY_GREETING'
  | 'LONG_TERM_NURTURE'
  | 'HOLIDAY_GREETING';

export interface WorkflowJobPayload {
  contactId: string;
  enqueueMeta?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface WorkflowQueueData {
  type: WorkflowJobType;
  payload: WorkflowJobPayload;
}

@Injectable()
export class WorkflowsService {
  private readonly logger = new Logger(WorkflowsService.name);

  constructor(
    @Inject(WORKFLOW_QUEUE_TOKEN) private readonly queue: Queue<WorkflowQueueData>,
    private readonly prisma: PrismaService,
  ) { }

  async enqueue(
    type: WorkflowJobType,
    payload: WorkflowJobPayload,
    options?: { delayMs?: number },
  ) {
    // Append stepIndex to ensure unique job IDs for each step of the workflow
    const stepSuffix = payload.stepIndex !== undefined ? `-${payload.stepIndex}` : `-${Date.now()}`;
    const jobName = `${WORKFLOW_QUEUE_NAME}:${type.toLowerCase()}-${payload.contactId}${stepSuffix}`;

    this.logger.debug(`Enqueuing workflow job ${jobName}`);

    return this.queue.add(
      jobName,
      {
        type,
        payload,
      },
      {
        delay: options?.delayMs ?? 0,
        jobId: jobName,
      },
    );
  }

  async scheduleFiveDaysOfJoy(contactId: string) {
    return this.enqueue('FIVE_DAYS_OF_JOY', { contactId });
  }

  async scheduleBirthdayVideo(contactId: string, mediaUrl: string, runAt: Date) {
    const delayMs = Math.max(runAt.getTime() - Date.now(), 0);
    return this.enqueue('BIRTHDAY_VIDEO', { contactId, mediaUrl }, { delayMs });
  }

  async enqueueManualVideo(contactId: string, mediaUrl: string) {
    return this.enqueue('SEND_VIDEO', { contactId, mediaUrl });
  }

  async scheduleSellerLead(contactId: string) {
    return this.enqueue('SELLER_LEAD_START', { contactId });
  }

  async scheduleBuyerLead(contactId: string) {
    return this.enqueue('BUYER_LEAD_START', { contactId });
  }

  async scheduleSocialLeadImport(contactId: string) {
    return this.enqueue('SOCIAL_LEAD_IMPORT', { contactId });
  }

  async scheduleExpiredListing(contactId: string) {
    return this.enqueue('EXPIRED_LISTING_SEQ', { contactId });
  }

  async scheduleFsbo(contactId: string) {
    return this.enqueue('FSBO_SEQ', { contactId });
  }

  async scheduleCallPipeline(contactId: string) {
    return this.enqueue('CALL_PIPELINE_SEQ', { contactId });
  }

  async scheduleSignsOfLife(contactId: string) {
    return this.enqueue('SIGNS_OF_LIFE', { contactId });
  }

  async scheduleMonthlyNewsletter(contactId: string) {
    return this.enqueue('MONTHLY_NEWSLETTER', { contactId });
  }

  async schedulePostTransaction(contactId: string) {
    return this.enqueue('POST_TRANSACTION_SEQ', { contactId });
  }

  async scheduleBirthdayGreeting(contactId: string, runAt: Date) {
    const delayMs = Math.max(runAt.getTime() - Date.now(), 0);
    return this.enqueue('BIRTHDAY_GREETING', { contactId }, { delayMs });
  }

  async scheduleHolidayGreeting(contactId: string, runAt: Date) {
    const delayMs = Math.max(runAt.getTime() - Date.now(), 0);
    return this.enqueue('HOLIDAY_GREETING', { contactId }, { delayMs });
  }

  async scheduleLongTermNurture(contactId: string) {
    return this.enqueue('LONG_TERM_NURTURE', { contactId });
  }

  async listRecentRuns(limit = 25) {
    return this.prisma.workflowRun.findMany({
      include: {
        contact: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            phone: true,
          },
        },
        steps: {
          orderBy: { sequence: 'asc' },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }

  async getQueueMetrics() {
    const [queueCounts, isPaused, dbCounts] = await Promise.all([
      this.queue.getJobCounts('waiting', 'active', 'completed', 'failed', 'delayed'),
      this.queue.isPaused(),
      this.prisma.workflowRun.groupBy({
        by: ['status'],
        _count: true,
      }),
    ]);

    // Map DB status to Queue status keys for the dashboard
    const dbMap = dbCounts.reduce((acc: Record<string, number>, curr: { status: string; _count: number }) => {
      acc[curr.status] = curr._count;
      return acc;
    }, {} as Record<string, number>);

    // Merge: Use DB counts for persistent states (Completed, Failed, Active/Running), Queue for transient (Waiting, Delayed)
    const mergedCounts = {
      waiting: queueCounts.waiting,
      active: dbMap['RUNNING'] ?? 0, // Use DB RUNNING count for "In progress"
      completed: dbMap['COMPLETED'] ?? 0,
      failed: dbMap['FAILED'] ?? 0,
      delayed: queueCounts.delayed,
    };

    return {
      counts: mergedCounts,
      paused: isPaused,
    };
  }

  async retryRun(runId: string) {
    const existing = await this.prisma.workflowRun.findUnique({
      where: { id: runId },
      select: {
        id: true,
        workflowKey: true,
        contactId: true,
      },
    });

    if (!existing) {
      throw new NotFoundException(`Workflow run ${runId} not found`);
    }

    await this.enqueue(existing.workflowKey as WorkflowJobType, { contactId: existing.contactId });

    return {
      runId,
      workflowKey: existing.workflowKey,
      contactId: existing.contactId,
    };
  }
}
