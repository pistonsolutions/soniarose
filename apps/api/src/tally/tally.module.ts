import { Module } from '@nestjs/common';
import { TallyController } from './tally.controller';
import { TallyService } from './tally.service';
import { PrismaService } from '../database/prisma.service';
import { WorkflowsModule } from '../workflows/workflows.module';
import { UserSettingsModule } from '../user-settings/user-settings.module';

@Module({
    imports: [WorkflowsModule, UserSettingsModule],
    controllers: [TallyController],
    providers: [TallyService, PrismaService],
})
export class TallyModule { }
