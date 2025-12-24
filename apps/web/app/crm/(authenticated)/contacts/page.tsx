'use client';

import Link from 'next/link';
import { useAuth } from '@clerk/nextjs';
import { getContacts } from '@/lib/api';
import { formatDate, formatName, formatOptInStatus } from '@/lib/format';
import { useEffect, useState } from 'react';
import { Contact } from '@/lib/types';

export default function ContactsPage() {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        if (!isLoaded || !isSignedIn) return;

        const token = await getToken();
        const { data, error: apiError } = await getContacts(token);

        if (apiError) {
          setError(apiError);
        } else {
          setContacts(data ?? []);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred loading contacts');
      } finally {
        setLoading(false);
      }
    }

    if (isLoaded) {
      if (!isSignedIn) {
        setLoading(false);
        return;
      }
      loadData();
    }
  }, [isLoaded, isSignedIn, getToken]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-brand-gold"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-semibold">Contacts</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Manage every relationship, their opt-in status, and recent activity.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/crm/contacts/new"
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
            >
              Add contact
            </Link>
            <button
              type="button"
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800"
            >
              Import CSV
            </button>
          </div>
        </div>
        {error && (
          <p className="rounded-md border border-amber-500 bg-amber-100 px-3 py-2 text-xs text-amber-800 dark:border-amber-400 dark:bg-amber-900/30 dark:text-amber-200">
            Unable to reach the API. Showing cached counts where possible.
          </p>
        )}
      </header>

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="border-b border-slate-100 px-6 py-4 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <input
              type="search"
              placeholder="Search by name, phone, or tag (coming soon)"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-slate-700"
              disabled
            />
            <button
              type="button"
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-500 transition dark:border-slate-700 dark:text-slate-400"
              disabled
            >
              Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-sm dark:divide-slate-800">
            <thead className="bg-slate-100/70 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:bg-slate-800/60 dark:text-slate-400">
              <tr>
                <HeaderCell>Name</HeaderCell>
                <HeaderCell>Phone</HeaderCell>
                <HeaderCell>Email</HeaderCell>
                <HeaderCell>Opt-in status</HeaderCell>
                <HeaderCell>Tags</HeaderCell>
                <HeaderCell>Latest message</HeaderCell>
                <HeaderCell>Created</HeaderCell>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-900">
              {contacts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-slate-500 dark:text-slate-400">
                    No contacts yet. Use &ldquo;Add contact&rdquo; to create your first record.
                  </td>
                </tr>
              ) : (
                contacts.map((contact) => {
                  const lastMessage = contact.messages?.[0];

                  return (
                    <tr key={contact.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <DataCell>
                        <Link
                          href={`/crm/contacts/${contact.id}`}
                          className="font-medium text-blue-600 hover:underline dark:text-blue-300"
                        >
                          {formatName(contact.firstName, contact.lastName)}
                        </Link>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{contact.pipelineStage ?? 'No stage'}</p>
                      </DataCell>
                      <DataCell>{contact.phone}</DataCell>
                      <DataCell>{contact.email ?? '—'}</DataCell>
                      <DataCell>
                        <StatusPill status={contact.optInStatus} label={formatOptInStatus(contact.optInStatus)} />
                      </DataCell>
                      <DataCell>
                        <TagList tags={contact.tags?.map((tag) => tag.tag.name) ?? []} />
                      </DataCell>
                      <DataCell>
                        {lastMessage ? (
                          <div className="space-y-1">
                            <p className="line-clamp-2 text-xs text-slate-600 dark:text-slate-300">{lastMessage.body}</p>
                            <p className="text-[10px] uppercase tracking-wide text-slate-400 dark:text-slate-500">
                              {lastMessage.direction.toLowerCase()} · {formatDate(lastMessage.createdAt)}
                            </p>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400 dark:text-slate-500">No messages</span>
                        )}
                      </DataCell>
                      <DataCell>{formatDate(contact.createdAt)}</DataCell>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function HeaderCell({ children }: { children: React.ReactNode }) {
  return <th className="px-6 py-3 text-left">{children}</th>;
}

function DataCell({ children }: { children: React.ReactNode }) {
  return <td className="px-6 py-4 align-top text-sm text-slate-700 dark:text-slate-200">{children}</td>;
}

function StatusPill({ status, label }: { status: string; label: string }) {
  const styles: Record<string, string> = {
    OPTED_IN: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-200',
    OPTED_OUT: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-200',
    UNKNOWN: 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
  };

  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${styles[status] ?? styles.UNKNOWN}`}>
      {label}
    </span>
  );
}

function TagList({ tags }: { tags: string[] }) {
  if (!tags?.length) {
    return <span className="text-xs text-slate-400 dark:text-slate-500">No tags</span>;
  }

  const visible = tags.slice(0, 3);
  const hiddenCount = tags.length - visible.length;

  return (
    <div className="flex flex-wrap gap-1">
      {visible.map((tag) => (
        <span
          key={tag}
          className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-200"
        >
          {tag}
        </span>
      ))}
      {hiddenCount > 0 && (
        <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs text-slate-600 dark:bg-slate-700 dark:text-slate-200">
          +{hiddenCount}
        </span>
      )}
    </div>
  );
}
