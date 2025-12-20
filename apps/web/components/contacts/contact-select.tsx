'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Contact } from '@/lib/types';

interface ContactSelectProps {
    value?: string;
    onChange: (value: string) => void;
}

export function ContactSelect({ value = [], onChange }: { value?: string[], onChange: (value: string[]) => void }) {
    const { getToken } = useAuth();
    const [open, setOpen] = useState(false);
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchContacts() {
            setLoading(true);
            try {
                const token = await getToken();
                const res = await fetch('/api/contacts', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (res.ok) {
                    const data = await res.json();
                    setContacts(data);
                }
            } catch (error) {
                console.error('Failed to fetch contacts', error);
            } finally {
                setLoading(false);
            }
        }

        fetchContacts();
    }, [getToken]);

    const selectedContacts = contacts.filter((contact) => value.includes(contact.id));

    const toggleContact = (contactId: string) => {
        const newValue = value.includes(contactId)
            ? value.filter((id) => id !== contactId)
            : [...value, contactId];
        onChange(newValue);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between h-auto min-h-[40px] py-2"
                >
                    <div className="flex flex-wrap gap-1">
                        {selectedContacts.length > 0 ? (
                            selectedContacts.map((contact) => (
                                <Badge key={contact.id} variant="secondary" className="mr-1">
                                    {contact.firstName} {contact.lastName}
                                </Badge>
                            ))
                        ) : (
                            <span className="text-muted-foreground font-normal">Select contacts...</span>
                        )}
                    </div>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0 bg-white border border-slate-200">
                <Command className="bg-white">
                    <CommandInput
                        placeholder="Search contacts..."
                        className="text-black placeholder:text-slate-400"
                    />
                    <CommandList className="max-h-[300px] overflow-y-auto bg-white">
                        <CommandEmpty className="py-6 text-center text-sm text-slate-500">
                            {contacts.length === 0 ? "No contacts available." : "No contact found."}
                        </CommandEmpty>
                        <CommandGroup className="bg-white">
                            {contacts.map((contact) => (
                                <CommandItem
                                    key={contact.id}
                                    value={`${contact.firstName || ''} ${contact.lastName || ''} ${contact.phone || ''}`.trim()}
                                    onSelect={() => {
                                        toggleContact(contact.id);
                                    }}
                                    className="text-black aria-selected:bg-slate-100 cursor-pointer hover:bg-slate-100"
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value.includes(contact.id) ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    <div className="flex flex-col">
                                        <span className="font-medium text-black">{contact.firstName} {contact.lastName}</span>
                                        <span className="text-xs text-slate-500">
                                            {contact.phone}
                                        </span>
                                    </div>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                    <div className="border-t border-slate-100 p-2 text-xs text-slate-400 text-center bg-slate-50">
                        {contacts.length} contacts loaded
                    </div>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
