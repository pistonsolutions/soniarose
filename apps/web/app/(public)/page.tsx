import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/ui/section';
import { Star, Instagram, Facebook, Linkedin, Youtube } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Sonia Rose Courtier Immobilier | Rive-Sud & Montréal',
    description: 'Sonia Rose, courtière immobilière d’expérience sur la Rive-Sud et à Montréal. Achetez ou vendez votre propriété avec une approche humaine et stratégique.',
};

export default function HomePage() {
    return (
        <>
            {/* SECTION 1 — HERO */}
            <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/home-hero-high-res.png"
                        alt="Sonia Rose Courtier Immobilier"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />
                </div>

                <div className="container relative z-10 mx-auto px-4 text-center text-white">
                    <h1 className="mb-6 font-serif text-5xl font-bold md:text-7xl">
                        Sonia Rose
                    </h1>
                    <p className="mb-8 text-xl font-light uppercase tracking-widest md:text-2xl">
                        Courtier Immobilier
                    </p>
                    <Button asChild size="lg" variant="gold" className="min-w-[200px]">
                        <Link href="https://tally.so/r/QKKpvG" target="_blank">Évaluation Gratuite</Link>
                    </Button>
                </div>
            </section>

            {/* SECTION 2 — AVEC SONIA ROSE (3 blocs) */}
            <Section background="cream">
                <div className="mb-16 text-center">
                    <h2 className="mb-4 font-serif text-4xl font-bold text-brand-navy">Avec Sonia Rose</h2>
                    <p className="text-xl text-slate-600">Vendre. Acheter. Évaluer. Tout commence ici.</p>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    {/* Bloc 1 */}
                    <Link href="/proprietes" className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-transform hover:-translate-y-1">
                        <div className="aspect-[4/3] bg-slate-200 relative">
                            <Image
                                src="/Nouveaute - Saint-Paul-de-l'Ile-aux-Noix.jpeg"
                                alt="Propriétés Sonia Rose"
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                        <div className="p-6">
                            <h3 className="mb-2 font-serif text-2xl font-bold text-brand-navy group-hover:text-brand-gold">Mes Propriétés</h3>
                            <p className="text-slate-600">Découvrez les propriétés disponibles sur la Rive-Sud.</p>
                        </div>
                    </Link>

                    {/* Bloc 2 */}
                    <Link href="https://tally.so/r/QKKpvG" target="_blank" className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-transform hover:-translate-y-1">
                        <div className="aspect-[4/3] bg-slate-200 relative">
                            <Image
                                src="/home-hero.png"
                                alt="Évaluation Gratuite"
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                        <div className="p-6">
                            <h3 className="mb-2 font-serif text-2xl font-bold text-brand-navy group-hover:text-brand-gold">Évaluation Gratuite</h3>
                            <p className="text-slate-600">Estimez ce que votre propriété vaut vraiment.</p>
                        </div>
                    </Link>

                    {/* Bloc 3 */}
                    <Link href="/acheteurs" className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-transform hover:-translate-y-1">
                        <div className="aspect-[4/3] bg-slate-200 relative">
                            <Image
                                src="/Vendu - Boucherville.jpeg"
                                alt="Acheter avec Sonia Rose"
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                        <div className="p-6">
                            <h3 className="mb-2 font-serif text-2xl font-bold text-brand-navy group-hover:text-brand-gold">Achetez avec moi</h3>
                            <p className="text-slate-600">Un accompagnement humain pour votre projet d'achat.</p>
                        </div>
                    </Link>
                </div>
            </Section>

            {/* SECTION 3 — TRAVAILLER AVEC MOI */}
            <section className="relative py-20" style={{ backgroundColor: '#ffe9d0a5' }}>

                {/* CORNER LOGO */}
                <div className="absolute bottom-4 right-4 w-32 h-16 opacity-80 md:w-48 md:h-24">
                    <Image
                        src="/images/old-sonia-logo.png"
                        alt="Sonia Rose Logo (Old)"
                        fill
                        className="object-contain object-right-bottom"
                    />
                </div>

                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-3xl text-center">
                        <h2 className="mb-6 font-serif text-4xl font-bold" style={{ color: '#3E2723' }}>TRAVAILLER AVEC MOI</h2>
                        <div className="space-y-6 text-lg" style={{ color: '#3E2723' }}>
                            <p>
                                Avec moi, vous obtenez bien plus qu’une courtière immobilière. Vous bénéficiez de plus de 20 ans d’expérience, de stratégie, de négociation et surtout d’écoute.
                            </p>
                            <p>
                                Je cible vite ce qui est le mieux pour vous, je vous représente avec rigueur et transparence, et je m’occupe de tout du début à la fin.
                            </p>
                            <p>
                                Parce que pour moi, une transaction n’est jamais “juste une transaction”. C’est votre histoire. C’est votre vie. Chaque projet mérite une réflexion juste, humaine et rentable.
                            </p>
                        </div>
                        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                            {/* BUTTON 1: FILLED */}
                            <Button asChild size="lg" className="text-white hover:opacity-90" style={{ backgroundColor: '#3E2723' }}>
                                <Link href="https://tally.so/r/QKKpvG" target="_blank">Évaluation gratuite</Link>
                            </Button>

                            {/* BUTTON 2: OUTLINE */}
                            <Button asChild size="lg" variant="outline"
                                className="bg-transparent hover:text-white"
                                style={{
                                    borderColor: '#3E2723',
                                    color: '#3E2723',
                                }}
                            >
                                <Link href="/contact">Parler à Sonia</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 4 — TÉMOIGNAGES */}
            <Section background="white">
                <div className="text-center">
                    <h2 className="mb-12 font-serif text-4xl font-bold text-brand-navy">Témoignages</h2>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {/* Testimonial placeholders */}
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="rounded-xl bg-slate-50 p-8 shadow-sm">
                                <div className="mb-4 flex justify-center text-brand-gold">
                                    {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
                                </div>
                                <p className="mb-6 text-slate-600 italic">"Une expérience incroyable avec Sonia. Elle a su nous écouter et nous guider avec une patience exemplaire."</p>
                                <p className="font-bold text-brand-navy">- Client Satisfait</p>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>

            {/* SECTION 5 — MÉDIAS SOCIAUX */}
            <Section background="cream">
                <div className="text-center">
                    <h2 className="mb-4 font-serif text-4xl font-bold text-brand-navy">Médias sociaux</h2>
                    <p className="mb-12 text-xl text-slate-600">Suivez-moi sur mes réseaux</p>

                    <div className="flex justify-center gap-6">
                        <Link href="https://www.tiktok.com/@soniarose.remax" target="_blank" className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md transition-transform hover:scale-110 hover:text-brand-gold">
                            <span className="font-bold">TT</span>
                        </Link>
                        <Link href="https://www.instagram.com/soniarose.remax" target="_blank" className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md transition-transform hover:scale-110 hover:text-brand-gold">
                            <Instagram size={32} />
                        </Link>
                        <Link href="https://www.facebook.com/SoniaRoseImmobilier/" target="_blank" className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md transition-transform hover:scale-110 hover:text-brand-gold">
                            <Facebook size={32} />
                        </Link>
                        <Link href="https://www.youtube.com/@rosesonia662" target="_blank" className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md transition-transform hover:scale-110 hover:text-brand-gold">
                            <Youtube size={32} />
                        </Link>
                        <Link href="https://www.linkedin.com/in/sonia-rose-969025127" target="_blank" className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md transition-transform hover:scale-110 hover:text-brand-gold">
                            <Linkedin size={32} />
                        </Link>
                    </div>
                </div>
            </Section>

            {/* SECTION 6 — MESSAGE FINAL */}
            <Section background="white">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="mb-8 font-serif text-3xl font-bold text-brand-navy md:text-4xl">
                        Votre projet immobilier mérite une expérience douce, respectueuse et en confiance.
                    </h2>
                    <p className="mb-10 text-xl text-slate-600">
                        Qu’il s’agisse d’acheter, vendre ou investir, je vous accompagne avec humanité, écoute et stratégie. Ma priorité est de comprendre ce que vous vivez maintenant, vos besoins réels et de vous proposer une stratégie qui est alignée avec votre vie.
                        Je suis là pour vous du début à la fin.
                    </p>
                    <div className="flex flex-col justify-center gap-4 sm:flex-row">
                        <Button asChild size="lg" variant="gold" className="min-w-[200px]">
                            <Link href="/acheteurs">Achetez avec moi</Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="min-w-[200px]">
                            <Link href="/vendeurs">Vendez avec moi</Link>
                        </Button>
                    </div>
                </div>
            </Section>
        </>
    );
}
