'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { updateContact } from '@/lib/api';
import { Pencil } from 'lucide-react';
import type { Contact } from '@/lib/types';

interface EditContactDialogProps {
    contact: Contact;
}

export function EditContactDialog({ contact }: EditContactDialogProps) {
    const router = useRouter();
    const { getToken } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [form, setForm] = useState({
        firstName: contact.firstName || '',
        lastName: contact.lastName || '',
        phone: contact.phone || '',
        email: contact.email || '',
        emotionalProfile: contact.emotionalProfile || '',
        birthday: contact.birthday ? new Date(contact.birthday).toISOString().split('T')[0] : '',
        leadSource: contact.leadSource || '',
        pipelineStage: contact.pipelineStage || '',
        optInStatus: contact.optInStatus || 'UNKNOWN',
        tags: contact.tags?.map(t => t.tag.name).join(', ') || '',
    });

    // Reset form when dialog opens
    useEffect(() => {
        if (isOpen) {
            setForm({
                firstName: contact.firstName || '',
                lastName: contact.lastName || '',
                phone: contact.phone || '',
                email: contact.email || '',
                emotionalProfile: contact.emotionalProfile || '',
                birthday: contact.birthday ? new Date(contact.birthday).toISOString().split('T')[0] : '',
                leadSource: contact.leadSource || '',
                pipelineStage: contact.pipelineStage || '',
                optInStatus: contact.optInStatus || 'UNKNOWN',
                tags: contact.tags?.map(t => t.tag.name).join(', ') || '',
            });
        }
    }, [isOpen, contact]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const token = await getToken();
            const tags = form.tags.split(',').map(t => t.trim()).filter(Boolean);

            const payload = {
                ...form,
                tags,
                // Ensure phone is not modified if it's the unique identifier, or handle validation
            };

            const result = await updateContact(contact.id, payload, token);

            if (result.error) {
                throw new Error(result.error);
            }

            setIsOpen(false);
            router.refresh();
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Failed to update contact');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                    <Pencil className="h-4 w-4" />
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit Contact</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 py-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
                            <input
                                id="firstName"
                                name="firstName"
                                value={form.firstName}
                                onChange={handleChange}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
                            <input
                                id="lastName"
                                name="lastName"
                                value={form.lastName}
                                onChange={handleChange}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="phone" className="text-sm font-medium">Phone</label>
                            <input
                                id="phone"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="birthday" className="text-sm font-medium">Birthday</label>
                            <input
                                id="birthday"
                                name="birthday"
                                type="date"
                                value={form.birthday}
                                onChange={handleChange}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="emotionalProfile" className="text-sm font-medium">Emotional Profile</label>
                            <input
                                id="emotionalProfile"
                                name="emotionalProfile"
                                value={form.emotionalProfile}
                                onChange={handleChange}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="optInStatus" className="text-sm font-medium">Opt-in Status</label>
                        <select
                            id="optInStatus"
                            name="optInStatus"
                            value={form.optInStatus}
                            onChange={handleChange}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <option value="UNKNOWN">Unknown</option>
                            <option value="OPTED_IN">Opted In</option>
                            <option value="OPTED_OUT">Opted Out</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="tags" className="text-sm font-medium">Tags</label>
                        <textarea
                            id="tags"
                            name="tags"
                            rows={2}
                            value={form.tags}
                            onChange={handleChange}
                            placeholder="tag1, tag2, tag3"
                            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>

                    {error && (
                        <div className="text-sm text-red-500 bg-red-50 p-3 rounded-md">
                            {error}
                        </div>
                    )}

                    <div className="flex justify-end gap-3">
                        <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
