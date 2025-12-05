import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import { TelnyxModule } from './telnyx/telnyx.module';
import { DatabaseModule } from './database/database.module';
import { ContactsModule } from './contacts/contacts.module';
import { WorkflowsModule } from './workflows/workflows.module';
import { MediaModule } from './media/media.module';
import { ComplianceModule } from './compliance/compliance.module';
import { TasksModule } from './tasks/tasks.module';
import { TemplatesModule } from './templates/templates.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    DatabaseModule,
    HealthModule,
    TelnyxModule,
    ContactsModule,
    WorkflowsModule,
    MediaModule,
    ComplianceModule,
    TasksModule,
    TemplatesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
