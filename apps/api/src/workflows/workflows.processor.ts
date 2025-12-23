import { Inject, Injectable, Logger, OnModuleDestroy, OnModuleInit, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Job, Worker } from 'bullmq';
import Redis from 'ioredis';
import { WORKFLOW_QUEUE_NAME, WORKFLOW_REDIS_TOKEN } from './workflows.constants';
import { WorkflowQueueData, WorkflowsService } from './workflows.service';
import { PrismaService } from '../database/prisma.service';
import { TelnyxService } from '../telnyx/telnyx.service';
import { WorkflowKey, WorkflowRunStatus, MessageDirection, MessageStatus } from '@soniarose/database';

@Injectable()
export class WorkflowsProcessor implements OnModuleDestroy, OnModuleInit {
  private readonly logger = new Logger(WorkflowsProcessor.name);
  private readonly worker: Worker<WorkflowQueueData>;

  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
    private readonly telnyxService: TelnyxService,
    @Inject(forwardRef(() => WorkflowsService)) private readonly workflowsService: WorkflowsService,
  ) {
    const redisUrl = this.configService.get<string>('REDIS_URL', 'redis://localhost:6379');
    // Parse the Redis URL to get host and port
    const redisUrlParsed = new URL(redisUrl);
    const redisHost = redisUrlParsed.hostname || 'localhost';
    const redisPort = parseInt(redisUrlParsed.port || '6379', 10);

    this.logger.log(`Connecting BullMQ worker to Redis at ${redisHost}:${redisPort}`);

    this.worker = new Worker<WorkflowQueueData>(
      WORKFLOW_QUEUE_NAME,
      async (job: Job<WorkflowQueueData>) => {
        console.log(`[DEBUG] Worker received job ${job.id}`);
        return this.handleJob(job);
      },
      {
        connection: {
          host: redisHost,
          port: redisPort,
        },
        autorun: true,
      },
    );

    this.worker.on('completed', (job: Job<WorkflowQueueData>) => {
      this.logger.debug(`Workflow job ${job.id} completed`);
    });

    this.worker.on('failed', (job: Job<WorkflowQueueData> | undefined, error: Error) => {
      this.logger.error(`Workflow job ${job?.id ?? 'unknown'} failed`, error.stack);
    });

    console.log('[DEBUG] WorkflowsProcessor constructor called');
  }

  onModuleInit() {
    console.log('[DEBUG] WorkflowsProcessor onModuleInit called');
    this.logger.log('WorkflowsProcessor initialized');
  }

  onModuleDestroy() {
    this.logger.log('WorkflowsProcessor destroyed');
  }

  private async handleJob(job: Job<WorkflowQueueData>) {
    const { type, payload } = job.data;
    this.logger.log(`Processing workflow job ${job.id} of type ${type}`);
    console.log(`[DEBUG] Handling job ${job.id} type ${type}`);

    try {
      switch (type) {
        case 'FIVE_DAYS_OF_JOY':
          await this.handleFiveDaysOfJoy(payload);
          break;
        case 'POST_TRANSACTION_SEQ':
          await this.handlePostTransaction(payload);
          break;
        case 'BIRTHDAY_GREETING':
          await this.handleBirthdayGreeting(payload);
          break;
        case 'HOLIDAY_GREETING':
          await this.handleHolidayGreeting(payload);
          break;
        case 'SELLER_LEAD_START':
          await this.handleSellerLead(payload);
          break;
        case 'BUYER_LEAD_START':
          await this.handleBuyerLead(payload);
          break;
        case 'EXPIRED_LISTING_SEQ':
          await this.handleExpiredListing(payload);
          break;
        case 'FSBO_SEQ':
          await this.handleFsbo(payload);
          break;
        case 'CALL_PIPELINE_SEQ':
          await this.handleCallPipeline(payload);
          break;
        case 'SIGNS_OF_LIFE':
          await this.handleSignsOfLife(payload);
          break;
        case 'MONTHLY_NEWSLETTER':
          await this.handleMonthlyNewsletter(payload);
          break;
        case 'LONG_TERM_NURTURE':
          await this.handleLongTermNurture(payload);
          break;
        case 'SOCIAL_LEAD_IMPORT':
          await this.handleSocialLeadImport(payload);
          break;
        case 'BIRTHDAY_VIDEO':
          console.log('[DEBUG] Routing to handleBirthdayVideo');
          await this.handleBirthdayVideo(payload);
          break;
        case 'SEND_VIDEO':
          console.log('[DEBUG] Routing to handleManualVideo');
          await this.handleManualVideo(payload);
          break;
        default:
          this.logger.warn(`Unhandled workflow job type: ${type}`);
      }
    } catch (error: any) {
      this.logger.error(`Error processing job ${job.id}: ${error.message}`, error.stack);
      console.error(`[DEBUG] Error in handleJob:`, error);
      throw error;
    }
  }

  // --- Helper: Send Message ---
  private async sendMessage(contact: any, body: string, runId: string, stepName: string, sequence: number, mediaUrl?: string) {
    // Create message record
    const message = await this.prisma.message.create({
      data: {
        contactId: contact.id,
        direction: MessageDirection.OUTBOUND,
        status: MessageStatus.QUEUED,
        body,
        mediaUrl,
      },
    });

    try {
      const telnyxMessage = await this.telnyxService.sendSms({
        to: contact.phone,
        body,
        mediaUrl,
      });

      await this.prisma.message.update({
        where: { id: message.id },
        data: {
          providerMessageId: telnyxMessage.sid,
          status: MessageStatus.SENT,
          sentAt: new Date(),
        },
      });

      // Log step (Idempotent)
      await this.prisma.workflowStep.upsert({
        where: {
          workflowRunId_sequence: {
            workflowRunId: runId,
            sequence: sequence,
          },
        },
        update: {
          status: WorkflowRunStatus.COMPLETED,
          executedAt: new Date(),
        },
        create: {
          workflowRunId: runId,
          name: stepName,
          sequence: sequence,
          status: WorkflowRunStatus.COMPLETED,
          executedAt: new Date(),
        },
      });
    } catch (error: any) {
      this.logger.error(`Failed to send message to ${contact.id}: ${error.message}`);
      await this.prisma.message.update({
        where: { id: message.id },
        data: {
          status: MessageStatus.FAILED,
          errorMessage: error.message,
          errorCode: error.code || 'UNKNOWN',
        },
      });
      throw error;
    }
  }

  // --- Helper: Get or Create Run ---
  private async getOrCreateRun(contactId: string, workflowKey: WorkflowKey, userId: string) {
    let run = await this.prisma.workflowRun.findFirst({
      where: {
        contactId,
        workflowKey,
        status: { in: [WorkflowRunStatus.PENDING, WorkflowRunStatus.RUNNING] },
      },
    });

    if (!run) {
      run = await this.prisma.workflowRun.create({
        data: {
          contactId,
          userId,
          workflowKey,
          status: WorkflowRunStatus.RUNNING,
          startedAt: new Date(),
        },
      });
    }
    return run;
  }

  // --- Automation #1: Seller Lead ---
  private async handleSellerLead(payload: any) {
    const { contactId, stepIndex = 0 } = payload;
    const contact = await this.prisma.contact.findUnique({ where: { id: contactId } });
    if (!contact) return;

    const run = await this.getOrCreateRun(contactId, WorkflowKey.SELLER_LEAD_START, contact.userId);

    const messages = [
      "Hi [FirstName], it's Sonia! 🏡 Thanks for requesting our '7 Signs You're Ready to Sell' guide. Here is the link to download it: [LINK]. Let me know if you have any trouble opening it!",
      "Hi [FirstName], did you know that 80% of online home value estimates are off by 10% or more? 📉 If you're curious about your home's true market value, I can send you a custom report. Just reply 'VALUE'!",
      "Quick tip for you, [FirstName]: Staging isn't just about furniture. 🛋️ It's about lighting and flow. Even small tweaks can add thousands to your sale price. I have a checklist if you want it?",
      "Hi [FirstName], are you thinking of making a move in the next 3-6 months? 🗓️ The market is shifting, and timing is key. Let me know your timeline so I can keep you updated on relevant trends.",
      "Just checking in, [FirstName]! 👋 Did you find the '7 Signs' guide helpful? I'm here if you have any specific questions about the selling process. No pressure, just here to help!",
    ];

    if (stepIndex >= messages.length) {
      await this.prisma.workflowRun.update({
        where: { id: run.id },
        data: { status: WorkflowRunStatus.COMPLETED, completedAt: new Date() },
      });
      return;
    }

    const body = messages[stepIndex].replace('[FirstName]', contact.firstName || 'there');

    try {
      await this.sendMessage(contact, body, run.id, `Seller Lead Step ${stepIndex + 1}`, stepIndex);

      // Schedule next step (daily)
      if (stepIndex + 1 < messages.length) {
        await this.workflowsService.enqueue(
          'SELLER_LEAD_START',
          { contactId, stepIndex: stepIndex + 1 },
          { delayMs: 24 * 60 * 60 * 1000 }
        );
      } else {
        await this.prisma.workflowRun.update({
          where: { id: run.id },
          data: { status: WorkflowRunStatus.COMPLETED, completedAt: new Date() },
        });
      }
    } catch (error: any) {
      await this.prisma.workflowRun.update({
        where: { id: run.id },
        data: { status: WorkflowRunStatus.FAILED, errorMessage: error.message },
      });
    }
  }

  // --- Automation #2: Buyer Lead ---
  private async handleBuyerLead(payload: any) {
    const { contactId, stepIndex = 0 } = payload;
    const contact = await this.prisma.contact.findUnique({ where: { id: contactId } });
    if (!contact) return;

    const run = await this.getOrCreateRun(contactId, WorkflowKey.BUYER_LEAD_START, contact.userId);

    // Step 0: Create UBEE Task (Mocked)
    if (stepIndex === 0) {
      // Create Task
      await this.prisma.task.create({
        data: {
          userId: contact.userId,
          contactId: contact.id,
          title: 'Validate Buyer with UBEE',
          description: 'Check UBEE for buyer pre-approval status.',
          priority: 'HIGH',
          status: 'PENDING',
        },
      });

      // Log step
      await this.prisma.workflowStep.create({
        data: {
          workflowRunId: run.id,
          name: 'Create UBEE Task',
          sequence: 0,
          status: WorkflowRunStatus.COMPLETED,
          executedAt: new Date(),
        },
      });

      // Schedule next step (immediate or short delay)
      await this.workflowsService.enqueue(
        'BUYER_LEAD_START',
        { contactId, stepIndex: 1 },
        { delayMs: 5000 } // 5 seconds
      );
      return;
    }

    const messages = [
      null, // Step 0 was task
      "Hi [FirstName], it's Sonia! 👋 I've started looking for properties that match your criteria. Quick question: What is the ONE non-negotiable feature you need in your new home?",
      "Hi [FirstName], have you spoken with a mortgage broker yet? 💰 Getting pre-approved gives you a huge advantage in this market. I can connect you with my trusted lender if you need a recommendation!",
      "I found a few properties that look promising, [FirstName]. 🏠 Would you like me to send over the listings? Or are you free for a quick 5-min call to refine your search?",
      "Just following up on your search, [FirstName]. 🔎 Are you still actively looking, or are you just browsing for now? Either way is totally fine!",
    ];

    if (stepIndex >= messages.length) {
      await this.prisma.workflowRun.update({
        where: { id: run.id },
        data: { status: WorkflowRunStatus.COMPLETED, completedAt: new Date() },
      });
      return;
    }

    const body = messages[stepIndex]?.replace('[FirstName]', contact.firstName || 'there') || '';

    try {
      await this.sendMessage(contact, body, run.id, `Buyer Lead Step ${stepIndex}`, stepIndex);

      // Schedule next step (daily)
      if (stepIndex + 1 < messages.length) {
        await this.workflowsService.enqueue(
          'BUYER_LEAD_START',
          { contactId, stepIndex: stepIndex + 1 },
          { delayMs: 24 * 60 * 60 * 1000 }
        );
      } else {
        await this.prisma.workflowRun.update({
          where: { id: run.id },
          data: { status: WorkflowRunStatus.COMPLETED, completedAt: new Date() },
        });
      }
    } catch (error: any) {
      await this.prisma.workflowRun.update({
        where: { id: run.id },
        data: { status: WorkflowRunStatus.FAILED, errorMessage: error.message },
      });
    }
  }

  // --- Automation #6: 10 Days of Joy ---
  private async handleFiveDaysOfJoy(payload: any) {
    const { contactId, stepIndex = 0 } = payload;
    const contact = await this.prisma.contact.findUnique({ where: { id: contactId } });
    if (!contact) return;

    const run = await this.getOrCreateRun(contactId, WorkflowKey.FIVE_DAYS_OF_JOY, contact.userId);

    // 5 messages over 10 days (Day 0, 2, 4, 7, 10)
    const schedule = [
      { day: 0, msg: "Hi [FirstName]! Welcome to the 10 Days of Joy! 🌟 I'm so excited to share this journey with you. Here is your first gift - the 'Joy of Living' guide: [LINK]. Enjoy!" },
      { day: 2, msg: "Day 2 of Joy! 🌻 'Happiness is not something ready made. It comes from your own actions.' - Dalai Lama. What's one small thing that made you smile today, [FirstName]?" },
      { day: 4, msg: "Day 4: A little treat for your home! 🕯️ Scent is a powerful mood booster. Try simmering cinnamon and orange slices on your stove today. Your home will smell amazing!" },
      { day: 7, msg: "Day 7: We're almost there! 🚀 I hope you've been enjoying these little moments of joy. Remember to take 5 minutes for yourself today. You deserve it, [FirstName]!" },
      { day: 10, msg: "Day 10: The Grand Finale! 🎉 Thank you for joining me on this 10 Days of Joy. I hope it brought a little extra light to your week. Keep shining! ✨ - Sonia" },
    ];

    if (stepIndex >= schedule.length) {
      await this.prisma.workflowRun.update({
        where: { id: run.id },
        data: { status: 'COMPLETED', completedAt: new Date() },
      });
      return;
    }

    const currentStep = schedule[stepIndex];
    const body = currentStep.msg.replace('[FirstName]', contact.firstName || 'Friend').replace('[LINK]', 'https://soniarose.com/joy');

    try {
      await this.sendMessage(contact, body, run.id, `Joy Step ${stepIndex + 1}`, stepIndex);



      // Schedule next step if available
      if (stepIndex + 1 < schedule.length) {
        const nextStep = schedule[stepIndex + 1];
        const delayDays = nextStep.day - currentStep.day;
        const delayMs = delayDays * 24 * 60 * 60 * 1000;

        await this.workflowsService.enqueue(
          'FIVE_DAYS_OF_JOY',
          { contactId, stepIndex: stepIndex + 1 },
          { delayMs },
        );
      } else {
        await this.prisma.workflowRun.update({
          where: { id: run.id },
          data: { status: 'COMPLETED', completedAt: new Date() },
        });
      }
    } catch (error: any) {
      await this.prisma.workflowRun.update({
        where: { id: run.id },
        data: { status: WorkflowRunStatus.FAILED, errorMessage: error.message },
      });
    }
  }

  private async handlePostTransaction(payload: any) {
    const { contactId, stepIndex = 0 } = payload;
    const contact = await this.prisma.contact.findUnique({ where: { id: contactId } });
    if (!contact) return;

    const run = await this.getOrCreateRun(contactId, WorkflowKey.POST_TRANSACTION_SEQ, contact.userId);

    // 1m, 3m, 6m, 12m
    const schedule = [
      { month: 1, msg: "Hi [FirstName]! It's been a month since the big move. 📦 How are you settling in? Let me know if you need any recommendations for local tradespeople!" },
      { month: 3, msg: "Happy 3-month anniversary in your new home, [FirstName]! 🏡 Hope everything is going smoothly. Just checking in to see if you need anything from me." },
      { month: 6, msg: "Hi [FirstName], can you believe it's been 6 months? ⏳ Time flies! I hope you're making wonderful memories. Sending you warm wishes!" },
      { month: 12, msg: "Happy 1 Year House-versary, [FirstName]! 🎉 It was such a pleasure working with you. I hope you love your home as much today as you did a year ago!" },
    ];

    if (stepIndex >= schedule.length) {
      await this.prisma.workflowRun.update({
        where: { id: run.id },
        data: { status: 'COMPLETED', completedAt: new Date() },
      });
      return;
    }

    const currentStep = schedule[stepIndex];
    const body = currentStep.msg.replace('[FirstName]', contact.firstName || 'Friend');

    try {
      await this.sendMessage(contact, body, run.id, `Post-Transaction Step ${stepIndex + 1}`, stepIndex);



      // Schedule next step
      if (stepIndex + 1 < schedule.length) {
        const nextStep = schedule[stepIndex + 1];
        const delayMonths = nextStep.month - currentStep.month;
        // Approx 30 days per month
        const delayMs = delayMonths * 30 * 24 * 60 * 60 * 1000;

        await this.workflowsService.enqueue(
          'POST_TRANSACTION_SEQ',
          { contactId, stepIndex: stepIndex + 1 },
          { delayMs },
        );
      } else {
        await this.prisma.workflowRun.update({
          where: { id: run.id },
          data: { status: 'COMPLETED', completedAt: new Date() },
        });
      }
    } catch (error: any) {
      await this.prisma.workflowRun.update({
        where: { id: run.id },
        data: { status: WorkflowRunStatus.FAILED, errorMessage: error.message },
      });
    }
  }

  private async handleBirthdayGreeting(payload: any) {
    const { contactId } = payload;
    const contact = await this.prisma.contact.findUnique({ where: { id: contactId } });
    if (!contact) return;

    const run = await this.getOrCreateRun(contactId, WorkflowKey.BIRTHDAY_GREETING, contact.userId);

    const body = "Happy Birthday, [FirstName]! 🎂 Wishing you a fantastic day filled with joy and celebration. - Sonia".replace('[FirstName]', contact.firstName || 'Friend');

    try {
      await this.sendMessage(contact, body, run.id, 'Birthday Message', 0);



      await this.prisma.workflowRun.update({
        where: { id: run.id },
        data: { status: 'COMPLETED', completedAt: new Date() },
      });

      // Reschedule for next year
      const nextYear = new Date();
      nextYear.setFullYear(nextYear.getFullYear() + 1);
      // Keep same month/day, but ensure we don't drift too much if it was a leap year issue, though simple add year is usually fine for biz logic
      // Ideally we'd use the contact's birthday field, but for now we just loop 365 days or 1 year from now.
      // Let's assume we want to trigger exactly 1 year later.
      const delayMs = 365 * 24 * 60 * 60 * 1000;

      await this.workflowsService.enqueue(
        'BIRTHDAY_GREETING',
        { contactId },
        { delayMs }
      );

    } catch (error: any) {
      await this.prisma.workflowRun.update({
        where: { id: run.id },
        data: { status: WorkflowRunStatus.FAILED, errorMessage: error.message },
      });
    }
  }

  private async handleHolidayGreeting(payload: any) {
    const { contactId } = payload;
    const contact = await this.prisma.contact.findUnique({ where: { id: contactId } });
    if (!contact) return;

    const run = await this.getOrCreateRun(contactId, WorkflowKey.HOLIDAY_GREETING, contact.userId);

    const body = "Merry Christmas and Happy Holidays, [FirstName]! 🎄🎁 Wishing you and your loved ones peace, love, and joy this festive season. - Sonia".replace('[FirstName]', contact.firstName || 'Friend');

    try {
      await this.sendMessage(contact, body, run.id, 'Holiday Message', 0);



      await this.prisma.workflowRun.update({
        where: { id: run.id },
        data: { status: 'COMPLETED', completedAt: new Date() },
      });

      // Reschedule for next year
      const delayMs = 365 * 24 * 60 * 60 * 1000;
      await this.workflowsService.enqueue(
        'HOLIDAY_GREETING',
        { contactId },
        { delayMs }
      );

    } catch (error: any) {
      await this.prisma.workflowRun.update({
        where: { id: run.id },
        data: { status: WorkflowRunStatus.FAILED, errorMessage: error.message },
      });
    }
  }

  // --- Automation #3: Expired Listing ---
  private async handleExpiredListing(payload: any) {
    const { contactId, stepIndex = 0 } = payload;
    const contact = await this.prisma.contact.findUnique({ where: { id: contactId } });
    if (!contact) return;

    const run = await this.getOrCreateRun(contactId, WorkflowKey.EXPIRED_LISTING_SEQ, contact.userId);

    const messages = [
      "Hi [FirstName], I noticed your home listing expired recently. 🏠 Sometimes it's just about timing or a fresh marketing approach. Are you still planning to sell?",
      "Hi [FirstName], did you know that many homes don't sell the first time around? 📉 I have a specific strategy for re-listing that gets results. Worth a quick chat?",
      "Just checking in, [FirstName]. 👋 If you're taking a break from the market, I totally understand. But if you want a second opinion on why it didn't move, I'm here.",
    ];

    if (stepIndex >= messages.length) {
      await this.prisma.workflowRun.update({
        where: { id: run.id },
        data: { status: WorkflowRunStatus.COMPLETED, completedAt: new Date() },
      });
      return;
    }

    const body = messages[stepIndex].replace('[FirstName]', contact.firstName || 'there');

    try {
      await this.sendMessage(contact, body, run.id, `Expired Listing Step ${stepIndex + 1}`, stepIndex);

      // Schedule next step (every 3 days)
      if (stepIndex + 1 < messages.length) {
        await this.workflowsService.enqueue(
          'EXPIRED_LISTING_SEQ',
          { contactId, stepIndex: stepIndex + 1 },
          { delayMs: 3 * 24 * 60 * 60 * 1000 }
        );
      } else {
        await this.prisma.workflowRun.update({
          where: { id: run.id },
          data: { status: WorkflowRunStatus.COMPLETED, completedAt: new Date() },
        });
      }
    } catch (error: any) {
      await this.prisma.workflowRun.update({
        where: { id: run.id },
        data: { status: WorkflowRunStatus.FAILED, errorMessage: error.message },
      });
    }
  }

  // --- Automation #5: FSBO ---
  private async handleFsbo(payload: any) {
    const { contactId, stepIndex = 0 } = payload;
    const contact = await this.prisma.contact.findUnique({ where: { id: contactId } });
    if (!contact) return;

    const run = await this.getOrCreateRun(contactId, WorkflowKey.FSBO_SEQ, contact.userId);

    const messages = [
      "Hi [FirstName], I see you're selling your home yourself. 🏡 That's brave! If you ever need a contract reviewed or just some friendly advice, feel free to reach out.",
      "Quick tip [FirstName]: Professional photos make a huge difference. 📸 If you need a recommendation for a photographer, let me know!",
      "Hi [FirstName], how is the sale going? 📉 If you're finding it stressful or time-consuming, I have a 'FSBO Backup Plan' that might interest you.",
    ];

    if (stepIndex >= messages.length) {
      await this.prisma.workflowRun.update({
        where: { id: run.id },
        data: { status: WorkflowRunStatus.COMPLETED, completedAt: new Date() },
      });
      return;
    }

    const body = messages[stepIndex].replace('[FirstName]', contact.firstName || 'there');

    try {
      await this.sendMessage(contact, body, run.id, `FSBO Step ${stepIndex + 1}`, stepIndex);

      // Schedule next step (every 4 days)
      if (stepIndex + 1 < messages.length) {
        await this.workflowsService.enqueue(
          'FSBO_SEQ',
          { contactId, stepIndex: stepIndex + 1 },
          { delayMs: 4 * 24 * 60 * 60 * 1000 }
        );
      } else {
        await this.prisma.workflowRun.update({
          where: { id: run.id },
          data: { status: WorkflowRunStatus.COMPLETED, completedAt: new Date() },
        });
      }
    } catch (error: any) {
      await this.prisma.workflowRun.update({
        where: { id: run.id },
        data: { status: WorkflowRunStatus.FAILED, errorMessage: error.message },
      });
    }
  }

  // --- Automation #8: Call Pipeline ---
  private async handleCallPipeline(payload: any) {
    const { contactId } = payload;
    const contact = await this.prisma.contact.findUnique({ where: { id: contactId } });
    if (!contact) return;

    const run = await this.getOrCreateRun(contactId, WorkflowKey.CALL_PIPELINE_SEQ, contact.userId);

    // Create a task for the agent to call
    await this.prisma.task.create({
      data: {
        userId: contact.userId,
        contactId: contact.id,
        title: 'Call Pipeline Lead',
        description: 'This lead entered the Call Pipeline. Give them a call!',
        priority: 'HIGH',
        status: 'PENDING',
      },
    });

    await this.prisma.workflowStep.create({
      data: {
        workflowRunId: run.id,
        name: 'Create Call Task',
        sequence: 0,
        status: 'COMPLETED',
        executedAt: new Date(),
      },
    });

    await this.prisma.workflowRun.update({
      where: { id: run.id },
      data: { status: 'COMPLETED', completedAt: new Date() },
    });
  }

  // --- Automation #9: Signs of Life ---
  private async handleSignsOfLife(payload: any) {
    const { contactId } = payload;
    const contact = await this.prisma.contact.findUnique({ where: { id: contactId } });
    if (!contact) return;

    const run = await this.getOrCreateRun(contactId, WorkflowKey.SIGNS_OF_LIFE, contact.userId);

    const body = "Hi [FirstName], it's been a while! 👋 I was just thinking about you. How have you been? - Sonia".replace('[FirstName]', contact.firstName || 'Friend');

    try {
      await this.sendMessage(contact, body, run.id, 'Re-engagement Message', 0);



      await this.prisma.workflowRun.update({
        where: { id: run.id },
        data: { status: 'COMPLETED', completedAt: new Date() },
      });
    } catch (error: any) {
      await this.prisma.workflowRun.update({
        where: { id: run.id },
        data: { status: WorkflowRunStatus.FAILED, errorMessage: error.message },
      });
    }
  }

  // --- Automation #12: Monthly Newsletter ---
  private async handleMonthlyNewsletter(payload: any) {
    const { contactId } = payload;
    const contact = await this.prisma.contact.findUnique({ where: { id: contactId } });
    if (!contact) return;

    const run = await this.getOrCreateRun(contactId, WorkflowKey.MONTHLY_NEWSLETTER, contact.userId);

    const body = "Hi [FirstName], here is this month's market update! 📊 [LINK] - Sonia".replace('[FirstName]', contact.firstName || 'Friend').replace('[LINK]', 'https://soniarose.com/newsletter');

    try {
      await this.sendMessage(contact, body, run.id, 'Monthly Newsletter', 0);



      // Reschedule for next month
      const delayMs = 30 * 24 * 60 * 60 * 1000;
      await this.workflowsService.enqueue(
        'MONTHLY_NEWSLETTER',
        { contactId },
        { delayMs }
      );

      await this.prisma.workflowRun.update({
        where: { id: run.id },
        data: { status: 'COMPLETED', completedAt: new Date() },
      });
    } catch (error: any) {
      await this.prisma.workflowRun.update({
        where: { id: run.id },
        data: { status: WorkflowRunStatus.FAILED, errorMessage: error.message },
      });
    }
  }

  // --- Automation: Long Term Nurture ---
  private async handleLongTermNurture(payload: any) {
    const { contactId, stepIndex = 0 } = payload;
    const contact = await this.prisma.contact.findUnique({ where: { id: contactId } });
    if (!contact) return;

    const run = await this.getOrCreateRun(contactId, WorkflowKey.LONG_TERM_NURTURE, contact.userId);

    const messages = [
      "Hi [FirstName], just checking in. 🏡 Hope all is well!",
      "Hi [FirstName], saw this article and thought of you. 📰 [LINK]",
      "Hi [FirstName], hope you're having a great season! 🍂",
      "Hi [FirstName], just wanted to say hello! 👋",
    ];

    // Loop back to start if we run out of messages, or just stop? Let's loop for long term.
    const msgIndex = stepIndex % messages.length;
    const body = messages[msgIndex].replace('[FirstName]', contact.firstName || 'Friend').replace('[LINK]', 'https://soniarose.com/blog');
    try {
      await this.sendMessage(contact, body, run.id, `Nurture Step ${stepIndex + 1}`, stepIndex);

      // Schedule next step (Quarterly - 90 days)
      await this.workflowsService.enqueue(
        'LONG_TERM_NURTURE',
        { contactId, stepIndex: stepIndex + 1 },
        { delayMs: 90 * 24 * 60 * 60 * 1000 }
      );

      await this.prisma.workflowRun.update({
        where: { id: run.id },
        data: { status: 'COMPLETED', completedAt: new Date() },
      });
      await this.prisma.workflowRun.update({
        where: { id: run.id },
        data: { status: 'COMPLETED', completedAt: new Date() },
      });
    } catch (error: any) {
      await this.prisma.workflowRun.update({
        where: { id: run.id },
        data: { status: WorkflowRunStatus.FAILED, errorMessage: error.message },
      });
    }
  }

  // --- Automation: Social Lead Import ---
  private async handleSocialLeadImport(payload: any) {
    const { contactId } = payload;
    const contact = await this.prisma.contact.findUnique({ where: { id: contactId } });
    if (!contact) return;

    const run = await this.getOrCreateRun(contactId, WorkflowKey.SOCIAL_LEAD_IMPORT, contact.userId);

    const body = "Hi [FirstName], thanks for connecting on social media! 📱 I'd love to learn more about your real estate goals. - Sonia".replace('[FirstName]', contact.firstName || 'Friend');

    try {
      await this.sendMessage(contact, body, run.id, 'Social Welcome', 0);



      await this.prisma.workflowRun.update({
        where: { id: run.id },
        data: { status: 'COMPLETED', completedAt: new Date() },
      });
    } catch (error: any) {
      await this.prisma.workflowRun.update({
        where: { id: run.id },
        data: { status: WorkflowRunStatus.FAILED, errorMessage: error.message },
      });
    }
  }

  // --- Automation: Birthday Video ---
  private async handleBirthdayVideo(payload: any) {
    const { contactId, mediaUrl } = payload;
    const contact = await this.prisma.contact.findUnique({ where: { id: contactId } });
    if (!contact) return;

    const run = await this.getOrCreateRun(contactId, WorkflowKey.BIRTHDAY_VIDEO, contact.userId);

    const body = `Happy Birthday [FirstName]! 🎂 I made this video just for you! 🎥 - Sonia`.replace('[FirstName]', contact.firstName || 'Friend');

    try {
      await this.sendMessage(contact, body, run.id, 'Birthday Video', 0, mediaUrl);

      await this.prisma.workflowRun.update({
        where: { id: run.id },
        data: { status: WorkflowRunStatus.COMPLETED, completedAt: new Date() },
      });
    } catch (error: any) {
      await this.prisma.workflowRun.update({
        where: { id: run.id },
        data: { status: WorkflowRunStatus.FAILED, errorMessage: error.message },
      });
    }
  }

  // --- Automation: Manual Video Send ---
  private async handleManualVideo(payload: any) {
    const { contactId, mediaUrl } = payload;
    const contact = await this.prisma.contact.findUnique({ where: { id: contactId } });
    if (!contact) return;

    const run = await this.getOrCreateRun(contactId, WorkflowKey.MANUAL_VIDEO, contact.userId);

    const body = `Hi [FirstName], I wanted to share this video with you! 🎥 - Sonia`.replace('[FirstName]', contact.firstName || 'there');

    try {
      await this.sendMessage(contact, body, run.id, 'Send Video', 0, mediaUrl);

      await this.prisma.workflowRun.update({
        where: { id: run.id },
        data: { status: WorkflowRunStatus.COMPLETED, completedAt: new Date() },
      });
    } catch (error: any) {
      await this.prisma.workflowRun.update({
        where: { id: run.id },
        data: { status: WorkflowRunStatus.FAILED, errorMessage: error.message },
      });
    }
  }
}
