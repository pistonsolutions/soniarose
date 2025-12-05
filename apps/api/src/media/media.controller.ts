import { Controller, Get, Query } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Controller('media')
export class MediaController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  listAssets(@Query('limit') limit?: string) {
    const take = limit ? Number.parseInt(limit, 10) : 50;

    return this.prisma.mediaAsset.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        contact: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            phone: true,
          },
        },
      },
      take: Number.isNaN(take) ? 50 : take,
    });
  }
}
