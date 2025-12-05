'use client';

import { useState } from 'react';
import { Contact } from '@/lib/types';
import { ConversationList } from '@/components/inbox/conversation-list';
import { ChatWindow } from '@/components/inbox/chat-window';

interface InboxClientProps {
    initialContacts: Contact[];
}

export function InboxClient({ initialContacts }: InboxClientProps) {
    const [selectedId, setSelectedId] = useState<string | undefined>(
        initialContacts.length > 0 ? initialContacts[0].id : undefined
    );

    const selectedContact = initialContacts.find((c) => c.id === selectedId);

    return (
        <div className="flex h-[calc(100vh-10rem)] overflow-hidden rounded-2xl border border-slate-200 shadow-sm dark:border-slate-800">
            <div className="w-1/3 min-w-[300px]">
                <ConversationList
                    contacts={initialContacts}
                    selectedId={selectedId}
                    onSelect={setSelectedId}
                />
            </div>
            <div className="flex-1">
                {selectedContact ? (
                    <ChatWindow contact={selectedContact} />
                ) : (
                    <div className="flex h-full items-center justify-center bg-slate-50 text-slate-500 dark:bg-slate-950 dark:text-slate-400">
                        Select a conversation to start messaging
                    </div>
                )}
            </div>
        </div>
    );
}
