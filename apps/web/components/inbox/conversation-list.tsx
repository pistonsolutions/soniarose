import { Contact } from '@/lib/types';
import { formatName, formatDate } from '@/lib/format';
import { clsx } from 'clsx';

interface ConversationListProps {
    contacts: Contact[];
    selectedId?: string;
    onSelect: (id: string) => void;
}

export function ConversationList({ contacts, selectedId, onSelect }: ConversationListProps) {
    return (
        <div className="flex h-full flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800">
                <input
                    type="search"
                    placeholder="Search messages..."
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-slate-700"
                />
            </div>
            <div className="flex-1 overflow-y-auto">
                {contacts.length === 0 ? (
                    <div className="p-4 text-center text-sm text-slate-500 dark:text-slate-400">
                        No conversations yet.
                    </div>
                ) : (
                    <ul className="divide-y divide-slate-100 dark:divide-slate-800">
                        {contacts.map((contact) => {
                            const lastMessage = contact.messages?.[0];
                            const isSelected = contact.id === selectedId;

                            return (
                                <li key={contact.id}>
                                    <button
                                        onClick={() => onSelect(contact.id)}
                                        className={clsx(
                                            'w-full px-4 py-3 text-left transition hover:bg-slate-50 dark:hover:bg-slate-800/50',
                                            isSelected && 'bg-slate-50 dark:bg-slate-800/80'
                                        )}
                                    >
                                        <div className="flex items-baseline justify-between">
                                            <span className="font-medium text-slate-900 dark:text-slate-100">
                                                {formatName(contact.firstName, contact.lastName)}
                                            </span>
                                            {lastMessage && (
                                                <span className="text-xs text-slate-400 dark:text-slate-500">
                                                    {formatDate(lastMessage.createdAt)}
                                                </span>
                                            )}
                                        </div>
                                        <div className="mt-1 flex items-center justify-between">
                                            <p className="line-clamp-1 text-sm text-slate-500 dark:text-slate-400">
                                                {lastMessage ? lastMessage.body : 'No messages'}
                                            </p>
                                            {/* Optional: Unread indicator */}
                                        </div>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </div>
    );
}
