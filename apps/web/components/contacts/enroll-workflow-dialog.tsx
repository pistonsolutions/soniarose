'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useAuth } from '@clerk/nextjs';
import { Calendar, Gift, Heart, Home, Search, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

const WORKFLOW_OPTIONS = [
    {
        key: 'SELLER_LEAD_START',
        label: 'Seller Lead Sequence',
        description: '7 Signs guide + 5-day nurture',
        icon: Home,
        color: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20',
    },
    {
        key: 'BUYER_LEAD_START',
        label: 'Buyer Lead Sequence',
        description: 'UBEE validation + property search',
        icon: Search,
        color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-900/20',
    },
    {
        key: 'FIVE_DAYS_OF_JOY',
        label: '10 Days of Joy',
        description: 'Wellness nurture sequence',
        icon: Sparkles,
        color: 'text-amber-500 bg-amber-50 dark:bg-amber-900/20',
    },
    {
        key: 'POST_TRANSACTION_SEQ',
        label: 'Post-Transaction',
        description: '1-year follow-up schedule',
        icon: Heart,
        color: 'text-rose-500 bg-rose-50 dark:bg-rose-900/20',
    },
    {
        key: 'BIRTHDAY_GREETING',
        label: 'Birthday Greeting',
        description: 'Annual birthday message',
        icon: Gift,
        color: 'text-pink-500 bg-pink-50 dark:bg-pink-900/20',
    },
    {
        key: 'HOLIDAY_GREETING',
        label: 'Holiday Greeting',
        description: 'Annual holiday message',
        icon: Calendar,
        color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20',
    },
];

export function EnrollWorkflowDialog({ contactId }: { contactId: string }) {
    const { getToken } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleEnroll = async (workflowKey: string) => {
        setIsLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const token = await getToken();
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
            const response = await fetch(`${apiUrl}/workflows/enroll`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ contactId, workflowKey }),
            });

            if (!response.ok) {
                throw new Error('Failed to enroll');
            }

            setSuccess('Successfully enrolled in workflow!');
            setTimeout(() => {
                setIsOpen(false);
                setSuccess(null);
            }, 1500);
        } catch (err) {
            console.error(err);
            setError('Failed to enroll. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            setIsOpen(open);
            if (!open) {
                setSuccess(null);
                setError(null);
            }
        }}>
            <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                    <Sparkles className="h-4 w-4" />
                    Enroll in workflow
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Select Workflow</DialogTitle>
                </DialogHeader>

                {success ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center animate-in fade-in zoom-in duration-300">
                        <div className="rounded-full bg-emerald-100 p-3 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                            <CheckCircle2 className="h-8 w-8" />
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">Enrolled!</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">The workflow has been started successfully.</p>
                    </div>
                ) : (
                    <div className="grid gap-4 py-4 md:grid-cols-2">
                        {WORKFLOW_OPTIONS.map((option) => (
                            <button
                                key={option.key}
                                onClick={() => handleEnroll(option.key)}
                                disabled={isLoading}
                                className="group relative flex flex-col items-start rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm transition-all hover:border-brand-gold/50 hover:shadow-md disabled:opacity-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-brand-gold/50"
                            >
                                <div className={`mb-3 rounded-lg p-2 ${option.color}`}>
                                    <option.icon className="h-5 w-5" />
                                </div>
                                <div className="font-semibold text-slate-900 dark:text-white group-hover:text-brand-navy dark:group-hover:text-brand-gold">
                                    {option.label}
                                </div>
                                <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                    {option.description}
                                </div>
                            </button>
                        ))}
                    </div>
                )}

                {error && (
                    <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400 flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        {error}
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
