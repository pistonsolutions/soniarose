import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { Worker, Job } from 'bullmq';
import Redis from 'ioredis';
import { MediaService } from './media.service';
import { MEDIA_QUEUE_NAME, MEDIA_REDIS_TOKEN } from './media.constants';

export interface MediaJobData {
    assetId: string;
    filePath: string;
    filename: string;
    userId: string;
    contactIds: string[];
    ownerLabel?: string;
}

@Injectable()
export class MediaProcessor implements OnModuleInit {
    private readonly logger = new Logger(MediaProcessor.name);
    private worker: Worker | null = null;

    constructor(
        @Inject(MEDIA_REDIS_TOKEN) private readonly connection: Redis,
        private readonly mediaService: MediaService,
    ) { }

    onModuleInit() {
        console.log('[DEBUG] MediaProcessor onModuleInit called');

        this.worker = new Worker<MediaJobData>(
            MEDIA_QUEUE_NAME,
            async (job: Job<MediaJobData>) => {
                console.log(`[DEBUG] Media worker received job ${job.id}`);
                this.logger.log(`Processing media job ${job.id} for asset ${job.data.assetId}`);

                try {
                    await this.mediaService.processMediaJob(job.data);
                    this.logger.debug(`Media job ${job.id} completed`);
                } catch (error: any) {
                    this.logger.error(`Media job ${job.id} failed: ${error.message}`);
                    throw error;
                }
            },
            {
                connection: this.connection,
                concurrency: 1, // Process one at a time to avoid overloading the micro instance
            },
        );

        this.worker.on('completed', (job: Job<MediaJobData>) => {
            this.logger.debug(`Media job ${job.id} completed`);
        });

        this.worker.on('failed', (job: Job<MediaJobData> | undefined, err: Error) => {
            this.logger.error(`Media job ${job?.id} failed: ${err.message}`);
        });

        this.logger.log('MediaProcessor initialized');
    }

    async onModuleDestroy() {
        if (this.worker) {
            await this.worker.close();
        }
    }
}
