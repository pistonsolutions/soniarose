import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class UserSettingsService {
    constructor(private prisma: PrismaService) { }

    async getSettings(userId: string) {
        const settings = await this.prisma.userSettings.findUnique({
            where: { userId },
        });

        if (!settings) {
            // Create default settings if not exists
            return this.prisma.userSettings.create({
                data: { userId },
            });
        }

        return settings;
    }

    async updateSettings(userId: string, data: { telnyxApiKey?: string; tallyApiKey?: string }) {
        return this.prisma.userSettings.upsert({
            where: { userId },
            update: data,
            create: {
                userId,
                ...data,
            },
        });
    }
}
