import { auth } from '@clerk/nextjs/server';
import { getContacts } from '@/lib/api';
import { InboxClient } from '@/components/inbox/inbox-client';

export async function InboxContent() {
    const { getToken } = await auth();
    const token = await getToken();
    const { data: contacts } = await getContacts(token);

    return (
        <div className="space-y-6">
            <header className="space-y-2">
                <h2 className="text-3xl font-semibold font-sans">Conversation inbox</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    Reply to two-way SMS, inspect delivery receipts, and forward calls.
                </p>
            </header>

            <InboxClient initialContacts={contacts ?? []} />
        </div>
    );
}
