import { notFound } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import { getContact } from '@/lib/api';
import { ContactProfile } from '@/components/contacts/contact-profile';
import { formatDate, formatName, formatOptInStatus } from '@/lib/format';
import { EnrollWorkflowDialog } from '@/components/contacts/enroll-workflow-dialog';
import { EditContactDialog } from '@/components/contacts/edit-contact-dialog';

interface ContactPageProps {
  params: {
    id: string;
  };
}

export default async function ContactPage({ params }: { params: { id: string } }) {
  const { getToken } = await auth();
  const token = await getToken();
  const { id } = params;
  const { data: contact, error, status } = await getContact(id, token);

  if (!contact) {
    if (status === 404) {
      notFound();
    }

    return (
      <section className="rounded-2xl border border-rose-400 bg-rose-50 p-10 text-center text-sm text-rose-700 dark:border-rose-500 dark:bg-rose-900/40 dark:text-rose-200">
        {error ?? 'Failed to load contact. Please try again later.'}
      </section>
    );
  }

  const fullName = formatName(contact.firstName, contact.lastName);
  const tags = contact.tags?.map((item) => item.tag.name) ?? [];
  const lastMessage = contact.messages?.[0];
  const complianceEvents = contact.complianceEvents ?? [];

  return (
    <div className="space-y-10">
      <header className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">Contact</p>
            <h2 className="text-4xl font-semibold text-slate-900 dark:text-white">{fullName}</h2>
            <div className="flex flex-wrap gap-2 text-sm text-slate-600 dark:text-slate-300">
              <span className="font-medium">{contact.phone}</span>
              {contact.email && <span className="text-slate-400 dark:text-slate-500">· {contact.email}</span>}
              <span className="text-slate-400 dark:text-slate-500">
                · First seen {formatDate(contact.createdAt)}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              <StatusPill label={formatOptInStatus(contact.optInStatus)} status={contact.optInStatus} />
              {contact.pipelineStage && (
                <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200">
                  {contact.pipelineStage}
                </span>
              )}
              {contact.leadSource && (
                <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  {contact.leadSource}
                </span>
              )}
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 text-xs">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-100 px-3 py-1 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <button
              type="button"
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
            >
              Send SMS
            </button>
            <div className="flex gap-2">
              <EditContactDialog contact={contact} />
              <EnrollWorkflowDialog contactId={contact.id} />
            </div>
          </div>
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <article className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <header className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Recent messages</h3>
            <span className="text-xs text-slate-500 dark:text-slate-400">Last 5 interactions</span>
          </header>
          <ul className="space-y-4">
            {contact.messages?.length ? (
              contact.messages.map((message) => (
                <li key={message.id} className="rounded-lg bg-slate-50 p-4 dark:bg-slate-800/60">
                  <div className="flex items-center justify-between text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    <span>{message.direction === 'OUTBOUND' ? 'sent' : 'received'}</span>
                    <span>{formatDate(message.createdAt)}</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">{message.body}</p>
                </li>
              ))
            ) : (
              <li className="rounded-lg bg-slate-50 p-6 text-center text-sm text-slate-500 dark:bg-slate-800/50 dark:text-slate-400">
                No messages yet. Send the first SMS to start the conversation.
              </li>
            )}
          </ul>
          {lastMessage && (
            <footer className="rounded-lg bg-emerald-50 p-4 text-xs text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200">
              Last activity recorded {formatDate(lastMessage.createdAt)}.
            </footer>
          )}
        </article>

        <aside className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Profile</h3>
            <dl className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <DetailItem label="Phone" value={contact.phone} />
              <DetailItem label="Email" value={contact.email ?? '—'} />
              <DetailItem label="Emotional profile" value={contact.emotionalProfile ?? '—'} />
              <DetailItem label="Birthday" value={formatDate(contact.birthday)} />
              <DetailItem label="Opt-in status" value={formatOptInStatus(contact.optInStatus)} />
            </dl>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Workflow readiness</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Workflow enrolment controls will unlock once runs begin processing. Today&apos;s status
              reflects their most recent automation state.
            </p>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <li>
                <span className="font-medium">Current stage:</span> {contact.pipelineStage ?? 'Not assigned'}
              </li>
              <li>
                <span className="font-medium">Opt-in:</span> {formatOptInStatus(contact.optInStatus)}
              </li>
              <li>
                <span className="font-medium">Last seen:</span> {formatDate(contact.updatedAt ?? contact.createdAt)}
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Compliance events</h3>
            {complianceEvents.length ? (
              <ul className="max-h-64 space-y-2 overflow-y-auto pr-2">
                {complianceEvents.map((event) => (
                  <li
                    key={event.id}
                    className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-200"
                  >
                    <div className="flex items-center justify-between text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      <span>{event.type}</span>
                      <span>{formatDate(event.occurredAt)}</span>
                    </div>
                    {event.payload && (
                      <pre className="mt-2 overflow-x-auto rounded bg-slate-900/90 p-2 text-xs text-slate-100">
                        {JSON.stringify(event.payload, null, 2)}
                      </pre>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-slate-500 dark:text-slate-400">
                No STOP/HELP activity recorded for this contact yet.
              </p>
            )}
          </div>
        </aside>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <header className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Timeline</h3>
          <span className="text-xs text-slate-500 dark:text-slate-400">Most recent 20 events</span>
        </header>
        <ul className="mt-6 space-y-4">
          {contact.timeline?.length ? (
            contact.timeline.map((event) => (
              <li key={event.id} className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/60">
                <div className="flex items-center justify-between text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  <span>{event.type}</span>
                  <span>{formatDate(event.occurredAt)}</span>
                </div>
                {event.description && (
                  <p className="mt-1 text-sm text-slate-700 dark:text-slate-200">{event.description}</p>
                )}
              </li>
            ))
          ) : (
            <li className="rounded-lg bg-slate-50 p-6 text-center text-sm text-slate-500 dark:bg-slate-800/50 dark:text-slate-400">
              No timeline events captured yet. Workflow actions and message activity will show up once
              they start flowing.
            </li>
          )}
        </ul>
      </section>
    </div>
  );
}

function StatusPill({ status, label }: { status: string; label: string }) {
  const styles: Record<string, string> = {
    OPTED_IN: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200',
    OPTED_OUT: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-200',
    UNKNOWN: 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
  };

  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${styles[status] ?? styles.UNKNOWN}`}>
      {label}
    </span>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">{label}</dt>
      <dd className="mt-1 text-sm text-slate-700 dark:text-slate-200">{value}</dd>
    </div>
  );
}
