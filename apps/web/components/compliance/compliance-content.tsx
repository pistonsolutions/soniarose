import type { ReactNode } from 'react';
import Link from 'next/link';
import { auth } from '@clerk/nextjs/server';
import { getComplianceEvents, getComplianceSummary } from '@/lib/api';
import { formatDate, formatName } from '@/lib/format';

export async function ComplianceContent() {
    const { getToken } = await auth();
    const token = await getToken();
    const [eventsResult, summaryResult] = await Promise.all([
        getComplianceEvents(50, token),
        getComplianceSummary(token),
    ]);

    const summary = summaryResult.data;
    const events = eventsResult.data ?? [];

    const totalEvents = summary?.totalEvents ?? 0;
    const optedOutContacts = summary?.optedOutContacts ?? 0;
    const eventsByType = summary?.eventsByType ?? [];

    return (
        <div className="space-y-8">
            <header className="space-y-2">
                <h2 className="text-3xl font-semibold font-sans">Compliance</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    Monitor STOP/HELP activity, manage opt-outs, and ensure messaging stays compliant.
                </p>
                {(summaryResult.error || eventsResult.error) && (
                    <p className="rounded-md border border-amber-500 bg-amber-100 px-3 py-2 text-xs text-amber-800 dark:border-amber-400 dark:bg-amber-900/30 dark:text-amber-200">
                        Unable to load the full compliance feed from the API. Showing any cached data we received.
                    </p>
                )}
            </header>

            <section className="grid gap-4 md:grid-cols-3">
                <MetricCard label="Total compliance events" value={totalEvents.toLocaleString()}>
                    <span className="text-xs text-slate-500 dark:text-slate-400">STOP, HELP, and opt-in confirmations received.</span>
                </MetricCard>
                <MetricCard label="Opted-out contacts" value={optedOutContacts.toLocaleString()}>
                    <span className="text-xs text-rose-600 dark:text-rose-300">Contacts currently suppressed from outreach.</span>
                </MetricCard>
                <MetricCard label="Tracked event types" value={eventsByType.length.toString()}>
                    <span className="text-xs text-slate-500 dark:text-slate-400">You can drill into each event below.</span>
                </MetricCard>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 glass-panel">
                <header className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h3 className="text-lg font-semibold font-sans">Event breakdown</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Incoming STOP, HELP, and re-opt events captured by Twilio webhooks.</p>
                    </div>
                </header>
                {eventsByType.length === 0 ? (
                    <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">No compliance activity logged yet.</p>
                ) : (
                    <ul className="mt-4 grid gap-3 md:grid-cols-2">
                        {eventsByType.map((item) => (
                            <li
                                key={item.type}
                                className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-200"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">{item.type}</span>
                                    <span className="text-base font-semibold">{item.count.toLocaleString()}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            <section className="space-y-4">
                <header className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-lg font-semibold font-sans">Recent events</h3>
                    <span className="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">Latest {events.length} entries</span>
                </header>

                <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 glass-panel">
                    <table className="min-w-full divide-y divide-slate-200 text-sm dark:divide-slate-800">
                        <thead className="bg-slate-100/70 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:bg-slate-800/60 dark:text-slate-400">
                            <tr>
                                <th className="px-4 py-3 text-left">Type</th>
                                <th className="px-4 py-3 text-left">Contact</th>
                                <th className="px-4 py-3 text-left">Occurred</th>
                                <th className="px-4 py-3 text-left">Payload</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-900">
                            {events.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-slate-500 dark:text-slate-400">
                                        No compliance events recorded yet. STOP and HELP responses will appear here instantly.
                                    </td>
                                </tr>
                            ) : (
                                events.map((event) => {
                                    const contact = event.contact;
                                    const payload = event.payload ? JSON.stringify(event.payload) : '—';

                                    return (
                                        <tr key={event.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                            <td className="px-4 py-3 align-top">
                                                <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                                                    {event.type}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 align-top text-sm text-blue-600 dark:text-blue-300">
                                                {contact ? (
                                                    <Link href={`/contacts/${contact.id}`} className="hover:underline">
                                                        {formatName(contact.firstName, contact.lastName)}
                                                    </Link>
                                                ) : (
                                                    <span className="text-slate-500 dark:text-slate-400">Unattributed</span>
                                                )}
                                                {contact?.phone && (
                                                    <div className="text-xs text-slate-500 dark:text-slate-400">{contact.phone}</div>
                                                )}
                                            </td>
                                            <td className="px-4 py-3 align-top text-sm text-slate-600 dark:text-slate-300">
                                                {formatDate(event.occurredAt)}
                                            </td>
                                            <td className="px-4 py-3 align-top text-xs text-slate-500 dark:text-slate-300">
                                                <span className="line-clamp-2 break-words">{payload}</span>
                                            </td>
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

function MetricCard({
    label,
    value,
    children,
}: {
    label: string;
    value: string;
    children?: ReactNode;
}) {
    return (
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 glass-panel">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
            <p className="mt-2 text-3xl font-semibold font-sans text-slate-900 dark:text-white">{value}</p>
            {children && <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">{children}</div>}
        </article>
    );
}
