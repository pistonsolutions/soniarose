'use client';

import type { InputHTMLAttributes } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';
import { createContact } from '@/lib/api';
interface FormState {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  emotionalProfile: string;
  birthday: string;
  leadSource: string;
  pipelineStage: string;
  optInStatus: 'OPTED_IN' | 'OPTED_OUT' | 'UNKNOWN';
  tags: string;
}

const DEFAULT_STATE: FormState = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  emotionalProfile: '',
  birthday: '',
  leadSource: '',
  pipelineStage: '',
  optInStatus: 'UNKNOWN',
  tags: '',
};

export function ContactForm() {
  const router = useRouter();
  const { getToken } = useAuth();
  const [form, setForm] = useState<FormState>(DEFAULT_STATE);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const onChange = useCallback((field: keyof FormState) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm((current) => ({
        ...current,
        [field]: event.target.value,
      }));
    }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    const tags = form.tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);

    const payload = {
      firstName: form.firstName || undefined,
      lastName: form.lastName || undefined,
      phone: form.phone.length === 10 && !form.phone.startsWith('+') ? `+1${form.phone}` : form.phone,
      email: form.email || undefined,
      emotionalProfile: form.emotionalProfile || undefined,
      birthday: form.birthday || undefined,
      leadSource: form.leadSource || undefined,
      pipelineStage: form.pipelineStage || undefined,
      optInStatus: form.optInStatus,
      tags,
    };

    // Use the token from the top-level hook
    const token = await getToken();

    // Actually, I already added useAuth at the top level in the previous (broken) edit?
    // No, I added it in the previous edit but it was part of the broken block.
    // Let's check the file content again.
    // Line 15: export function ContactForm() {
    // Line 16:   const router = useRouter();
    // Line 17:   const [form, setForm] = useState<FormState>(DEFAULT_STATE);

    // I need to add useAuth here.

    // I will do two edits. One to add useAuth, one to use it.

    // Edit 1: Add useAuth hook.
    // Edit 2: Use token in handleSubmit.

    // This tool call is for Edit 2 (using token).

    const result = await createContact(payload, token);

    if (result.error || !result.data) {
      setError(result.error ?? 'Failed to create contact. Please try again.');
      setSubmitting(false);
      return;
    }

    router.push(`/crm/contacts/${result.data.id}`);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <TextField label="First name" value={form.firstName} onChange={onChange('firstName')} />
        <TextField label="Last name" value={form.lastName} onChange={onChange('lastName')} />
        <TextField label="Phone" value={form.phone} onChange={onChange('phone')} required placeholder="+1 514 555 0123" />
        <TextField label="Email" value={form.email} onChange={onChange('email')} type="email" />
        <TextField label="Emotional profile" value={form.emotionalProfile} onChange={onChange('emotionalProfile')} />
        <TextField label="Birthday" value={form.birthday} onChange={onChange('birthday')} type="date" />
        <TextField label="Lead source" value={form.leadSource} onChange={onChange('leadSource')} />
        <TextField label="Pipeline stage" value={form.pipelineStage} onChange={onChange('pipelineStage')} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200" htmlFor="optInStatus">
            Opt-in status
          </label>
          <select
            id="optInStatus"
            name="optInStatus"
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-slate-700"
            value={form.optInStatus}
            onChange={onChange('optInStatus')}
          >
            <option value="UNKNOWN">Unknown</option>
            <option value="OPTED_IN">Opted in</option>
            <option value="OPTED_OUT">Opted out</option>
          </select>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Contacts must be opted in before receiving automated campaigns.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200" htmlFor="tags">
            Tags
          </label>
          <textarea
            id="tags"
            name="tags"
            rows={3}
            placeholder="joy,list-a,referral"
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-slate-700"
            value={form.tags}
            onChange={onChange('tags')}
          />
          <p className="text-xs text-slate-500 dark:text-slate-400">Separate tags with commas.</p>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-rose-500 bg-rose-100 px-4 py-3 text-sm text-rose-800 dark:border-rose-400 dark:bg-rose-900/30 dark:text-rose-100">
          {error}
        </div>
      )}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          className="rounded-lg bg-brand-brown px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-brand-brown/90 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
          disabled={submitting}
        >
          {submitting ? 'Saving…' : 'Save contact'}
        </button>
        <button
          type="button"
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          onClick={() => router.back()}
          disabled={submitting}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

function TextField({ label, className, ...props }: TextFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-slate-700 dark:text-slate-200" htmlFor={props.id ?? props.name}>
        {label}
      </label>
      <input
        {...props}
        id={props.id ?? props.name}
        className={`rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-slate-700 ${className ?? ''}`.trim()}
      />
    </div>
  );
}
