import { Inject, Module, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Queue } from 'bullmq';
import Redis from 'ioredis';
import { MulterModule } from '@nestjs/platform-express';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { MediaProcessor } from './media.processor';
import { PrismaService } from '../database/prisma.service';
import { MEDIA_QUEUE_NAME, MEDIA_QUEUE_TOKEN, MEDIA_REDIS_TOKEN } from './media.constants';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads/temp',
    }),
  ],
  controllers: [MediaController],
  providers: [
    {
      provide: MEDIA_REDIS_TOKEN,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const redisUrl = configService.get<string>('REDIS_URL', 'redis://localhost:6379');
        return new Redis(redisUrl, { maxRetriesPerRequest: null });
      },
    },
    {
      provide: MEDIA_QUEUE_TOKEN,
      inject: [MEDIA_REDIS_TOKEN],
      useFactory: (connection: Redis) =>
        new Queue(MEDIA_QUEUE_NAME, {
          connection,
          defaultJobOptions: {
            attempts: 3,
            backoff: {
              type: 'exponential',
              delay: 5000,
            },
            removeOnComplete: true,
            removeOnFail: 50,
          },
        }),
    },
    MediaService,
    MediaProcessor,
    PrismaService,
  ],
})
export class MediaModule implements OnModuleDestroy {
  constructor(
    @Inject(MEDIA_QUEUE_TOKEN) private readonly queue: Queue,
    @Inject(MEDIA_REDIS_TOKEN) private readonly connection: Redis,
    private readonly mediaProcessor: MediaProcessor,
  ) { }

  async onModuleDestroy() {
    await this.queue.close();
    try {
      await this.connection.quit();
    } catch (error) {
      console.warn('Failed to close Media Redis connection cleanly', error);
    }
  }
}
