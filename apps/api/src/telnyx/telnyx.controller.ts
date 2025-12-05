import { Controller, Post, Body, Headers, HttpCode, BadRequestException, Logger } from '@nestjs/common';
import { TelnyxService } from './telnyx.service';
import { ConfigService } from '@nestjs/config';

@Controller('telnyx')
export class TelnyxController {
    private readonly logger = new Logger(TelnyxController.name);

    constructor(
        private readonly telnyxService: TelnyxService,
        private readonly configService: ConfigService,
    ) { }

    @Post('webhook/CRM')
    @HttpCode(200)
    async handleWebhook(
        @Body() body: any,
        @Headers('telnyx-signature-ed25519') signature: string,
        @Headers('telnyx-timestamp') timestamp: string,
    ) {
        const publicKey = this.configService.get<string>('TELNYX_PUBLIC_KEY');

        // If we don't have a public key configured yet, we might skip validation for testing 
        // but in production it's critical.
        // The service's validateWebhook currently returns true as a placeholder, 
        // but we should pass the params.

        if (!this.telnyxService.validateWebhook(body, signature, timestamp, publicKey || '')) {
            throw new BadRequestException('Invalid webhook signature');
        }

        const eventType = body.data.event_type;
        this.logger.log(`Received Telnyx webhook: ${eventType}`);

        if (eventType === 'message.received') {
            await this.telnyxService.handleIncomingMessage(body);
        } else if (eventType === 'message.finalized') { // or message.sent, message.delivered
            // Telnyx has various status events: message.sent, message.delivered, message.failed
            await this.telnyxService.handleStatusUpdate(body);
        }

        return { status: 'success' };
    }
}
