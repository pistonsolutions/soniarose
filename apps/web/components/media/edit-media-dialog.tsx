'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ContactSelect } from '@/components/contacts/contact-select';
import { Loader2, AlertCircle, Pencil } from 'lucide-react';
import { MediaAsset } from '@/lib/types';

interface EditMediaDialogProps {
    asset: MediaAsset;
    onUpdateComplete?: () => void;
}

export function EditMediaDialog({ asset, onUpdateComplete }: EditMediaDialogProps) {
    const { getToken } = useAuth();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [tag, setTag] = useState(asset.ownerLabel || '');
    const [contactIds, setContactIds] = useState<string[]>([]);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen) {
            setTag(asset.ownerLabel || '');
            // Map existing contacts to IDs. 
            // Note: MediaAsset type needs to be updated to include contacts[] instead of contact
            // For now, we handle both legacy contact and new contacts array if available
            const ids: string[] = [];
            if (asset.contacts && Array.isArray(asset.contacts)) {
                asset.contacts.forEach(c => ids.push(c.id));
            } else if (asset.contact) {
                ids.push(asset.contact.id);
            }
            setContactIds(ids);
        }
    }, [isOpen, asset]);

    const handleSave = async () => {
        setSaving(true);
        setError(null);

        try {
            const token = await getToken();
            const res = await fetch(`http://localhost:3001/api/media/${asset.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    ownerLabel: tag,
                    contactIds: contactIds,
                }),
            });

            if (!res.ok) {
                throw new Error('Failed to update asset');
            }

            setIsOpen(false);
            onUpdateComplete?.();
            router.refresh();
        } catch (err: any) {
            setError(err.message || 'Failed to update');
        } finally {
            setSaving(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Media Asset</DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="tag">Asset Tag</Label>
                        <Input
                            id="tag"
                            value={tag}
                            onChange={(e) => setTag(e.target.value)}
                            placeholder="e.g. Birthday, Holiday..."
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label>Assigned Contacts</Label>
                        <ContactSelect value={contactIds} onChange={setContactIds} />
                    </div>

                    {error && (
                        <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 flex items-center gap-2">
                            <AlertCircle className="h-4 w-4" />
                            {error}
                        </div>
                    )}
                </div>

                <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={() => setIsOpen(false)} disabled={saving}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={saving}>
                        {saving ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            'Save Changes'
                        )}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
