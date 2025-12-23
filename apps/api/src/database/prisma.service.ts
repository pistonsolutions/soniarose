import { INestApplication, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@soniarose/database';

@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, 'beforeExit'>
  implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async enableShutdownHooks(app: INestApplication) {
    const shutdown = async () => {
      await app.close();
    };

    try {
      this.$on('beforeExit', shutdown);
    } catch (error) {
      if (error instanceof Error && error.message.includes('"beforeExit" hook is not applicable')) {
        process.once('beforeExit', shutdown);
        return;
      }

      throw error;
    }
  }
}
