import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { WorkflowsService, WorkflowJobType } from '../workflows/workflows.service';
import { UserSettingsService } from '../user-settings/user-settings.service';
import { WorkflowKey } from '@prisma/client';

@Injectable()
export class TallyService {
    private readonly logger = new Logger(TallyService.name);

    constructor(
        private readonly prisma: PrismaService,
        private readonly workflowsService: WorkflowsService,
        private readonly userSettingsService: UserSettingsService,
    ) { }

    async processWebhook(payload: any, userId: string) {
        this.logger.log(`Processing Tally webhook for user ${userId}`);

        // 1. Extract Contact Information
        const fields = payload.data?.fields || [];
        // Tally payload structure varies, usually data.fields contains answers with labels

        // Helper to find answer by label (case-insensitive partial match)
        const findAnswer = (labelPart: string) => {
            const field = fields.find((f: any) => f.label?.toLowerCase().includes(labelPart.toLowerCase()));
            return field?.value;
        };

        const email = findAnswer('courriel') || findAnswer('email');
        const phone = findAnswer('téléphone') || findAnswer('phone');
        const firstName = findAnswer('nom') || findAnswer('name'); // Tally often puts full name in one field, or splits it. Assuming full name or first name here.

        // If no email or phone, we can't create a contact reliably
        if (!email && !phone) {
            this.logger.warn('No email or phone found in Tally webhook');
            return { status: 'ignored', reason: 'missing_contact_info' };
        }

        // 2. Create or Update Contact
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
                    firstName: firstName || 'Friend',
                    email,
                    phone: phone || '0000000000', // Placeholder if missing, but ideally we enforce it
                    leadSource: 'Tally Form',
                },
            });
            this.logger.log(`Created new contact ${contact.id}`);
        } else {
            // Update existing contact if needed
            await this.prisma.contact.update({
                where: { id: contact.id },
                data: {
                    leadSource: 'Tally Form', // Or keep original
                    // Update other fields if necessary
                }
            });
            this.logger.log(`Updated existing contact ${contact.id}`);
        }

        // 3. Classification & Workflow Enrollment
        // Form 1: https://tally.so/r/QKKpvG (Seller Lead)
        // Form 2: https://tally.so/r/A7PEko (Buyer Lead)
        // Form 3: https://tally.so/r/mZK1pz (Seller/Nurture)

        const formName = payload.data?.formName || '';

        if (formName.includes('ALERTE IMMOBILIÈRE') || formName.includes('Acheteur')) {
            // Buyer Lead
            await this.workflowsService.enqueue(
                'BUYER_LEAD_START',
                {
                    contactId: contact.id,
                    workflowKey: WorkflowKey.BUYER_LEAD_START,
                    stepIndex: 0
                }
            );
        } else if (formName.includes('VALEUR DE TA PROPRIÉTÉ') || formName.includes('Vendre')) {
            // Seller Lead
            await this.workflowsService.enqueue(
                'SELLER_LEAD_START',
                {
                    contactId: contact.id,
                    workflowKey: WorkflowKey.SELLER_LEAD_START,
                    stepIndex: 0
                }
            );
        } else {
            // Default or Nurture
            await this.workflowsService.enqueue(
                'LONG_TERM_NURTURE',
                {
                    contactId: contact.id,
                    workflowKey: WorkflowKey.LONG_TERM_NURTURE,
                    stepIndex: 0
                }
            );
        }

        return { status: 'success', contactId: contact.id };
    }
}
