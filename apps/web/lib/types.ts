export interface ContactTag {
  tag: {
    name: string;
  };
}

export interface Message {
  id: string;
  direction: 'INBOUND' | 'OUTBOUND';
  status: string;
  body: string;
  mediaUrl?: string | null;
  createdAt: string;
}

export interface TimelineEvent {
  id: string;
  type: string;
  description?: string | null;
  occurredAt: string;
}

export interface ComplianceEventRecord {
  id: string;
  type: string;
  payload?: Record<string, unknown> | null;
  occurredAt: string;
  contact?: {
    id: string;
    firstName?: string | null;
    lastName?: string | null;
    phone?: string | null;
  } | null;
}

export interface Contact {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  phone: string;
  email?: string | null;
  emotionalProfile?: string | null;
  birthday?: string | null;
  leadSource?: string | null;
  pipelineStage?: string | null;
  optInStatus: 'OPTED_IN' | 'OPTED_OUT' | 'UNKNOWN';
  tags: ContactTag[];
  messages: Message[];
  timeline?: TimelineEvent[];
  complianceEvents?: ComplianceEventRecord[];
  createdAt: string;
  updatedAt?: string | null;
}

export interface WorkflowStep {
  id: string;
  name: string;
  sequence: number;
  status: 'PENDING' | 'RUNNING' | 'PAUSED' | 'COMPLETED' | 'CANCELLED' | 'FAILED';
  scheduledFor?: string | null;
  executedAt?: string | null;
  payload?: Record<string, unknown> | null;
  errorMessage?: string | null;
}

export interface WorkflowRun {
  id: string;
  workflowKey: 'FIVE_DAYS_OF_JOY' | 'BIRTHDAY_VIDEO' | 'MANUAL_VIDEO';
  status: 'PENDING' | 'RUNNING' | 'PAUSED' | 'COMPLETED' | 'CANCELLED' | 'FAILED';
  createdAt: string;
  startedAt?: string | null;
  completedAt?: string | null;
  cancelledAt?: string | null;
  updatedAt?: string | null;
  errorMessage?: string | null;
  context?: Record<string, unknown> | null;
  contact: {
    id: string;
    firstName?: string | null;
    lastName?: string | null;
    phone: string;
  };
  steps: WorkflowStep[];
}

export interface WorkflowOverview {
  counts: Record<string, number> & {
    waiting: number;
    active: number;
    completed: number;
    failed: number;
    delayed: number;
  };
  paused: boolean;
}

export interface MediaAssetRecord {
  id: string;
  ownerLabel?: string | null;
  objectKey: string;
  mimeType: string;
  sizeBytes: number;
  checksum?: string | null;
  expiresAt?: string | null;
  createdAt: string;
  contact?: {
    id: string;
    firstName?: string | null;
    lastName?: string | null;
    phone?: string | null;
  } | null;
}

export interface ComplianceSummary {
  eventsByType: Array<{ type: string; count: number }>;
  optedOutContacts: number;
  totalEvents: number;
}

export interface HealthHeartbeat {
  status: string;
  timestamp: string;
  uptimeSeconds: number;
}

export interface CreateContactPayload {
  firstName?: string;
  lastName?: string;
  phone: string;
  email?: string;
  emotionalProfile?: string | null;
  birthday?: string | null;
  leadSource?: string | null;
  pipelineStage?: string | null;
  optInStatus?: 'OPTED_IN' | 'OPTED_OUT' | 'UNKNOWN';
  tags?: string[];
}
