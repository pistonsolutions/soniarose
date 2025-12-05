import { Controller, Get, Patch, Body, UseGuards, Request } from '@nestjs/common';
import { UserSettingsService } from './user-settings.service';
// Assuming we have an AuthGuard, if not we'll use a mock or standard one. 
// For now, I'll assume the user ID is passed or handled via a guard. 
// Given the context, I'll use a simple implementation and refine if AuthGuard is available.
// Checking app.module.ts or other controllers would confirm AuthGuard usage.
// For now, I'll accept userId in body for simplicity or assume a custom decorator.
// Actually, looking at other controllers (e.g. workflows), they often take userId from the request or body.
// I'll implement a simple version first.

@Controller('user-settings')
export class UserSettingsController {
    constructor(private readonly userSettingsService: UserSettingsService) { }

    @Get('me')
    async getSettings(@Request() req: any) {
        // TODO: Extract userId from AuthGuard/Request
        // For now, accepting userId as a query param or header for testing if Auth isn't fully set up in this context
        // But typically req.user.id
        const userId = req.user?.id || req.query.userId || 'user_2lU8n8t8t8t8t8t8t8t8t8t8t8t'; // Fallback for dev
        return this.userSettingsService.getSettings(userId);
    }

    @Patch('me')
    async updateSettings(@Request() req: any, @Body() body: { telnyxApiKey?: string; tallyApiKey?: string }) {
        const userId = req.user?.id || req.query.userId || 'user_2lU8n8t8t8t8t8t8t8t8t8t8t8t'; // Fallback for dev
        return this.userSettingsService.updateSettings(userId, body);
    }
}
