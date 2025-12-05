import { Inject, Module, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Queue } from 'bullmq';
import Redis from 'ioredis';
import { WorkflowsService } from './workflows.service';
import { WorkflowsProcessor } from './workflows.processor';
import { WorkflowsController } from './workflows.controller';
import { WORKFLOW_QUEUE_NAME, WORKFLOW_QUEUE_TOKEN, WORKFLOW_REDIS_TOKEN } from './workflows.constants';

@Module({
  controllers: [WorkflowsController],
  providers: [
    {
      provide: WORKFLOW_REDIS_TOKEN,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const redisUrl = configService.get<string>('REDIS_URL', 'redis://localhost:6379');
        return new Redis(redisUrl, { maxRetriesPerRequest: null });
      },
    },
    {
      provide: WORKFLOW_QUEUE_TOKEN,
      inject: [WORKFLOW_REDIS_TOKEN],
      useFactory: (connection: Redis) =>
        new Queue(WORKFLOW_QUEUE_NAME, {
          connection,
          defaultJobOptions: {
            attempts: 5,
            backoff: {
              type: 'exponential',
              delay: 1000,
            },
            removeOnComplete: true,
            removeOnFail: 50,
          },
        }),
    },
    WorkflowsService,
    WorkflowsProcessor,
  ],
  exports: [WorkflowsService, WORKFLOW_QUEUE_TOKEN, WORKFLOW_REDIS_TOKEN],
})
export class WorkflowsModule implements OnModuleDestroy {
  constructor(
    @Inject(WORKFLOW_QUEUE_TOKEN) private readonly queue: Queue,
    @Inject(WORKFLOW_REDIS_TOKEN) private readonly connection: Redis,
  ) {}

  async onModuleDestroy() {
    await this.queue.close();
    try {
      await this.connection.quit();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('Failed to close Redis connection cleanly', error);
    }
  }
}
