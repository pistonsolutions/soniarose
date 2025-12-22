import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { WorkflowsService, WorkflowJobType } from '../workflows/workflows.service';
import { UserSettingsService } from '../user-settings/user-settings.service';
import { WorkflowKey } from '@prisma/client';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TallyService {
    private readonly logger = new Logger(TallyService.name);

    constructor(
        private readonly prisma: PrismaService,
        private readonly workflowsService: WorkflowsService,
        private readonly userSettingsService: UserSettingsService,
        private readonly httpService: HttpService,
    ) { }

    async processWebhook(payload: any, userId: string) {
        this.logger.log(`Processing Tally webhook for user ${userId}`);

        const formId = payload.data?.formId || 'unknown';
        const formName = payload.data?.formName || 'Unknown Form';

        // 1. Log Submission
        const submission = await this.prisma.formSubmission.create({
            data: {
                userId,
                formId,
                formName,
                payload,
                status: 'PROCESSING',
            },
        });

        try {
            // 2. Extract Contact Information
            const fields = payload.data?.fields || [];

            const findAnswer = (labelPart: string) => {
                const field = fields.find((f: any) => f.label?.toLowerCase().includes(labelPart.toLowerCase()));
                return field?.value;
            };

            const email = findAnswer('courriel') || findAnswer('email');
            const phone = findAnswer('téléphone') || findAnswer('phone');
            const firstName = findAnswer('nom') || findAnswer('name') || 'Friend';

            if (!email && !phone) {
                this.logger.warn('No email or phone found in Tally webhook');
                await this.prisma.formSubmission.update({
                    where: { id: submission.id },
                    data: { status: 'IGNORED' },
                });
                return { status: 'ignored', reason: 'missing_contact_info' };
            }

            // 3. Create or Update Contact
            let contact = await this.prisma.contact.findFirst({
                where: {
                    userId,
                    OR: [
                        { email: email || undefined },
                        { phone: phone || undefined },
                    ],
                },
            });

            if (!contact) {
                contact = await this.prisma.contact.create({
                    data: {
                        userId,
                        firstName,
                        email,
                        phone: phone || '0000000000',
                        leadSource: 'Tally Form',
                    },
                });
                this.logger.log(`Created new contact ${contact.id}`);
            } else {
                await this.prisma.contact.update({
                    where: { id: contact.id },
                    data: { leadSource: 'Tally Form' },
                });
                this.logger.log(`Updated existing contact ${contact.id}`);
            }

            // Link submission to contact
            await this.prisma.formSubmission.update({
                where: { id: submission.id },
                data: {
                    contactId: contact.id,
                    status: 'PROCESSED',
                },
            });

            // 4. Workflow Enrollment
            if (formName.includes('ALERTE IMMOBILIÈRE') || formName.includes('Acheteur')) {
                await this.workflowsService.enqueue('BUYER_LEAD_START', { contactId: contact.id, workflowKey: WorkflowKey.BUYER_LEAD_START, stepIndex: 0 });
            } else if (formName.includes('VALEUR DE TA PROPRIÉTÉ') || formName.includes('Vendre')) {
                await this.workflowsService.enqueue('SELLER_LEAD_START', { contactId: contact.id, workflowKey: WorkflowKey.SELLER_LEAD_START, stepIndex: 0 });
            } else {
                await this.workflowsService.enqueue('LONG_TERM_NURTURE', { contactId: contact.id, workflowKey: WorkflowKey.LONG_TERM_NURTURE, stepIndex: 0 });
            }

            return { status: 'success', contactId: contact.id };

        } catch (error) {
            this.logger.error('Error processing webhook', error);
            await this.prisma.formSubmission.update({
                where: { id: submission.id },
                data: { status: 'FAILED' },
            });
            throw error;
        }
    }

    async getSubmissions(userId: string) {
        return this.prisma.formSubmission.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            include: { contact: true },
        });
    }

    async syncWebhooks(userId: string, webhookUrl: string) {
        this.logger.log(`Syncing webhooks for user ${userId} to ${webhookUrl}`);

        const settings = await this.userSettingsService.getSettings(userId);
        if (!settings || !settings.tallyApiKey) {
            throw new Error('Tally API Key not found');
        }

        const apiKey = settings.tallyApiKey;
        const headers = { Authorization: `Bearer ${apiKey}` };

        // 1. Fetch all forms
        const { data: formsData } = await firstValueFrom(
            this.httpService.get('https://api.tally.so/forms', { headers })
        );

        const forms = formsData.data || [];
        this.logger.log(`Found ${forms.length} forms`);

        let updatedCount = 0;

        // 2. Update webhook for each form
        for (const form of forms) {
            try {
                await firstValueFrom(
                    this.httpService.post(
                        `https://api.tally.so/forms/${form.id}/webhooks`,
                        {
                            url: webhookUrl,
                            events: ['FORM_RESPONSE'],
                        },
                        { headers }
                    )
                );
                updatedCount++;
            } catch (error) {
                this.logger.error(`Failed to update webhook for form ${form.id}`, error);
                // Continue with other forms
            }
        }

        return { status: 'success', updated: updatedCount, total: forms.length };
    }
}
