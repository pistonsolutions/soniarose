import { Controller, Get, Query } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Controller('compliance')
export class ComplianceController {
  constructor(private readonly prisma: PrismaService) { }

  @Get('events')
  async listEvents(@Query('limit') limit?: string) {
    const parsed = limit ? Number.parseInt(limit, 10) : 50;
    const take = Number.isNaN(parsed) ? 50 : parsed;

    return this.prisma.complianceEvent.findMany({
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
      orderBy: { occurredAt: 'desc' },
      take,
    });
  }

  @Get('summary')
  async getSummary() {
    const [groups, optedOutContacts] = await Promise.all([
      this.prisma.complianceEvent.groupBy({
        by: ['type'],
        _count: {
          _all: true,
        },
      }),
      this.prisma.contact.count({
        where: { optInStatus: 'OPTED_OUT' },
      }),
    ]);

    return {
      eventsByType: groups
        .map((group: { type: string; _count: { _all: number } }) => ({
          type: group.type,
          count: group._count?._all ?? 0,
        }))
        .sort((a: { count: number }, b: { count: number }) => b.count - a.count),
      optedOutContacts,
      totalEvents: groups.reduce((sum: number, item: { _count: { _all: number } }) => sum + (item._count?._all ?? 0), 0),
    };
  }
}
