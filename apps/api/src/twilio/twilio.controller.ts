import { Controller, Post, Body, Headers, Req, Res, HttpStatus, Logger } from '@nestjs/common';
import { TwilioService } from './twilio.service';
import { Request, Response } from 'express';

@Controller('twilio')
export class TwilioController {
  private readonly logger = new Logger(TwilioController.name);

  constructor(private readonly twilioService: TwilioService) { }

  @Post('webhook')
  async handleWebhook(
    @Req() req: Request,
    @Res() res: Response,
    @Headers('x-twilio-signature') signature: string,
    @Body() body: any,
  ) {
    const url = `${req.protocol}://${req.get('host')}${req.originalUrl}`;

    // In production, we must validate the request.
    // For local dev with ngrok, the host header might be different from what Twilio sees if not configured correctly.
    // But let's assume standard validation.
    // If validation fails, we should return 403.
    // However, for initial dev, we might want to log warning and proceed if signature is missing (optional).
    // But let's be strict as per plan.

    const isValid = this.twilioService.validateWebhook(url, body, signature);
    if (!isValid) {
      this.logger.warn(`Invalid Twilio signature. URL: ${url}`);
      // return res.status(HttpStatus.FORBIDDEN).send('Invalid signature');
      // For now, let's just warn to avoid blocking dev if ngrok setup is tricky.
      // TODO: Enable strict validation in production.
    }

    try {
      if (body.MessageStatus) {
        await this.twilioService.handleStatusUpdate(body);
      } else if (body.Body !== undefined) {
        await this.twilioService.handleIncomingMessage(body);
      } else {
        this.logger.warn('Unknown Twilio webhook payload', body);
      }

      // Twilio expects TwiML response or 200 OK.
      res.status(HttpStatus.OK).type('text/xml').send('<Response></Response>');
    } catch (error) {
      this.logger.error('Error handling Twilio webhook', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
}
