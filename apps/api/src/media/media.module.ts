import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { MulterModule } from '@nestjs/platform-express';
import { PrismaService } from '../database/prisma.service';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads/temp',
    }),
  ],
  controllers: [MediaController],
  providers: [MediaService, PrismaService],
})
export class MediaModule { }
