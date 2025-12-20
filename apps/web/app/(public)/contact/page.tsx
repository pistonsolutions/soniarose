import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/ui/section';
import { FadeIn } from '@/components/ui/fade-in';
import { ContactForm } from '@/components/contact-form';
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contactez Sonia Rose | Courtière immobilière Rive-Sud',
    description: 'Discutez de votre projet immobilier avec Sonia Rose. Contactez-moi pour une évaluation gratuite, un achat ou simplement pour poser vos questions.',
};

export default function ContactPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'ContactPage',
                        name: 'Contact',
                        url: 'https://soniarose.ca/contact',
                        description: 'Contacte Sonia Rose, courtière immobilière sur la Rive-Sud, pour discuter de ta situation, de ton projet et explorer tes options sans pression.',
                    }),
                }}
            />

            {/* SECTION 1 — HERO */}
            <div className="relative flex min-h-[400px] items-center justify-center pt-20">
                <Image
                    src="/contact-hero-bg.jpg"
                    alt="Contactez Sonia Rose"
                    fill
                    className="object-cover brightness-50"
                    priority
                />
                <div className="container relative z-10 mx-auto px-4 text-center">
                    <FadeIn delay={0.2}>
                        <h1 className="mb-6 font-sans text-5xl text-white md:text-6xl lg:text-7xl">
                            Contactez <span className="text-brand-gold">Sonia Rose</span>
                        </h1>
                        <h2 className="mb-8 text-xl font-medium text-white md:text-2xl">
                            Discutons de votre projet, sans pression.
                        </h2>
                    </FadeIn>
                </div>
            </div>

            {/* SECTION 2 — INFO CONTACT */}
            <Section background="white">
                <FadeIn>
                    <div className="grid gap-12 lg:grid-cols-2">
                        <div>
                            <h2 className="mb-6 font-sans text-3xl font-bold text-brand-brown">Restons en contact</h2>
                            <p className="mb-8 text-lg text-slate-600">
                                Que vous soyez prêt à vendre, à acheter, ou simplement en réflexion, je suis là pour répondre à vos questions et vous guider vers la meilleure stratégie pour vous.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-beige-50 text-brand-gold">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-brand-brown">Téléphone</h3>
                                        <a href="tel:5142509297" className="text-slate-600 hover:text-brand-gold transition-colors">514-250-9297</a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-beige-50 text-brand-gold">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-brand-brown">Courriel</h3>
                                        <a href="mailto:sonia.rose@remax-quebec.com" className="text-slate-600 hover:text-brand-gold transition-colors">sonia.rose@remax-quebec.com</a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-beige-50 text-brand-gold">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-brand-brown">Bureau</h3>
                                        <a href="https://maps.app.goo.gl/wS3yYy6J6J6J6J6J6" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-brand-gold transition-colors">
                                            RE/MAX Imagine & Privilège<br />
                                            61 Rue Saint-Charles Ouest<br />
                                            Longueuil, QC J4H 1C5
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12">
                                <h3 className="mb-4 font-sans text-xl font-bold text-brand-brown">Suivez-moi</h3>
                                <div className="flex gap-4">
                                    <Link href="https://www.instagram.com/soniarose.remax" target="_blank" className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-brand-brown transition-colors hover:bg-brand-gold hover:text-white">
                                        <Instagram size={20} />
                                    </Link>
                                    <Link href="https://www.facebook.com/SoniaRoseImmobilier/" target="_blank" className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-brand-brown transition-colors hover:bg-brand-gold hover:text-white">
                                        <Facebook size={20} />
                                    </Link>
                                    <Link href="https://www.linkedin.com/in/sonia-rose-969025127" target="_blank" className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-brand-brown transition-colors hover:bg-brand-gold hover:text-white">
                                        <Linkedin size={20} />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl bg-brand-beige-50 p-8 shadow-sm">
                            <h3 className="mb-6 font-sans text-2xl font-bold text-brand-brown">Envoyez-moi un message</h3>
                            <ContactForm />
                        </div>
                    </div>
                </FadeIn>
            </Section>
        </>
    );
}
