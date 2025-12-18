'use client';

import { useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ContactSelect } from '@/components/contacts/contact-select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { MediaAsset } from '@/lib/types';

interface SendMediaDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    media: MediaAsset | null;
}

export function SendMediaDialog({ isOpen, onOpenChange, media }: SendMediaDialogProps) {
    const { getToken } = useAuth();
    const [mode, setMode] = useState<'now' | 'birthday'>('now');
    const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
    const [runAt, setRunAt] = useState<string>(''); // YYYY-MM-DD
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (!media) return;
        if (selectedContacts.length === 0) {
            alert('Please select at least one contact.');
            return;
        }
        if (mode === 'birthday' && !runAt) {
            alert('Please select a date for the birthday.');
            return;
        }

        setLoading(true);
        try {
            const token = await getToken();

            // Construct URL. Assuming API is at /api relative to frontend.
            const baseUrl = window.location.origin;
            const mediaUrl = `${baseUrl}/api/media/uploads/${media.objectKey}`;

            const promises = selectedContacts.map(contactId => {
                const payload: any = {
                    contactId,
                    workflowKey: mode === 'now' ? 'SEND_VIDEO' : 'BIRTHDAY_VIDEO',
                    mediaUrl,
                };

                if (mode === 'birthday') {
                    payload.runAt = new Date(runAt).toISOString();
                }

                return fetch('/api/workflows/enroll', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(payload),
                }).then(async res => {
                    if (!res.ok) {
                        const err = await res.text();
                        throw new Error(err || 'Failed to send video');
                    }
                    return res;
                });
            });

            await Promise.all(promises);

            alert(mode === 'now' ? 'Video sent!' : 'Video scheduled for birthday!');
            onOpenChange(false);
            setSelectedContacts([]);
            setRunAt('');
        } catch (error) {
            console.error('Failed to send video', error);
            alert('Failed to send video. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px] bg-white dark:bg-slate-900">
                <DialogHeader>
                    <DialogTitle>Send Video</DialogTitle>
                    <DialogDescription>
                        Send "{media?.objectKey}" to contacts immediately or schedule for their birthday.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex gap-2 mb-4">
                    <Button
                        variant={mode === 'now' ? 'default' : 'outline'}
                        onClick={() => setMode('now')}
                        className="flex-1"
                    >
                        Send Now
                    </Button>
                    <Button
                        variant={mode === 'birthday' ? 'default' : 'outline'}
                        onClick={() => setMode('birthday')}
                        className="flex-1"
                    >
                        Schedule Birthday
                    </Button>
                </div>

                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label>Recipients</Label>
                        <ContactSelect value={selectedContacts} onChange={setSelectedContacts} />
                    </div>

                    {mode === 'birthday' && (
                        <div className="grid gap-2">
                            <Label>Birthday Date</Label>
                            <Input
                                type="date"
                                value={runAt}
                                onChange={(e) => setRunAt(e.target.value)}
                            />
                            <p className="text-xs text-slate-500">
                                The video will be sent on this date.
                            </p>
                        </div>
                    )}
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button onClick={handleSend} disabled={loading}>
                        {loading ? 'Sending...' : (mode === 'now' ? 'Send' : 'Schedule')}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
