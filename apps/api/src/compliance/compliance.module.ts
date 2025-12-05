import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ComplianceController } from './compliance.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [ComplianceController],
})
export class ComplianceModule {}
