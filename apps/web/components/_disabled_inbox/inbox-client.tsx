'use client';

import { memo, useMemo, useState } from 'react';
import { ConversationList } from './conversation-list';
import { ChatWindow } from './chat-window';
import { Contact } from '@/lib/types';

interface InboxClientProps {
    initialContacts: Contact[];
}

export const InboxClient = memo(function InboxClient({ initialContacts }: InboxClientProps) {
    const [selectedContactId, setSelectedContactId] = useState<string | null>(
        initialContacts.length > 0 ? initialContacts[0].id : null
    );

    const selectedContact = useMemo(
        () => initialContacts.find((c) => c.id === selectedContactId),
        [initialContacts, selectedContactId]
    );

    return (
        <div className="grid h-[calc(100vh-12rem)] grid-cols-1 gap-6 overflow-hidden lg:grid-cols-3">
            <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-1">
                <ConversationList
                    contacts={initialContacts}
                    selectedId={selectedContactId ?? undefined}
                    onSelect={setSelectedContactId}
                />
            </div>
            <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-2">
                {selectedContact ? (
                    <ChatWindow contact={selectedContact} />
                ) : (
                    <div className="flex h-full items-center justify-center text-slate-500 dark:text-slate-400">
                        Select a conversation to start messaging
                    </div>
                )}
            </div>
        </div>
    );
});
