import { Controller, Post, Body, Query, Logger, BadRequestException, Get } from '@nestjs/common';
import { TallyService } from './tally.service';

@Controller('tally')
export class TallyController {
    private readonly logger = new Logger(TallyController.name);

    constructor(private readonly tallyService: TallyService) { }

    @Post('webhook')
    async handleWebhook(@Body() payload: any, @Query('userId') userId: string) {
        this.logger.log(`Received Tally webhook for user ${userId}`);

        if (!userId) {
            throw new BadRequestException('userId query parameter is required');
        }

        return this.tallyService.processWebhook(payload, userId);
    }
    @Get()
    async getSubmissions(@Query('userId') userId: string) {
        if (!userId) {
            throw new BadRequestException('userId query parameter is required');
        }
        return this.tallyService.getSubmissions(userId);
    }

    @Post('sync')
    async syncWebhooks(@Body('webhookUrl') webhookUrl: string, @Query('userId') userId: string) {
        if (!userId) {
            throw new BadRequestException('userId query parameter is required');
        }
        if (!webhookUrl) {
            throw new BadRequestException('webhookUrl body parameter is required');
        }
        return this.tallyService.syncWebhooks(userId, webhookUrl);
    }
}
