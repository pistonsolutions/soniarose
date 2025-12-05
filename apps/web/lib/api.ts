import { cache } from 'react';
import type {
  ComplianceEventRecord,
  ComplianceSummary,
  Contact,
  CreateContactPayload,
  HealthHeartbeat,
  MediaAssetRecord,
  Message,
  WorkflowOverview,
  WorkflowRun,
} from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api';

type FetchResult<T> = {
  data: T | null;
  error: string | null;
  status: number;
};

type CacheStrategy =
  | { cache: 'force-cache' }
  | { cache: 'no-store' }
  | { next: { revalidate: number } };

async function fetchJson<T>(
  path: string,
  init?: RequestInit,
  token?: string | null,
  cacheStrategy: CacheStrategy = { next: { revalidate: 60 } }
): Promise<FetchResult<T>> {
  const url = `${API_BASE_URL}${path}`;

  try {
    const response = await fetch(url, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(init?.headers ?? {}),
      },
      ...cacheStrategy,
    });

    if (!response.ok) {
      const message = await response.text();
      return {
        data: null,
        error: message || `Request failed with status ${response.status}`,
        status: response.status,
      };
    }

    if (response.status === 204) {
      return {
        data: null,
        error: null,
        status: response.status,
      };
    }

    const json = (await response.json()) as T;
    return { data: json, error: null, status: response.status };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return {
      data: null,
      error: message,
      status: 500,
    };
  }
}

function pruneEmptyValues<T extends object>(input: T) {
  const entries = Object.entries(input as Record<string, unknown>).filter(([, value]) => {
    if (Array.isArray(value)) {
      return value.length > 0;
    }

    return value !== undefined && value !== null && value !== '';
  });

  return Object.fromEntries(entries) as Partial<T>;
}

export const getContacts = cache(async (token?: string | null): Promise<FetchResult<Contact[]>> => {
  const result = await fetchJson<Contact[]>('/contacts', undefined, token, { next: { revalidate: 30 } });

  return {
    data: result.data ?? [],
    error: result.error,
    status: result.status,
  };
});

export const getContact = cache(async (id: string, token?: string | null): Promise<FetchResult<Contact | null>> => {
  const result = await fetchJson<Contact>(`/contacts/${id}`, undefined, token, { next: { revalidate: 30 } });

  return {
    ...result,
    data: result.data,
  };
});

export async function createContact(payload: CreateContactPayload, token?: string | null): Promise<FetchResult<Contact>> {
  const body = JSON.stringify(pruneEmptyValues(payload));
  return fetchJson<Contact>('/contacts', {
    method: 'POST',
    body,
  }, token, { cache: 'no-store' });
}

export const getWorkflowOverview = cache(async (token?: string | null): Promise<FetchResult<WorkflowOverview>> => {
  return fetchJson<WorkflowOverview>('/workflows/overview', undefined, token, { next: { revalidate: 60 } });
});

export const getWorkflowRuns = cache(async (limit = 20, token?: string | null): Promise<FetchResult<WorkflowRun[]>> => {
  const result = await fetchJson<WorkflowRun[]>(`/workflows/runs?limit=${limit}`, undefined, token, { next: { revalidate: 30 } });

  return {
    data: result.data ?? [],
    error: result.error,
    status: result.status,
  };
});

export async function retryWorkflowRun(runId: string, token?: string | null) {
  return fetchJson<{ runId: string; workflowKey: string; contactId: string }>(
    `/workflows/runs/${runId}/retry`,
    {
      method: 'POST',
    },
    token,
    { cache: 'no-store' }
  );
}

export const getMediaAssets = cache(async (limit = 50, token?: string | null): Promise<FetchResult<MediaAssetRecord[]>> => {
  const result = await fetchJson<MediaAssetRecord[]>(`/media?limit=${limit}`, undefined, token, { cache: 'force-cache' });

  return {
    data: result.data ?? [],
    error: result.error,
    status: result.status,
  };
});

export const getComplianceEvents = cache(async (limit = 50, token?: string | null): Promise<FetchResult<ComplianceEventRecord[]>> => {
  const result = await fetchJson<ComplianceEventRecord[]>(`/compliance/events?limit=${limit}`, undefined, token, { next: { revalidate: 60 } });

  return {
    data: result.data ?? [],
    error: result.error,
    status: result.status,
  };
});

export const getComplianceSummary = cache(async (token?: string | null): Promise<FetchResult<ComplianceSummary>> => {
  return fetchJson<ComplianceSummary>('/compliance/summary', undefined, token, { cache: 'force-cache' });
});

export const getHealthHeartbeat = cache(async (token?: string | null): Promise<FetchResult<HealthHeartbeat>> => {
  return fetchJson<HealthHeartbeat>('/health', undefined, token, { cache: 'no-store' });
});

export const getMessages = cache(async (contactId: string, token?: string | null): Promise<FetchResult<Message[]>> => {
  const result = await fetchJson<Message[]>(`/contacts/${contactId}/messages`, undefined, token, { cache: 'no-store' });

  return {
    data: result.data ?? [],
    error: result.error,
    status: result.status,
  };
});

export async function sendMessage(contactId: string, body: string, token?: string | null): Promise<FetchResult<Message>> {
  return fetchJson<Message>(`/contacts/${contactId}/messages`, {
    method: 'POST',
    body: JSON.stringify({ body }),
  }, token, { cache: 'no-store' });
}


