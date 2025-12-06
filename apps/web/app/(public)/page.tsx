"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/ui/section';
import { FadeIn } from '@/components/ui/fade-in';
import { Star, Instagram, Facebook, Linkedin, Youtube } from 'lucide-react';
import { useState } from 'react';

export default function HomePage() {
    const [currentSlide, setCurrentSlide] = useState(0);

    // CONFIGURATION: Adjust these values to position the "Qui est Sonia Rose" image
    const imageZoom = 1.5; // Zoom level (1 = 100%)
    const imageX = 0;       // Horizontal offset in pixels
    const imageY = -100;       // Vertical offset in pixels

    // SECTION 3 CONFIGURATION: Adjust opacity for the 3 images (0 to 1)
    const opacity1 = 1;
    const opacity2 = 1;
    const opacity3 = 1;

    // SECTION 5 CONFIGURATION
    const ctaSectionPadding = 'py-12'; // Adjust section vertical padding
    const ctaImageHeight = 'h-[800px]'; // Adjust image height class (e.g., h-[600px], h-[800px])
    const ctaImageWidth = 'max-w-2xl'; // Adjust image width class (e.g., max-w-lg, max-w-xl, max-w-2xl)
    const ctaImageScale = 5; // Scale the image (1 = 100%, 1.5 = 150%, etc.)
    const ctaImageX = 80; // Horizontal offset in pixels
    const ctaImageY = 180; // Vertical offset in pixels

    const testimonials = [
        {
            quote: "Sonia Rose à dépassé toutes nos attentes en tant que Courtière immobilière. Son professionnalisme exceptionnel, sa connaissance approfondie du marché et son engagement à satisfaire pleinement ses clients ont rendu notre expérience remarquable.",
            author: "– Christiane et Louise, La Prairie",
        },
        {
            quote: "Une expérience incroyable avec Sonia. Elle a su nous écouter et nous guider avec une patience exemplaire.",
            author: "– Client Satisfait",
        },
        {
            quote: "Grâce à son dynamisme, sa transparence, son attitude positive et à sa diligence, elle a facilité chaque étape du processus.",
            author: "– Client Heureux",
        },
    ];

    return (
        <>
            {/* SECTION 1 — HERO */}
            <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-brand-cream">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/home-hero-high-res.png"
                        alt="Sonia Rose Courtier Immobilier"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, rgba(255, 255, 255, var(--hero-bg-opacity, 0.1)), rgba(255, 255, 255, var(--hero-bg-opacity, 0.1)))` }} />
                </div>

                <div className="container relative z-10 mx-auto px-4 text-center text-brand-navy">
                    <FadeIn delay={0.2}>
                        <h1 className="mb-6 font-serif text-4xl font-bold md:text-6xl">
                            Parce que l'immobilier, <span className="text-brand-gold">c'est plus qu'une simple transaction</span>
                        </h1>
                        <p className="mb-8 text-lg font-light md:text-xl">
                            C'est une étape de vie qui mérite réflexion, stratégie et une approche respectueuse de vos besoins réels.
                        </p>
                        <div className="flex justify-center gap-4">
                            <Button asChild size="lg" variant="gold" className="px-6 py-3 text-lg bg-brand-navy text-white hover:bg-brand-gold">
                                <Link href="https://tally.so/r/mZK1pz" target="_blank">FAIS LE TEST</Link>
                            </Button>
                            <Button asChild size="lg" variant="outline" className="px-6 py-3 text-lg border-brand-navy text-brand-navy hover:bg-brand-gold hover:text-white">
                                <Link href="https://tally.so/r/QKKpvG" target="_blank">DÉCOUVRE LES VÉRITÉS CACHÉES</Link>
                            </Button>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* SECTION 2 — À PROPOS DE SONIA ROSE */}
            <section className="py-16 bg-brand-beige">
                <div className="container mx-auto px-4 text-center">
                    <FadeIn>
                        <p className="text-lg text-brand-navy">
                            Courtière immobilière depuis plus de 20 ans, Sonia Rose accompagne vendeurs et acheteurs et investisseurs sur la Rive-Sud et dans le Grand Montréal. Connue pour sa façon juste et transparente d’aborder l’immobilier, Sonia offre un accompagnement complet et des stratégies adaptées à chacun, que ce soit pour la vente ou l’achat de propriétés, de condos et d’immeubles à revenus.
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* NEW SECTION — QUI EST SONIA ROSE */}
            <section className="relative overflow-hidden" style={{ backgroundColor: '#E6DDD0' }}>
                {/* Logo Top Right */}
                <div className="absolute top-8 right-8 z-10 hidden md:block opacity-80">
                    <img
                        src="/images/sonia-rose-logo.png"
                        alt="Sonia Rose Logo"
                        width={200}
                        height={100}
                        className="object-contain"
                    />
                </div>

                <div className="container mx-auto px-4 flex flex-col md:flex-row">
                    <div className="md:w-1/2 py-16 text-center flex flex-col items-center justify-center z-10">
                        <FadeIn>
                            <h2 className="mb-6 font-serif text-5xl font-light tracking-wide leading-tight" style={{ color: '#734838' }}>
                                QUI EST<br />SONIA ROSE?
                            </h2>
                            <p className="mb-8 text-lg leading-relaxed max-w-md" style={{ color: '#734838' }}>
                                Courtière immobilière depuis plus de 20 ans, Sonia Rose accompagne vendeurs, acheteurs et investisseurs avec une approche humaine, authentique et profondément stratégique. Reconnue pour sa transparence, sa sensibilité et son expertise, elle guide chaque client vers les bonnes décisions — au bon moment.
                            </p>
                            <Button asChild size="lg" className="px-8 py-6 text-lg rounded-none shadow-none hover:opacity-90 transition-opacity" style={{ backgroundColor: '#734838', color: '#FFFFFF' }}>
                                <Link href="/a-propos">
                                    DÉCOUVRIR MON<br />HISTOIRE
                                </Link>
                            </Button>
                        </FadeIn>
                    </div>
                    <div className="md:w-1/2 relative min-h-[600px] w-full">
                        <div className="absolute inset-0 overflow-hidden">
                            <img
                                src="/sonia-rose-transparent.png"
                                alt="Sonia Rose"
                                className="absolute inset-0 w-full h-full object-cover object-top"
                                style={{
                                    transform: `scale(${imageZoom}) translate(${imageX}px, ${imageY}px)`,
                                    transformOrigin: 'top center'
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 3 — AVEC SONIA ROSE (3 blocs) */}
            <Section background="cream">
                <FadeIn>
                    <div className="mb-16 text-center">
                        <h2 className="mb-4 font-serif text-4xl font-bold text-brand-navy">Avec Sonia Rose</h2>
                        <p className="text-xl text-brand-navy">Vendre. Acheter. Évaluer. Tout commence ici.</p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-3">
                        {/* Bloc 1 */}
                        <Link href="/proprietes" className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-transform hover:-translate-y-1">
                            <div className="aspect-[4/3] bg-slate-200 relative">
                                <img
                                    src="/Vendu%20-%20Sainte-Julie.jpeg"
                                    alt="Propriétés Sonia Rose"
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    style={{ opacity: opacity1 }}
                                />

                            </div>
                            <div className="p-6">
                                <h3 className="mb-2 font-serif text-2xl font-bold text-brand-navy group-hover:text-brand-gold">Mes Propriétés</h3>
                                <p className="text-brand-navy">Découvrez les propriétés disponibles sur la Rive-Sud.</p>
                            </div>
                        </Link>

                        {/* Bloc 2 */}
                        <Link href="https://tally.so/r/QKKpvG" target="_blank" className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-transform hover:-translate-y-1">
                            <div className="aspect-[4/3] bg-slate-200 relative">
                                <img
                                    src="/avec-sonia-2.jpg"
                                    alt="Évaluation Gratuite"
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    style={{ opacity: opacity2 }}
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="mb-2 font-serif text-2xl font-bold text-brand-navy group-hover:text-brand-gold">Évaluation Gratuite</h3>
                                <p className="text-brand-navy">Estimez ce que votre propriété vaut vraiment.</p>
                            </div>
                        </Link>

                        {/* Bloc 3 */}
                        <Link href="/acheteurs" className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-transform hover:-translate-y-1">
                            <div className="aspect-[4/3] bg-slate-200 relative">
                                <img
                                    src="/avec-sonia-3.jpg"
                                    alt="Acheter avec Sonia Rose"
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    style={{ opacity: opacity3 }}
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="mb-2 font-serif text-2xl font-bold text-brand-navy group-hover:text-brand-gold">Achetez avec moi</h3>
                                <p className="text-brand-navy">Un accompagnement humain pour votre projet d'achat.</p>
                            </div>
                        </Link>
                    </div>
                </FadeIn>
            </Section>

            {/* SECTION 4 — TRAVAILLER AVEC MOI */}
            <section className="relative py-20" style={{ backgroundColor: '#E6DDD0' }}>

                {/* CORNER LOGO */}
                <div className="absolute bottom-4 right-4 w-32 h-16 opacity-80 md:w-48 md:h-24">
                    <img
                        src="/images/old-sonia-logo.png"
                        alt="Sonia Rose Logo (Old)"
                        className="absolute inset-0 w-full h-full object-contain object-right-bottom"
                    />
                </div>

                <div className="container mx-auto px-4">
                    <FadeIn>
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
                    </FadeIn>
                </div>
            </section>

            {/* SECTION 5 — TÉMOIGNAGES */}
            <Section background="white">
                <FadeIn>
                    <div className="text-center">
                        <h2 className="mb-12 font-serif text-5xl font-bold text-brand-navy">Témoignages</h2>
                        <div className="relative mx-auto max-w-4xl">
                            {/* Carousel container */}
                            <div className="overflow-hidden">
                                <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                                    {testimonials.map((testimonial, index) => (
                                        <div key={index} className="w-full flex-shrink-0 px-8 py-12">
                                            <p className="mb-6 text-xl text-brand-navy italic">{testimonial.quote}</p>
                                            <p className="font-serif text-2xl font-bold text-brand-navy">{testimonial.author}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Navigation arrows */}
                            <button
                                className="absolute left-[-60px] top-1/2 -translate-y-1/2 text-brand-navy bg-white rounded-full shadow-md p-4 hover:bg-brand-gold hover:text-white transition"
                                onClick={() => setCurrentSlide((prev) => Math.max(prev - 1, 0))}
                            >
                                ←
                            </button>
                            <button
                                className="absolute right-[-60px] top-1/2 -translate-y-1/2 text-brand-navy bg-white rounded-full shadow-md p-4 hover:bg-brand-gold hover:text-white transition"
                                onClick={() => setCurrentSlide((prev) => Math.min(prev + 1, testimonials.length - 1))}
                            >
                                →
                            </button>
                        </div>
                    </div>
                </FadeIn>
            </Section>

            {/* SECTION 6 — MÉDIAS SOCIAUX */}
            <Section background="cream">
                <FadeIn>
                    <div className="text-center">
                        <h2 className="mb-4 font-serif text-4xl font-bold text-brand-navy">Médias sociaux</h2>
                        <p className="mb-12 text-xl text-brand-navy">Suivez-moi sur mes réseaux</p>

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
                </FadeIn>
            </Section>




            {/* SECTION 5- CALL TO ACTION */}
            <section className={`relative flex items-center overflow-hidden ${ctaSectionPadding}`}>
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/cta-background.jpg"
                        alt="Background"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    {/* Overlay/Blur */}
                    <div className="absolute inset-0 bg-white/30 backdrop-blur-sm" />
                </div>

                <div className="container relative z-10 mx-auto px-4 h-full flex flex-col md:flex-row items-center">
                    {/* Left Column - Sonia Image */}
                    <div className="md:w-1/2 h-full flex items-end justify-center md:justify-start mt-10 md:mt-0">
                        <div className={`relative w-full ${ctaImageWidth} ${ctaImageHeight} -mb-20`}>
                            <img
                                src="/cta-sonia.png"
                                alt="Sonia Rose"
                                className="absolute inset-0 w-full h-full object-contain object-bottom"
                                style={{
                                    transform: `scale(${ctaImageScale}) translate(${ctaImageX}px, ${ctaImageY}px)`,
                                    transformOrigin: 'bottom center'
                                }}
                            />
                        </div>
                    </div>

                    {/* Right Column - Content */}
                    <div className="md:w-1/2 text-center md:text-right flex flex-col items-center md:items-end justify-center py-16 md:py-0">
                        <FadeIn>
                            {/* Logo */}
                            <div className="mb-12 opacity-80">
                                <img
                                    src="/images/sonia-rose-logo.png"
                                    alt="Sonia Rose Logo"
                                    width={250}
                                    height={125}
                                    className="object-contain"
                                />
                            </div>

                            {/* Text Content */}
                            <div className="space-y-8 max-w-xl text-black">
                                <p className="text-lg leading-relaxed">
                                    Qu’il s’agisse d’acheter, vendre ou d’investir, je vous accompagne avec humanité, écoute et transparence.
                                    <br />
                                    Ma priorité est de comprendre ce que vous vivez maintenant, vos besoins réel, et de vous guider vers une propriété qui est alignée avec vos besoins.
                                </p>

                                <p className="text-lg leading-relaxed">
                                    Je vous accompagne sans pression, avec une approche simple, humaine et structurée. Je mets à votre services mes années d’expérience, mes stratégies et ma connaissance du marché immobilier sur la Rive-Sud et le Grand Montréal, afin de sécuriser chaque étape et de protéger vos intérêts.
                                </p>

                                <p className="text-lg leading-relaxed">
                                    Votre projet immobilier mérite une expérience fluide, respectueuse et en confiance. Et je suis là pour vous du début à la fin.
                                </p>

                                <div className="pt-4">
                                    <p className="text-xl italic mb-2">Prêt(e) à écrire la suite ?</p>
                                    <p className="text-xl italic">Je suis là pour vous accompagner.</p>
                                </div>

                                <div className="pt-4">
                                    <p className="text-lg font-bold">— Sonia Rose</p>
                                    <p className="text-sm">Courtière immobilière | RE/MAX Imagine Inc.</p>
                                    <p className="text-sm">Résidentiel / Commercial</p>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="mt-12 flex flex-col sm:flex-row gap-6">
                                <Button asChild size="lg" className="px-8 py-6 text-lg rounded-none shadow-lg hover:opacity-90 transition-opacity min-w-[250px]" style={{ backgroundColor: '#5D4037', color: '#FFFFFF' }}>
                                    <Link href="https://tally.so/r/A7PEko" target="_blank">ACHETEZ AVEC MOI</Link>
                                </Button>
                                <Button asChild size="lg" className="px-8 py-6 text-lg rounded-none shadow-lg hover:opacity-90 transition-opacity min-w-[250px]" style={{ backgroundColor: '#5D4037', color: '#FFFFFF' }}>
                                    <Link href="https://tally.so/r/QKKpvG" target="_blank">VENDEZ AVEC MOI</Link>
                                </Button>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>


        </>
    );
}
