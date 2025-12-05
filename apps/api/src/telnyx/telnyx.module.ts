import { Global, Module } from '@nestjs/common';
import { TelnyxService } from './telnyx.service';
import { TelnyxController } from './telnyx.controller';
// We might need a controller later for webhooks, but for now just the service.
// Actually, we DO need a controller for webhooks if we want to receive them.
// But the plan didn't explicitly mention creating a controller, but it implied replacing TwilioService.
// TwilioService had a controller (TwilioController) which I saw in the file list but didn't read.
// I should probably create a TelnyxController too to handle the webhooks.
// Let's create the module first, then I'll create the controller.

@Global()
@Module({
    controllers: [TelnyxController],
    providers: [TelnyxService],
    exports: [TelnyxService],
})
export class TelnyxModule { }
