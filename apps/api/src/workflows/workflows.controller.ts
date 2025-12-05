import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { WorkflowsService } from './workflows.service';

@Controller('workflows')
export class WorkflowsController {
  constructor(private readonly workflowsService: WorkflowsService) {}

  @Get('overview')
  getOverview() {
    return this.workflowsService.getQueueMetrics();
  }

  @Get('runs')
  listRuns(@Query('limit') limit?: string) {
    const parsed = limit ? Number.parseInt(limit, 10) : undefined;
    return this.workflowsService.listRecentRuns(Number.isNaN(parsed ?? 0) ? undefined : parsed);
  }

  @Post('runs/:id/retry')
  retryRun(@Param('id') runId: string) {
    return this.workflowsService.retryRun(runId);
  }
}
