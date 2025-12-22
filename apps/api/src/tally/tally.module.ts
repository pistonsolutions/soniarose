import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TallyController } from './tally.controller';
import { TallyService } from './tally.service';
import { PrismaService } from '../database/prisma.service';
import { WorkflowsModule } from '../workflows/workflows.module';
import { UserSettingsModule } from '../user-settings/user-settings.module';

import { DatabaseModule } from '../database/database.module';

@Module({
    imports: [
        HttpModule,
        DatabaseModule,
        WorkflowsModule,
        UserSettingsModule,
    ], controllers: [TallyController],
    providers: [TallyService, PrismaService],
})
export class TallyModule { }
