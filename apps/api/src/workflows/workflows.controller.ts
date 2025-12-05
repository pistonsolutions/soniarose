import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { WorkflowsService } from './workflows.service';

@Controller('workflows')
export class WorkflowsController {
  constructor(private readonly workflowsService: WorkflowsService) { }

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
  @Post('enroll')
  async enroll(@Body() body: { contactId: string; workflowKey: string; mediaUrl?: string; runAt?: string }) {
    const { contactId, workflowKey, mediaUrl, runAt } = body;
    switch (workflowKey) {
      case 'SELLER_LEAD_START':
        return this.workflowsService.scheduleSellerLead(contactId);
      case 'BUYER_LEAD_START':
        return this.workflowsService.scheduleBuyerLead(contactId);
      case 'FIVE_DAYS_OF_JOY':
        return this.workflowsService.scheduleFiveDaysOfJoy(contactId);
      case 'POST_TRANSACTION_SEQ':
        return this.workflowsService.schedulePostTransaction(contactId);
      case 'BIRTHDAY_GREETING':
        // For testing, trigger immediately (or 5s delay)
        return this.workflowsService.scheduleBirthdayGreeting(contactId, new Date(Date.now() + 5000));
      case 'HOLIDAY_GREETING':
        // For testing, trigger immediately
        return this.workflowsService.scheduleHolidayGreeting(contactId, new Date(Date.now() + 5000));
      case 'SEND_VIDEO':
        if (!mediaUrl) throw new Error('mediaUrl is required for SEND_VIDEO');
        return this.workflowsService.enqueueManualVideo(contactId, mediaUrl);
      case 'BIRTHDAY_VIDEO':
        if (!mediaUrl) throw new Error('mediaUrl is required for BIRTHDAY_VIDEO');
        // If runAt is provided, use it. Otherwise, we might need to fetch contact's birthday? 
        // For now, let's assume the frontend passes the birthday date as runAt, or we default to immediate for testing?
        // The user said "when day = contact birthday". 
        // Ideally, the backend should look up the contact's birthday.
        // But scheduleBirthdayVideo takes a date.
        // Let's assume for now we pass the date from frontend or fetch it here.
        // To keep it simple and consistent with other handlers, let's fetch the contact here if needed, 
        // OR just rely on the service method if it did the lookup. 
        // But scheduleBirthdayVideo takes `runAt`.
        // Let's update scheduleBirthdayVideo to OPTIONALLY take runAt, and if not, look up contact?
        // No, let's pass runAt from frontend for flexibility, or default to "now" if testing.
        // Realistically, for "Birthday Automation", we probably want to schedule it for the *next* birthday.
        // Let's require runAt for now.
        if (!runAt) throw new Error('runAt is required for BIRTHDAY_VIDEO');
        return this.workflowsService.scheduleBirthdayVideo(contactId, mediaUrl, new Date(runAt));
      default:
        throw new Error(`Unknown workflow key: ${workflowKey}`);
    }
  }
}
