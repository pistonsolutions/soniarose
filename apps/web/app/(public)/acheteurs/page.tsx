import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/ui/section';
import { CheckCircle2, Search, Key, ShieldCheck } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Acheter une propriété Rive-Sud | Sonia Rose Courtier Immobilier',
    description: 'Achetez votre future propriété sur la Rive-Sud avec Sonia Rose. Un accompagnement stratégique pour trouver la maison idéale au meilleur prix.',
};

export default function BuyersPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'WebPage',
                        name: 'Acheter une propriété',
                        url: 'https://soniarose.ca/acheteurs',
                        description:
                            'Guide complet pour l’achat d’une propriété sur la Rive-Sud avec Sonia Rose. Stratégies d’achat, recherche ciblée et négociation experte.',
                        publisher: {
                            '@type': 'Organization',
                            name: 'Sonia Rose Immobilier',
                            logo: {
                                '@type': 'ImageObject',
                                url: 'https://soniarose.ca/assets/logo.png',
                            },
                        },
                    }),
                }}

            />

            {/* HERO SECTION */}
            <div className="relative flex min-h-[600px] items-center justify-center pt-20">
                <Image
                    src="/Nouveaute - Saint-Paul-de-l'Ile-aux-Noix.jpeg"
                    alt="Acheter une propriété avec Sonia Rose"
                    fill
                    className="object-cover brightness-50"
                    priority
                />
                <div className="container relative z-10 mx-auto px-4 text-center">
                    <h1 className="mb-6 font-serif text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                        Acheter avec <span className="text-brand-gold">Sonia Rose</span>
                    </h1>
                    <h2 className="mb-8 text-xl font-medium text-slate-200 md:text-2xl">
                        Trouver la bonne propriété, au bon prix, sans pression.
                    </h2>
                    <p className="mx-auto max-w-3xl text-lg text-slate-200 md:text-xl">
                        L’achat d’une propriété est l’un des investissements les plus importants de votre vie.
                        Je vous accompagne pour dénicher la perle rare, négocier les meilleures conditions et sécuriser votre transaction.
                    </p>
                    <div className="mt-8">
                        <Button asChild size="lg" variant="gold">
                            <Link href="https://tally.so/r/w7X1p6" target="_blank">M'inscrire à l'alerte immobilière</Link>
                        </Button>
                    </div>
                </div>
            </div>

            {/* SECTION 2 — POURQUOI ACHETER AVEC UN COURTIER */}
            < Section background="white" >
                <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                    <div>
                        <h2 className="mb-6 font-serif text-3xl font-bold text-brand-navy">Pourquoi acheter avec un courtier ?</h2>
                        <div className="space-y-6 text-lg text-slate-600">
                            <p>
                                Dans un marché compétitif, avoir une experte à vos côtés fait toute la différence.
                                Je ne suis pas là pour vous "vendre" une maison, mais pour vous aider à l'acheter intelligemment.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="mt-1 h-6 w-6 flex-shrink-0 text-brand-gold" />
                                    <span><strong>Accès privilégié :</strong> Soyez informés des nouveautés dès leur sortie.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="mt-1 h-6 w-6 flex-shrink-0 text-brand-gold" />
                                    <span><strong>Protection légale :</strong> Achetez en toute sécurité avec les bons documents et inspections.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="mt-1 h-6 w-6 flex-shrink-0 text-brand-gold" />
                                    <span><strong>Négociation experte :</strong> Obtenez le meilleur prix grâce à une stratégie éprouvée.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="mt-1 h-6 w-6 flex-shrink-0 text-brand-gold" />
                                    <span><strong>Tranquillité d'esprit :</strong> Je gère les détails complexes pour vous.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="relative h-[400px] overflow-hidden rounded-2xl bg-slate-100">
                        <Image
                            src="/Vendu - Brossard.jpg"
                            alt="Consultation Achat"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </Section >

            {/* SECTION 3 — ÉTAPES D'ACHAT */}
            < Section background="cream" >
                <div className="text-center">
                    <h2 className="mb-12 font-serif text-3xl font-bold text-brand-navy">Les étapes d'un achat réussi</h2>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {/* Étape 1 */}
                        <div className="rounded-xl bg-white p-6 shadow-sm transition-transform hover:-translate-y-1">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-cream text-brand-gold">
                                <Search size={32} />
                            </div>
                            <h3 className="mb-2 font-serif text-xl font-bold text-brand-navy">1. Analyse des besoins</h3>
                            <p className="text-slate-600">On définit ensemble vos critères, votre budget et vos incontournables.</p>
                        </div>

                        {/* Étape 2 */}
                        <div className="rounded-xl bg-white p-6 shadow-sm transition-transform hover:-translate-y-1">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-cream text-brand-gold">
                                <Key size={32} />
                            </div>
                            <h3 className="mb-2 font-serif text-xl font-bold text-brand-navy">2. Visites ciblées</h3>
                            <p className="text-slate-600">Je sélectionne les meilleures propriétés et on visite celles qui ont du potentiel.</p>
                        </div>

                        {/* Étape 3 */}
                        <div className="rounded-xl bg-white p-6 shadow-sm transition-transform hover:-translate-y-1">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-cream text-brand-gold">
                                <ShieldCheck size={32} />
                            </div>
                            <h3 className="mb-2 font-serif text-xl font-bold text-brand-navy">3. Offre & Négociation</h3>
                            <p className="text-slate-600">Je rédige une offre solide et je négocie pour défendre vos intérêts.</p>
                        </div>

                        {/* Étape 4 */}
                        <div className="rounded-xl bg-white p-6 shadow-sm transition-transform hover:-translate-y-1">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-cream text-brand-gold">
                                <CheckCircle2 size={32} />
                            </div>
                            <h3 className="mb-2 font-serif text-xl font-bold text-brand-navy">4. Inspection & Notaire</h3>
                            <p className="text-slate-600">Je vous accompagne lors de l'inspection et jusqu'à la signature chez le notaire.</p>
                        </div>
                    </div>
                </div>
            </Section >

            {/* SECTION 4 — CTA */}
            < Section background="navy" >
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="mb-6 font-serif text-3xl font-bold text-white md:text-4xl">
                        Prêt à trouver votre future maison ?
                    </h2>
                    <p className="mb-10 text-xl text-slate-300">
                        Commencez par recevoir les meilleures opportunités directement dans votre boîte courriel.
                    </p>
                    <div className="flex flex-col justify-center gap-4 sm:flex-row">
                        <Button asChild size="lg" variant="gold">
                            <Link href="https://tally.so/r/w7X1p6" target="_blank">Je m'inscris à l'alerte</Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="border-white bg-transparent text-white hover:bg-white hover:text-brand-navy">
                            <Link href="/contact">Prendre rendez-vous</Link>
                        </Button>
                    </div>
                </div>
            </Section >
        </>
    );
}
