'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { submitContactForm } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { useEffect, useRef } from 'react'

const initialState = {
    message: '',
    success: false,
}

function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <Button type="submit" size="lg" className="w-full bg-brand-navy hover:bg-brand-navy/90" disabled={pending}>
            {pending ? 'Envoi en cours...' : 'Envoyer'}
        </Button>
    )
}

export function ContactForm() {
    const [state, formAction] = useFormState(submitContactForm, initialState)
    const formRef = useRef<HTMLFormElement>(null)

    useEffect(() => {
        if (state.success && formRef.current) {
            formRef.current.reset()
        }
    }, [state.success])

    return (
        <form ref={formRef} action={formAction} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-medium text-slate-700">
                        Prénom <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        className="w-full rounded-md border border-slate-300 p-2 focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-medium text-slate-700">
                        Nom <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        className="w-full rounded-md border border-slate-300 p-2 focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
                    />
                </div>
            </div>
            <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-slate-700">
                    Courriel <span className="text-red-500">*</span>
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full rounded-md border border-slate-300 p-2 focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
                />
            </div>
            <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium text-slate-700">
                    Téléphone
                </label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full rounded-md border border-slate-300 p-2 focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
                />
            </div>
            <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-slate-700">
                    Message <span className="text-red-500">*</span>
                </label>
                <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="w-full rounded-md border border-slate-300 p-2 focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
                ></textarea>
            </div>

            {state.message && (
                <div className={`p-3 rounded-md text-sm ${state.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {state.message}
                </div>
            )}

            <SubmitButton />
        </form>
    )
}
