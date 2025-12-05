'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '@clerk/nextjs';
import { getMessages, sendMessage } from '@/lib/api';
import { Message } from '@/lib/types';
import { formatName, formatDate } from '@/lib/format';
import { clsx } from 'clsx';

interface ChatWindowProps {
    contact: {
        id: string;
        firstName: string;
        lastName: string;
        phone: string;
    };
}

export function ChatWindow({ contact }: ChatWindowProps) {
    const { getToken } = useAuth();
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [sending, setSending] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let mounted = true;
        let interval: NodeJS.Timeout | null = null;

        async function fetchMessages() {
            // Skip fetching if tab is not visible
            if (document.hidden) return;



            try {
                const token = await getToken();
                if (!token) {
                    console.error("Authentication token not available.");
                    if (mounted) setIsLoading(false);
                    return;
                }
                const result = await getMessages(contact.id, token);
                if (mounted && result.data) {
                    setMessages(result.data);
                }
            } catch (error) {
                console.error("Failed to fetch messages:", error);
            } finally {
                if (mounted) setIsLoading(false);
            }
        }

        function startPolling() {
            if (interval) clearInterval(interval);
            interval = setInterval(fetchMessages, 5000);
        }

        function stopPolling() {
            if (interval) {
                clearInterval(interval);
                interval = null;
            }
        }

        // Handle visibility change
        function handleVisibilityChange() {
            if (document.hidden) {
                stopPolling();
            } else {
                fetchMessages(); // Fetch immediately when tab becomes visible
                startPolling();
            }
        }

        // Initial fetch and start polling
        fetchMessages();
        startPolling();

        // Listen for visibility changes
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            mounted = false;
            stopPolling();
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [contact.id, getToken]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || sending) return;

        const messageText = input.trim();
        setInput('');
        setSending(true);

        try {
            const token = await getToken();
            if (!token) {
                console.error("Authentication token not available.");
                alert("Authentication error: No token found. Please refresh.");
                return;
            }

            const result = await sendMessage(contact.id, messageText, token);
            if (result.data) {
                // Optimistically add message to UI
                setMessages(prev => [...prev, result.data!]);
            } else {
                console.error("Send failed:", result.error);
                alert(`Failed to send message: ${result.error}`);
                setInput(messageText); // Restore input
            }
        } catch (error) {
            console.error("Failed to send message:", error);
            alert(`Failed to send message: ${error instanceof Error ? error.message : 'Unknown error'}`);
            // Restore input on error
            setInput(messageText);
        } finally {
            setSending(false);
        }
    }, [input, sending, getToken, contact.id]);

    return (
        <div className="flex h-full flex-col bg-slate-50 dark:bg-slate-950">
            {/* Header */}
            <div className="border-b border-slate-200 bg-white px-6 py-4 dark:border-slate-800 dark:bg-slate-900">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    {formatName(contact.firstName, contact.lastName)}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{contact.phone}</p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6" ref={scrollRef}>
                {isLoading ? (
                    <div className="flex h-full items-center justify-center text-slate-500">Loading...</div>
                ) : messages.length === 0 ? (
                    <div className="flex h-full items-center justify-center text-slate-500">
                        No messages yet. Start the conversation!
                    </div>
                ) : (
                    <div className="space-y-4">
                        {messages.map((message) => {
                            const isOutbound = message.direction === 'OUTBOUND';
                            return (
                                <div
                                    key={message.id}
                                    className={clsx(
                                        'flex w-full',
                                        isOutbound ? 'justify-end' : 'justify-start'
                                    )}
                                >
                                    <div
                                        className={clsx(
                                            'max-w-[70%] rounded-2xl px-4 py-2 text-sm',
                                            isOutbound
                                                ? 'bg-blue-600 text-white rounded-br-none'
                                                : 'bg-white text-slate-700 shadow-sm dark:bg-slate-800 dark:text-slate-200 rounded-bl-none'
                                        )}
                                    >
                                        <p>{message.body}</p>
                                        <p
                                            className={clsx(
                                                'mt-1 text-[10px]',
                                                isOutbound ? 'text-blue-100' : 'text-slate-400'
                                            )}
                                        >
                                            {formatDate(message.createdAt)}
                                            {isOutbound && (
                                                <span className="ml-1 opacity-70">
                                                    {message.status === 'DELIVERED' ? '✓✓' : message.status === 'SENT' ? '✓' : ''}
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Input */}
            <div className="border-t border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                <form onSubmit={handleSend} className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-blue-400"
                        disabled={sending}
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || sending}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-400"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
}
