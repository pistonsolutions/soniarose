'use client';

import type { ChangeEvent, FormEvent } from 'react';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { createContact } from '@/lib/api';
import type { CreateContactPayload } from '@/lib/types';

const INITIAL_FORM: CreateContactPayload = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  emotionalProfile: '',
  birthday: '',
  leadSource: '',
  pipelineStage: '',
  optInStatus: 'UNKNOWN',
};

export function ContactCreatePanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [formState, setFormState] = useState(INITIAL_FORM);
  const [tagsInput, setTagsInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { getToken } = useAuth(); // Added useAuth hook

  const toggleOpen = () => {
    setIsOpen((value) => !value);
    setError(null);
    setSuccessMessage(null);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccessMessage(null);

    const tags = tagsInput
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);

    const payload: CreateContactPayload = {
      ...formState,
      tags,
    };

    startTransition(async () => {
      const token = await getToken(); // Get token
      const result = await createContact(payload, token); // Pass token to createContact

      if (result.error || !result.data) {
        setError(result.error ?? 'Failed to create contact');
        return;
      }

      setSuccessMessage('Contact created. Redirecting…');
      setFormState(INITIAL_FORM);
      setTagsInput('');
      router.push(`/contacts/${result.data.id}`);
      router.refresh();
      setIsOpen(false);
    });
  };

  return (
    <section className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Quick create</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Capture a new lead and enrol them in automations in one step.
          </p>
        </div>
        <button
          type="button"
          onClick={toggleOpen}
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
        >
          {isOpen ? 'Close form' : 'Add contact'}
        </button>
      </header>

      {isOpen && (
        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <LabeledField label="First name">
              <input
                className={inputClassName}
                name="firstName"
                value={formState.firstName as string}
                onChange={handleChange}
                placeholder="Sonia"
                autoComplete="given-name"
              />
            </LabeledField>
            <LabeledField label="Last name">
              <input
                className={inputClassName}
                name="lastName"
                value={formState.lastName as string}
                onChange={handleChange}
                placeholder="Rose"
                autoComplete="family-name"
              />
            </LabeledField>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <LabeledField label="Mobile number" required>
              <input
                className={inputClassName}
                name="phone"
                value={formState.phone as string}
                onChange={handleChange}
                required
                placeholder="+1 555 123 4567"
                autoComplete="tel"
              />
            </LabeledField>
            <LabeledField label="Email">
              <input
                className={inputClassName}
                name="email"
                value={formState.email as string}
                onChange={handleChange}
                placeholder="hello@example.com"
                autoComplete="email"
              />
            </LabeledField>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <LabeledField label="Pipeline stage">
              <input
                className={inputClassName}
                name="pipelineStage"
                value={formState.pipelineStage as string}
                onChange={handleChange}
                placeholder="Nurture"
              />
            </LabeledField>
            <LabeledField label="Lead source">
              <input
                className={inputClassName}
                name="leadSource"
                value={formState.leadSource as string}
                onChange={handleChange}
                placeholder="Referral"
              />
            </LabeledField>
            <LabeledField label="Opt-in status">
              <select
                className={inputClassName}
                name="optInStatus"
                value={(formState.optInStatus as string) ?? 'UNKNOWN'}
                onChange={handleChange}
              >
                <option value="OPTED_IN">Opted in</option>
                <option value="OPTED_OUT">Opted out</option>
                <option value="UNKNOWN">Unknown</option>
              </select>
            </LabeledField>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <LabeledField label="Birthday">
              <input
                type="date"
                name="birthday"
                className={inputClassName}
                value={(formState.birthday as string) ?? ''}
                onChange={handleChange}
              />
            </LabeledField>
            <LabeledField label="Emotional profile">
              <input
                className={inputClassName}
                name="emotionalProfile"
                value={formState.emotionalProfile as string}
                onChange={handleChange}
                placeholder="Joyful, empathic"
              />
            </LabeledField>
          </div>

          <LabeledField label="Tags" helper="Separate by comma. Example: VIP, warm-lead">
            <input
              className={inputClassName}
              name="tags"
              value={tagsInput}
              onChange={(event) => setTagsInput(event.target.value)}
              placeholder="VIP, nurture"
            />
          </LabeledField>

          {error && (
            <p className="rounded-lg border border-rose-500 bg-rose-100 px-3 py-2 text-sm text-rose-700 dark:border-rose-400 dark:bg-rose-900/30 dark:text-rose-200">
              {error}
            </p>
          )}

          {successMessage && (
            <p className="rounded-lg border border-emerald-500 bg-emerald-100 px-3 py-2 text-sm text-emerald-700 dark:border-emerald-400 dark:bg-emerald-900/30 dark:text-emerald-200">
              {successMessage}
            </p>
          )}

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={isPending}
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
            >
              {isPending ? 'Saving…' : 'Create contact'}
            </button>
            <button
              type="button"
              onClick={toggleOpen}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </section>
  );
}

function LabeledField({
  label,
  helper,
  children,
  required,
}: {
  label: string;
  helper?: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="space-y-2 text-sm">
      <span className="flex items-center gap-1 font-medium text-slate-700 dark:text-slate-200">
        {label}
        {required && <span className="text-rose-500">*</span>}
      </span>
      {children}
      {helper && <span className="text-xs text-slate-500 dark:text-slate-400">{helper}</span>}
    </label>
  );
}

const inputClassName =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-slate-700';
