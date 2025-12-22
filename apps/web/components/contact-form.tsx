'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';

export function ContactForm() {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string | null }>({ type: null, message: null });
    const formRef = useRef<HTMLFormElement>(null);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);
        setStatus({ type: null, message: null });

        const formData = new FormData(event.currentTarget);
        const data = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            message: formData.get('message'),
        };

        try {
            const response = await fetch('/api/contacts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                setStatus({ type: 'success', message: 'Message envoyé avec succès!' });
                formRef.current?.reset();
            } else {
                setStatus({ type: 'error', message: result.message || 'Une erreur est survenue.' });
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'Une erreur est survenue. Veuillez réessayer.' });
        } finally {
            setLoading(false);
        }
    }

    return (
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-medium font-sans text-slate-700">
                        Prénom <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        className="w-full rounded-md border border-slate-300 p-2 font-sans focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-medium font-sans text-slate-700">
                        Nom <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        className="w-full rounded-md border border-slate-300 p-2 font-sans focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
                    />
                </div>
            </div>
            <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium font-sans text-slate-700">
                    Courriel <span className="text-red-500">*</span>
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full rounded-md border border-slate-300 p-2 font-sans focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
                />
            </div>
            <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium font-sans text-slate-700">
                    Téléphone
                </label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full rounded-md border border-slate-300 p-2 font-sans focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
                />
            </div>
            <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium font-sans text-slate-700">
                    Message <span className="text-red-500">*</span>
                </label>
                <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="w-full rounded-md border border-slate-300 p-2 font-sans focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
                ></textarea>
            </div>

            {status.message && (
                <div className={`p-3 rounded-md text-sm ${status.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {status.message}
                </div>
            )}

            <Button type="submit" size="lg" className="w-full bg-brand-brown hover:bg-brand-brown/90" disabled={loading}>
                {loading ? 'Envoi en cours...' : 'Envoyer'}
            </Button>
        </form>
    );
}
