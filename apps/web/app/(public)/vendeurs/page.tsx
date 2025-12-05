import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/ui/section';
import { TrendingUp, Users, Camera, FileCheck } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Vendre sa propriété Rive-Sud | Évaluation Gratuite Sonia Rose',
    description: 'Vendez votre propriété au meilleur prix avec Sonia Rose. Stratégie de mise en marché performante, photos pro et évaluation gratuite sur la Rive-Sud.',
};

export default function SellersPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'WebPage',
                        name: 'Vendre sa propriété',
                        url: 'https://soniarose.ca/vendeurs',
                        description:
                            'Service complet de vente immobilière sur la Rive-Sud. Évaluation gratuite, home staging, photos professionnelles et publicité ciblée pour vendre rapidement.',
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
                    src="/Vendu - Boucherville.jpeg"
                    alt="Vendre sa propriété avec Sonia Rose"
                    fill
                    className="object-cover brightness-50"
                    priority
                />
                <div className="container relative z-10 mx-auto px-4 text-center">
                    <h1 className="mb-6 font-serif text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                        Vendre avec <span className="text-brand-gold">Sonia Rose</span>
                    </h1>
                    <h2 className="mb-8 text-xl font-medium text-slate-200 md:text-2xl">
                        Services complets pour vendre votre propriété en Montérégie
                    </h2>
                    <p className="mx-auto max-w-3xl text-lg text-slate-200 md:text-xl">
                        Obtenez une stratégie de vente claire, humaine et efficace. Plus de 20 ans d’expertise pour vendre au meilleur prix, rapidement et sans stress.
                    </p>
                    <div className="mt-8">
                        <Button asChild size="lg" variant="gold">
                            <Link href="https://tally.so/r/QKKpvG" target="_blank">Évaluation Gratuite</Link>
                        </Button>
                    </div>
                </div>
            </div>

            {/* SECTION 2 — MA STRATÉGIE */}
            < Section background="white" >
                <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                    <div className="relative h-[400px] overflow-hidden rounded-2xl bg-slate-100">
                        <Image
                            src="/Vendu - Sainte-Julie.jpeg"
                            alt="Stratégie de mise en marché"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <h2 className="mb-6 font-serif text-3xl font-bold text-brand-navy">Une mise en marché qui se démarque</h2>
                        <div className="space-y-6 text-lg text-slate-600">
                            <p>
                                Pour obtenir le meilleur prix, votre propriété doit être vue par les bons acheteurs, sous son meilleur jour.
                                Voici ce que j'inclus pour vous :
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <Camera className="mt-1 h-6 w-6 flex-shrink-0 text-brand-gold" />
                                    <span><strong>Photos HDR & Vidéo :</strong> Des visuels professionnels qui captent l'attention instantanément.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <TrendingUp className="mt-1 h-6 w-6 flex-shrink-0 text-brand-gold" />
                                    <span><strong>Publicité Ciblée :</strong> Diffusion sur les réseaux sociaux et les grands portails immobiliers.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Users className="mt-1 h-6 w-6 flex-shrink-0 text-brand-gold" />
                                    <span><strong>Réseau d'acheteurs :</strong> Accès à ma banque d'acheteurs qualifiés et au réseau RE/MAX.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <FileCheck className="mt-1 h-6 w-6 flex-shrink-0 text-brand-gold" />
                                    <span><strong>Accompagnement complet :</strong> Du home staging à la signature chez le notaire.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Section >

            {/* SECTION 3 — COMBIEN VAUT VOTRE MAISON */}
            < Section background="cream" >
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="mb-6 font-serif text-3xl font-bold text-brand-navy">Combien vaut votre propriété aujourd'hui ?</h2>
                    <p className="mb-8 text-lg text-slate-600">
                        Le marché évolue rapidement. Une évaluation précise est la clé pour vendre rapidement et au meilleur prix.
                        Je vous offre une analyse comparative de marché complète, gratuitement et sans obligation.
                    </p>
                    <div className="rounded-xl bg-white p-8 shadow-lg">
                        <h3 className="mb-4 text-xl font-bold text-brand-navy">Ce que vous recevrez :</h3>
                        <div className="grid gap-4 text-left md:grid-cols-2">
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-brand-gold" />
                                <span>Analyse des comparables vendus récemment</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-brand-gold" />
                                <span>Estimation de la valeur marchande actuelle</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-brand-gold" />
                                <span>Stratégie de prix recommandée</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-brand-gold" />
                                <span>Conseils pour augmenter la valeur</span>
                            </div>
                        </div>
                        <div className="mt-8">
                            <Button asChild size="lg" variant="default" className="w-full md:w-auto">
                                <Link href="https://tally.so/r/QKKpvG" target="_blank">Demander mon évaluation gratuite</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </Section >

            {/* SECTION 4 — CTA CONTACT */}
            < Section background="navy" >
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="mb-6 font-serif text-3xl font-bold text-white md:text-4xl">
                        Vous avez des questions ?
                    </h2>
                    <p className="mb-10 text-xl text-slate-300">
                        Discutons de votre projet de vente. Je suis là pour vous conseiller, en toute transparence.
                    </p>
                    <div className="flex flex-col justify-center gap-4 sm:flex-row">
                        <Button asChild size="lg" variant="gold">
                            <Link href="/contact">Me contacter</Link>
                        </Button>
                    </div>
                </div>
            </Section >
        </>
    );
}
