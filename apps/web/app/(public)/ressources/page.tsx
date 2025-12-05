import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/ui/section';
import { FileText, Calculator, HelpCircle, BookOpen } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Ressources immobilières | Outils & Guides gratuits | Sonia Rose',
    description: 'Guides gratuits, calculatrice hypothécaire, formulaires, mini-tests et outils pratiques pour acheter ou vendre en toute clarté sur la Rive-Sud.',
};

export default function ResourcesPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'WebPage',
                        name: 'Ressources immobilières',
                        url: 'https://soniarose.ca/ressources',
                        description:
                            'Ressources et outils immobiliers pour t’aider à mieux comprendre le marché, préparer ta vente ou ton achat, et prendre des décisions éclairées, sans pression.',
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
            <div className="relative flex min-h-[500px] items-center justify-center pt-20">
                <Image
                    src="/home-hero.png"
                    alt="Ressources immobilières Sonia Rose"
                    fill
                    className="object-cover brightness-50"
                    priority
                />
                <div className="container relative z-10 mx-auto px-4 text-center">
                    <h1 className="mb-6 font-serif text-4xl font-bold text-brand-navy md:text-5xl lg:text-6xl">
                        Ressources
                    </h1>
                    <h2 className="mb-8 text-xl font-medium text-slate-600 md:text-2xl">
                        Des outils simples, humains et pratiques pour vous accompagner dans votre projet immobilier.
                    </h2>
                </div>
            </div>

            {/* SECTION 2 — GUIDES ET OUTILS */}
            <Section background="white">
                <div className="text-center mb-12">
                    <h2 className="font-serif text-3xl font-bold text-brand-navy">Ressources et outils immobiliers pratiques pour vous guider</h2>
                    <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
                        Je vous ai créé des formulaires et des guides immobiliers clairs et structurés pour vous aider à préparer votre achat ou votre vente.
                        Mes outils sont simples, humains et pratiques, et vous permettent d’avancer étape par étape.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {/* Guide Vendeur */}
                    <div className="group rounded-xl bg-slate-50 p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-cream text-brand-gold">
                            <FileText size={24} />
                        </div>
                        <h3 className="mb-2 font-serif text-xl font-bold text-brand-navy">Guide du Vendeur</h3>
                        <p className="mb-4 text-sm text-slate-600">Les étapes essentielles pour vendre sans stress.</p>
                        <Button asChild variant="link" className="p-0 text-brand-gold">
                            <Link href="https://tally.so/r/QKKpvG" target="_blank">Télécharger</Link>
                        </Button>
                    </div>

                    {/* Guide Acheteur */}
                    <div className="group rounded-xl bg-slate-50 p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-cream text-brand-gold">
                            <BookOpen size={24} />
                        </div>
                        <h3 className="mb-2 font-serif text-xl font-bold text-brand-navy">Guide de l'Acheteur</h3>
                        <p className="mb-4 text-sm text-slate-600">Tout ce qu'il faut savoir avant d'acheter.</p>
                        <Button asChild variant="link" className="p-0 text-brand-gold">
                            <Link href="https://tally.so/r/w7X1p6" target="_blank">Télécharger</Link>
                        </Button>
                    </div>

                    {/* Alerte Immobilière */}
                    <div className="group rounded-xl bg-slate-50 p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-cream text-brand-gold">
                            <HelpCircle size={24} />
                        </div>
                        <h3 className="mb-2 font-serif text-xl font-bold text-brand-navy">Alerte Immobilière</h3>
                        <p className="mb-4 text-sm text-slate-600">Recevez les nouvelles propriétés en primeur.</p>
                        <Button asChild variant="link" className="p-0 text-brand-gold">
                            <Link href="https://tally.so/r/w7X1p6" target="_blank">M'inscrire</Link>
                        </Button>
                    </div>

                    {/* Test Alignement */}
                    <div className="group rounded-xl bg-slate-50 p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-cream text-brand-gold">
                            <Calculator size={24} />
                        </div>
                        <h3 className="mb-2 font-serif text-xl font-bold text-brand-navy">Test Alignement</h3>
                        <p className="mb-4 text-sm text-slate-600">Votre maison vous correspond-elle encore ?</p>
                        <Button asChild variant="link" className="p-0 text-brand-gold">
                            <Link href="https://tally.so/r/mZK1pz" target="_blank">Faire le test</Link>
                        </Button>
                    </div>
                </div>
            </Section>

            {/* SECTION 3 — RAPPORT PERSONNALISÉ */}
            <Section background="cream">
                <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                    <div>
                        <h2 className="mb-4 font-serif text-3xl font-bold text-brand-navy">Obtiens ton rapport personnalisé</h2>
                        <p className="mb-6 text-lg text-slate-600">
                            Découvre les vérités cachées qui influencent vraiment la valeur de ta propriété.
                            Réponds à ce mini-test et je t’envoie ton rapport personnalisé, basé sur ton secteur, ton type de propriété et la réalité actuelle du marché.
                        </p>
                        <ul className="mb-8 space-y-2 text-slate-600">
                            <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-brand-gold" /> Ce que ta maison vaut vraiment</li>
                            <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-brand-gold" /> Ce que les acheteurs recherchent dans ton secteur</li>
                            <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-brand-gold" /> Ce qui peut faire monter la valeur</li>
                            <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-brand-gold" /> Ce que tu pourrais laisser sur la table</li>
                        </ul>
                        <Button asChild size="lg" variant="gold">
                            <Link href="https://tally.so/r/QKKpvG" target="_blank">Recevoir mon rapport</Link>
                        </Button>
                    </div>
                    <div className="relative h-[400px] overflow-hidden rounded-2xl bg-white shadow-lg">
                        <Image
                            src="/home-hero.png"
                            alt="Rapport Personnalisé"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </Section>

            {/* SECTION 4 — FAQ */}
            <Section background="white">
                <div className="mx-auto max-w-4xl">
                    <div className="text-center mb-12">
                        <h2 className="mb-4 font-serif text-3xl font-bold text-brand-navy">FAQ – Achat et vente immobilière</h2>
                        <p className="text-lg text-slate-600">Des réponses simples, claires et stratégiques pour t’aider à prendre les meilleures décisions.</p>
                    </div>

                    <div className="space-y-6">
                        {[
                            { q: "Quels sont les frais réels à prévoir lors de l’achat d’une propriété ?", a: "Notaire, taxes de bienvenue, mise de fonds, inspection, frais de déménagement et ajustements." },
                            { q: "Est-ce que les rénovations peuvent augmenter la valeur ?", a: "Oui, surtout la cuisine, la salle de bain, les planchers et la peinture fraîche. Attention aux rénovations trop personnalisées." },
                            { q: "Quels petits détails augmentent vraiment la valeur ?", a: "Le home staging, une luminosité maximisée, un nettoyage impeccable et les petites retouches esthétiques." },
                            { q: "Comment savoir si c’est le bon moment pour acheter ou vendre ?", a: "Ça dépend de votre situation personnelle, du marché, du secteur et des taux d'intérêt. Une analyse personnalisée est recommandée." },
                            { q: "Comment évaluer une propriété au juste prix ?", a: "En analysant les comparables vendus récemment, les tendances du secteur et l'état de la propriété." },
                            { q: "Quelles erreurs peuvent faire perdre de la valeur ?", a: "La négligence, les réparations non faites, de mauvaises photos et un prix initial mal positionné." }
                        ].map((item, i) => (
                            <div key={i} className="rounded-lg border border-slate-100 bg-slate-50 p-6">
                                <h3 className="mb-2 font-serif text-lg font-bold text-brand-navy">{item.q}</h3>
                                <p className="text-slate-600">{item.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>
        </>
    );
}
