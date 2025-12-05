import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Queue } from 'bullmq';
import { PrismaService } from '../database/prisma.service';
import { WORKFLOW_QUEUE_NAME, WORKFLOW_QUEUE_TOKEN } from './workflows.constants';

export type WorkflowJobType = 'FIVE_DAYS_OF_JOY' | 'BIRTHDAY_VIDEO' | 'SEND_VIDEO';

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
  ) {}

  async enqueue(
    type: WorkflowJobType,
    payload: WorkflowJobPayload,
    options?: { delayMs?: number },
  ) {
    const jobName = `${WORKFLOW_QUEUE_NAME}:${type.toLowerCase()}-${payload.contactId}`;

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

  async scheduleBirthdayVideo(contactId: string, runAt: Date) {
    const delayMs = Math.max(runAt.getTime() - Date.now(), 0);
    return this.enqueue('BIRTHDAY_VIDEO', { contactId }, { delayMs });
  }

  async enqueueManualVideo(contactId: string, mediaUrl: string) {
    return this.enqueue('SEND_VIDEO', { contactId, mediaUrl });
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
    const [counts, isPaused] = await Promise.all([
      this.queue.getJobCounts('waiting', 'active', 'completed', 'failed', 'delayed'),
      this.queue.isPaused(),
    ]);

    return {
      counts,
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
