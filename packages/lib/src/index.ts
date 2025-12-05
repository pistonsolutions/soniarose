import { z } from 'zod';

export const contactSchema = z.object({
  id: z.string().uuid(),
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string(),
  email: z.string().email().optional(),
  tags: z.array(z.string()).default([]),
  emotionalProfile: z.string().nullable(),
  birthday: z.string().nullable(),
  leadSource: z.string().nullable(),
  pipelineStage: z.string().nullable(),
  optInStatus: z.enum(['OPTED_IN', 'OPTED_OUT', 'UNKNOWN']).default('UNKNOWN'),
  timelineEvents: z.array(z.string()).default([]),
});

export type Contact = z.infer<typeof contactSchema>;

export const messageDirectionSchema = z.enum(['INBOUND', 'OUTBOUND']);
export type MessageDirection = z.infer<typeof messageDirectionSchema>;

export const workflowKeySchema = z.enum(['FIVE_DAYS_OF_JOY', 'BIRTHDAY_VIDEO', 'MANUAL_VIDEO']);
export type WorkflowKey = z.infer<typeof workflowKeySchema>;

export const optInStatusSchema = z.enum(['OPTED_IN', 'OPTED_OUT', 'UNKNOWN']);
export type OptInStatus = z.infer<typeof optInStatusSchema>;

export const messageStatusSchema = z.enum([
  'QUEUED',
  'SENDING',
  'SENT',
  'DELIVERED',
  'FAILED',
  'RECEIVED',
]);
export type MessageStatus = z.infer<typeof messageStatusSchema>;
