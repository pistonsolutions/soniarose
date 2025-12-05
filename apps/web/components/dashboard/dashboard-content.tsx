import Link from 'next/link';
import { auth } from '@clerk/nextjs/server';
import { getContacts } from '@/lib/api';
import { formatDate, formatName } from '@/lib/format';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/motion';
import { ReactNode } from 'react';

const MAX_RECENT_CONTACTS = 6;

export async function DashboardContent() {
    const { getToken } = await auth();
    const token = await getToken();
    const { data, error } = await getContacts(token);
    const contacts = data ?? [];

    const totalContacts = contacts.length;
    const optedIn = contacts.filter((contact) => contact.optInStatus === 'OPTED_IN').length;
    const needsReview = contacts.filter((contact) => contact.optInStatus === 'UNKNOWN').length;
    const activeConversations = contacts.filter((contact) => contact.messages?.length).length;

    const recentContacts = contacts.slice(0, MAX_RECENT_CONTACTS);

    return (
        <StaggerContainer className="space-y-12">
            <FadeIn className="space-y-2 border-b border-slate-200/50 pb-6 dark:border-white/10">
                <h2 className="text-3xl font-serif font-bold text-brand-navy dark:text-white">Overview</h2>
                <p className="text-slate-600 dark:text-slate-300">
                    Monitor contact growth, messaging activity, and workflow readiness at a glance.
                </p>
                {error && (
                    <p className="rounded-md border border-amber-500/50 bg-amber-100/80 px-3 py-2 text-xs text-amber-900 backdrop-blur-sm dark:bg-amber-900/50 dark:text-amber-100">
                        Unable to reach the API. Showing cached counts where possible.
                    </p>
                )}
            </FadeIn>

            <StaggerContainer className="grid gap-6 md:grid-cols-2 xl:grid-cols-4" delay={0.2}>
                <StaggerItem>
                    <MetricCard label="Contacts" value={totalContacts.toLocaleString()}>
                        <span className="text-xs text-slate-500 dark:text-slate-400">All contacts in CRM</span>
                    </MetricCard>
                </StaggerItem>
                <StaggerItem>
                    <MetricCard label="Opted in" value={optedIn.toLocaleString()}>
                        <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Ready for messaging</span>
                    </MetricCard>
                </StaggerItem>
                <StaggerItem>
                    <MetricCard label="Needs review" value={needsReview.toLocaleString()}>
                        <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">Missing opt-in status</span>
                    </MetricCard>
                </StaggerItem>
                <StaggerItem>
                    <MetricCard label="Active conversations" value={activeConversations.toLocaleString()}>
                        <span className="text-xs text-slate-500 dark:text-slate-400">Last 5 messages stored</span>
                    </MetricCard>
                </StaggerItem>
            </StaggerContainer>

            <FadeIn className="space-y-6" delay={0.4}>
                <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-serif font-bold text-brand-navy dark:text-white">Recent contacts</h3>
                    <Link href="/contacts" className="text-sm font-medium text-brand-navy hover:text-brand-gold dark:text-brand-gold dark:hover:text-white transition-colors">
                        View all contacts &rarr;
                    </Link>
                </div>
                <div className="overflow-hidden rounded-xl glass-panel">
                    <table className="min-w-full divide-y divide-slate-200/50 dark:divide-white/10">
                        <thead className="bg-slate-50/50 dark:bg-white/5">
                            <tr>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-brand-navy dark:text-slate-200">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-brand-navy dark:text-slate-200">
                                    Phone
                                </th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-brand-navy dark:text-slate-200">
                                    Opt-in
                                </th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-brand-navy dark:text-slate-200">
                                    Added
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200/50 dark:divide-white/10">
                            {recentContacts.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-sm text-slate-500 dark:text-slate-400">
                                        No contacts yet. Add the first contact from the Contacts page.
                                    </td>
                                </tr>
                            ) : (
                                recentContacts.map((contact) => (
                                    <tr key={contact.id} className="hover:bg-white/10 transition-colors">
                                        <td className="px-6 py-4 text-sm font-medium text-brand-navy dark:text-white">
                                            <Link href={`/contacts/${contact.id}`} className="hover:text-brand-gold transition-colors">
                                                {formatName(contact.firstName, contact.lastName)}
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">{contact.phone}</td>
                                        <td className="px-6 py-4 text-sm">
                                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${contact.optInStatus === 'OPTED_IN' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300' :
                                                contact.optInStatus === 'OPTED_OUT' ? 'bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-300' :
                                                    'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300'
                                                }`}>
                                                {contact.optInStatus.replace(/_/g, ' ').toLowerCase()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">{formatDate(contact.createdAt)}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </FadeIn>
        </StaggerContainer>
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
        <article className="relative overflow-hidden rounded-xl p-6 glass-card group">
            <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-brand-navy to-brand-gold opacity-0 transition-opacity group-hover:opacity-100" />
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">{label}</p>
            <p className="mt-2 text-4xl font-serif font-bold text-brand-navy dark:text-white">{value}</p>
            {children && <div className="mt-3">{children}</div>}
        </article>
    );
}
