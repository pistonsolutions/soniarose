import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/ui/section';
import { ArrowRight, Calendar, User } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blog Immobilier | Conseils, Émotions & Décisions – Sonia Rose',
    description: 'Analyses, conseils et perspectives humaines pour t’aider à mieux comprendre le marché, les émotions derrière une transaction et prendre des décisions éclairées. Le blog immobilier signé Sonia Rose.',
};

export default function BlogPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'Blog',
                        name: 'Blog immobilier de Sonia Rose',
                        url: 'https://soniarose.ca/blog',
                        description: 'Articles immobiliers humains, modernes et profonds pour mieux comprendre le marché, les émotions derrière une transaction et prendre des décisions alignées.',
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

            {/* SECTION 1 — HERO */}
            <div className="relative flex min-h-[400px] items-center justify-center pt-20">
                <Image
                    src="/home-hero.png"
                    alt="Blog Immobilier Sonia Rose"
                    fill
                    className="object-cover brightness-50"
                    priority
                />
                <div className="container relative z-10 mx-auto px-4 text-center">
                    <h1 className="mb-6 font-serif text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                        Blog Immobilier <br />
                        <span className="text-brand-gold">Conseils & Émotions</span>
                    </h1>
                    <div className="mx-auto max-w-3xl text-lg text-white md:text-xl">
                        <p className="mb-4">Bienvenue sur mon blog immobilier — un espace où on parle vrai, sans pression.</p>
                        <p>
                            Ici, je te partage des analyses simples, des conseils concrets, et une vision moderne du marché pour t’aider à faire des choix alignés avec ta vie.
                        </p>
                    </div>
                </div>
            </div>

            {/* SECTION 2 — ARTICLES */}
            <Section background="white">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {/* Article 1 */}
                    <Link href="/blog/comment-choisir-le-bon-moment-pour-vendre" className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:-translate-y-1 hover:shadow-xl">
                        <div className="relative aspect-video bg-slate-200">
                            <Image
                                src="/home-hero.png"
                                alt="Comment choisir le bon moment pour vendre"
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                        <div className="flex flex-1 flex-col p-6">
                            <div className="mb-3 flex items-center gap-4 text-xs text-slate-500">
                                <span className="flex items-center gap-1"><Calendar size={14} /> 12 Déc 2024</span>
                                <span className="flex items-center gap-1"><User size={14} /> Sonia Rose</span>
                            </div>
                            <h3 className="mb-3 font-serif text-xl font-bold text-brand-navy group-hover:text-brand-gold">
                                Comment choisir le bon moment pour vendre
                            </h3>
                            <p className="mb-4 flex-1 text-sm text-slate-600">
                                Découvrez les signes émotionnels et pratiques qui indiquent qu’il est temps de vendre votre maison.
                            </p>
                            <span className="flex items-center text-sm font-bold text-brand-gold">
                                Lire l'article <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                            </span>
                        </div>
                    </Link>

                    {/* Article 2 */}
                    <Link href="/blog/ce-que-les-vendeurs-regrettent-le-plus" className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:-translate-y-1 hover:shadow-xl">
                        <div className="relative aspect-video bg-slate-200">
                            <Image
                                src="/home-hero.png"
                                alt="Ce que les vendeurs regrettent le plus"
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                        <div className="flex flex-1 flex-col p-6">
                            <div className="mb-3 flex items-center gap-4 text-xs text-slate-500">
                                <span className="flex items-center gap-1"><Calendar size={14} /> 05 Déc 2024</span>
                                <span className="flex items-center gap-1"><User size={14} /> Sonia Rose</span>
                            </div>
                            <h3 className="mb-3 font-serif text-xl font-bold text-brand-navy group-hover:text-brand-gold">
                                Ce que les vendeurs regrettent le plus
                            </h3>
                            <p className="mb-4 flex-1 text-sm text-slate-600">
                                Découvrez les 5 regrets les plus fréquents des vendeurs et comment les éviter.
                            </p>
                            <span className="flex items-center text-sm font-bold text-brand-gold">
                                Lire l'article <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                            </span>
                        </div>
                    </Link>

                    {/* Article 3 */}
                    <Link href="/blog/l-art-de-tourner-une-page-sans-se-perdre" className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:-translate-y-1 hover:shadow-xl">
                        <div className="relative aspect-video bg-slate-200">
                            <Image
                                src="/home-hero.png"
                                alt="L’art de tourner une page sans se perdre"
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                        <div className="flex flex-1 flex-col p-6">
                            <div className="mb-3 flex items-center gap-4 text-xs text-slate-500">
                                <span className="flex items-center gap-1"><Calendar size={14} /> 28 Nov 2024</span>
                                <span className="flex items-center gap-1"><User size={14} /> Sonia Rose</span>
                            </div>
                            <h3 className="mb-3 font-serif text-xl font-bold text-brand-navy group-hover:text-brand-gold">
                                L’art de tourner une page sans se perdre
                            </h3>
                            <p className="mb-4 flex-1 text-sm text-slate-600">
                                Pourquoi est-ce si difficile de tourner une page ? Les signes et le bon moment pour avancer.
                            </p>
                            <span className="flex items-center text-sm font-bold text-brand-gold">
                                Lire l'article <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                            </span>
                        </div>
                    </Link>

                    {/* Article 4 */}
                    <Link href="/blog/7-signes-que-cest-peut-etre-le-moment-de-vendre" className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:-translate-y-1 hover:shadow-xl">
                        <div className="relative aspect-video bg-slate-200">
                            <Image
                                src="/home-hero.png"
                                alt="7 signes que c’est peut-être le moment de vendre"
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                        <div className="flex flex-1 flex-col p-6">
                            <div className="mb-3 flex items-center gap-4 text-xs text-slate-500">
                                <span className="flex items-center gap-1"><Calendar size={14} /> 20 Nov 2024</span>
                                <span className="flex items-center gap-1"><User size={14} /> Sonia Rose</span>
                            </div>
                            <h3 className="mb-3 font-serif text-xl font-bold text-brand-navy group-hover:text-brand-gold">
                                7 signes que c’est peut-être le moment de vendre
                            </h3>
                            <p className="mb-4 flex-1 text-sm text-slate-600">
                                Certains signes te montrent que ta maison ne correspond plus à ta vie actuelle.
                            </p>
                            <span className="flex items-center text-sm font-bold text-brand-gold">
                                Lire l'article <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                            </span>
                        </div>
                    </Link>

                    {/* Article 5 */}
                    <Link href="/blog/quand-ta-maison-ne-te-ressemble-plus" className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:-translate-y-1 hover:shadow-xl">
                        <div className="relative aspect-video bg-slate-200">
                            <Image
                                src="/home-hero.png"
                                alt="Quand ta maison ne te ressemble plus"
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                        <div className="flex flex-1 flex-col p-6">
                            <div className="mb-3 flex items-center gap-4 text-xs text-slate-500">
                                <span className="flex items-center gap-1"><Calendar size={14} /> 15 Nov 2024</span>
                                <span className="flex items-center gap-1"><User size={14} /> Sonia Rose</span>
                            </div>
                            <h3 className="mb-3 font-serif text-xl font-bold text-brand-navy group-hover:text-brand-gold">
                                Quand ta maison ne te ressemble plus
                            </h3>
                            <p className="mb-4 flex-1 text-sm text-slate-600">
                                Découvre les signes subtils qu’il est temps d’évoluer vers un nouvel espace.
                            </p>
                            <span className="flex items-center text-sm font-bold text-brand-gold">
                                Lire l'article <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                            </span>
                        </div>
                    </Link>

                    {/* Article 6 */}
                    <Link href="/blog/80-pourcent-succes-7-premiers-jours" className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:-translate-y-1 hover:shadow-xl">
                        <div className="relative aspect-video bg-slate-200">
                            <Image
                                src="/home-hero.png"
                                alt="80 % du succès se joue dans les 7 premiers jours"
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                        <div className="flex flex-1 flex-col p-6">
                            <div className="mb-3 flex items-center gap-4 text-xs text-slate-500">
                                <span className="flex items-center gap-1"><Calendar size={14} /> 08 Nov 2024</span>
                                <span className="flex items-center gap-1"><User size={14} /> Sonia Rose</span>
                            </div>
                            <h3 className="mb-3 font-serif text-xl font-bold text-brand-navy group-hover:text-brand-gold">
                                80 % du succès se joue dans les 7 premiers jours
                            </h3>
                            <p className="mb-4 flex-1 text-sm text-slate-600">
                                Pourquoi les premiers jours déterminent l’intérêt, les visites et même le prix final.
                            </p>
                            <span className="flex items-center text-sm font-bold text-brand-gold">
                                Lire l'article <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                            </span>
                        </div>
                    </Link>
                </div>
            </Section>

            {/* SECTION 3 — CTA */}
            <Section background="navy">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="mb-6 font-serif text-3xl font-bold text-white md:text-4xl">
                        Besoin d'aller plus loin ?
                    </h2>
                    <p className="mb-10 text-xl text-slate-300">
                        Que tu penses vendre, acheter ou simplement t’informer, je suis là pour t’accompagner.
                    </p>
                    <div className="flex flex-col justify-center gap-4 sm:flex-row">
                        <Button asChild size="lg" variant="gold">
                            <Link href="/contact">Me contacter</Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="border-white bg-transparent text-white hover:bg-white hover:text-brand-navy">
                            <Link href="https://tally.so/r/QKKpvG" target="_blank">Évaluation Gratuite</Link>
                        </Button>
                    </div>
                </div>
            </Section>
        </>
    );
}
