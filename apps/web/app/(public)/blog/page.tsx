import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/ui/section';
import { FadeIn } from '@/components/ui/fade-in';
import { ArrowRight, Calendar, User } from 'lucide-react';
import type { Metadata } from 'next';
import { BlogPageCarousel } from '@/components/blog-page-carousel';

const blogHeroOpacity = 0.8; // 0.0 to 1.0

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
                                url: 'https://soniarose.ca/assets/logo-beige-et-or.png',
                            },
                        },
                    }),
                }}
            />

            {/* SECTION 1 — HERO */}
            <div className="relative flex min-h-[600px] items-center justify-center pt-20 m-4 rounded-[3rem] overflow-hidden">
                <Image
                    src="/blog-hero-bg.png"
                    alt="Blog Immobilier Sonia Rose"
                    fill
                    className="object-cover"
                    style={{ opacity: blogHeroOpacity }}
                    priority
                />
                <div className="container relative z-10 mx-auto px-4 text-center">
                    <FadeIn delay={0.2}>
                        <h1 className="mb-4 font-sans text-6xl font-normal md:text-8xl tracking-widest opacity-90 text-brand-beige-300" style={{ textShadow: '3px 5px 6px rgba(0, 0, 0, 0.4)' }}>
                            BLOG IMMOBILIER
                        </h1>
                        <p className="text-sm md:text-base text-white/90 font-light tracking-wide uppercase">
                            Conseils, émotions & expertise immobilière
                        </p>
                    </FadeIn>
                </div>
            </div>

            {/* SECTION 2 — INTRO */}
            <Section className="py-20 bg-brand-beige-100">
                <div className="container mx-auto px-4 text-center">
                    <FadeIn>
                        <h2 className="font-sans text-3xl md:text-4xl text-brand-brown mb-2">
                            BLOG IMMOBILIER
                        </h2>
                        <h3 className="font-sans text-2xl md:text-3xl text-brand-brown mb-6">
                            CONSEILS & ÉMOTIONS
                        </h3>
                        <p className="text-brand-brown max-w-2xl mx-auto text-lg font-light">
                            Des analyses, des conseils et des perspectives modernes pour t'aider à prendre les meilleures décisions immobilières.
                        </p>
                    </FadeIn>
                </div>
            </Section>

            {/* SECTION 3 — ARTICLES */}
            <Section className="py-20 bg-brand-beige-100">
                <FadeIn>
                    <BlogPageCarousel />
                </FadeIn>
            </Section>

            {/* SECTION 4 — CTA */}
            <Section background="brown">
                <div className="mx-auto max-w-4xl text-center">
                    <FadeIn>
                        <h2 className="mb-6 font-sans text-3xl font-bold text-white md:text-4xl">
                            Besoin d'aller plus loin ?
                        </h2>
                        <p className="mb-10 text-xl text-slate-300">
                            Que tu penses vendre, acheter ou simplement t’informer, je suis là pour t’accompagner.
                        </p>
                        <div className="flex flex-col justify-center gap-4 sm:flex-row">
                            <Button asChild size="lg" variant="gold">
                                <Link href="/contact">Me contacter</Link>
                            </Button>
                            <Button asChild size="lg" variant="outline" className="border-white bg-transparent text-white hover:bg-white hover:text-brand-brown">
                                <Link href="https://tally.so/r/QKKpvG" target="_blank">Évaluation Gratuite</Link>
                            </Button>
                        </div>
                    </FadeIn>
                </div>
            </Section>
        </>
    );
}
