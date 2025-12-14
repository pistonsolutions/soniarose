"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/ui/section';
import { FadeIn } from '@/components/ui/fade-in';
import { Star, Instagram, Facebook, Linkedin, Youtube } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function HomePage() {
    const [currentSlide, setCurrentSlide] = useState(0);

    // HERO CONFIGURATION (Section 1)
    const heroZoom = 1; // Zoom level (1 = 100%)
    const heroImagePosition = '50% 80%'; // Position: '50% 50%' = center, '50% 100%' = bottom. '50% 80%' moves it up slightly.

    // SECTION 2 CONFIGURATION: Adjust these values to position the "Qui est Sonia Rose" image
    const imageZoom = 2.5; // Zoom level (1 = 100%)
    const imageX = 0;       // Horizontal offset in pixels
    const imageY = 60;       // Vertical offset in pixels

    // SECTION 3 CONFIGURATION: Adjust opacity for the 3 images (0 to 1)
    const opacity1 = 1;
    const opacity2 = 1;
    const opacity3 = 1;

    // SECTION 5 CONFIGURATION
    const ctaSectionPadding = 'py-12'; // Adjust section vertical padding
    const ctaImageHeight = 'h-[50vh] md:h-[85vh]'; // Scalable height relative to viewport (50vh mobile, 85vh desktop)
    const ctaImageWidth = 'w-full max-w-3xl'; // Allow wider width for better scaling
    const ctaImageScale = 1; // Scale the image (1 = 100%, 1.5 = 150%, etc.)
    const ctaImageX = 0; // Horizontal offset in pixels
    const ctaImageY = 0; // Vertical offset in pixels

    const testimonials = [
        {
            quote: "Sonia Rose à dépassée toutes nos attentes en tant que Courtière immobilière. Son professionnalisme exceptionel, sa connaissance approfondie du marché et son engagement à satisfaire pleinement ses clients ont rendu notre expérience remarquable. Grâce à son dynamisme e, sa transparence, son attitude positive et à sa dilligence, elle a facilité chaque étape du processus. Je la recommande vivement à tous ceux qui recherche une expertise de qualité!!",
            author: "– Christiane et Louise, La Prairie",
        },
        {
            quote: "J'ai choisi Sonia Rose pour me représenter après avoir vécu un cauchemar de 7 mois avec une courtière qui donne une mauvaise réputation au métier. J'étais méfiant au début, mais Sonia m'a démontré qu'elle se donne à 100% pour ses clients, et ça parraît. Elle est vite en affaires, elle n'a pas de temps à perdre, et elle est très minutieuse. C'était pour la vente d'un immeuble locatif, et elle m'a trouvé un investisseur sérieux, et c'était déjà décidé lors le la première visite. On vient de passer chez le notaire pour finaliser la vente, et tout ça en moins de 30 jours de la visite initiale. En partant, j'étais très méfiant de tous les courtiers/ères, mais Sonia m'a démontré qu'elle est digne de confiance, et je serai toujours reconnaissant pour ses services. Merci Sonia:)",
            author: "– D.Blakney, Montréal",
        },
        {
            quote: "Ça bouge avec Sonia Rose. Si vous êtes à la recherche d'un Courtier Immobilier de confiance, notre expérience personnelle en fait foi. Non seulement elle avait bien ciblé le montant à afficher pour la mise en vente de notre propriété mais aussi le prix obtenu à la vente! Sa connaissance du milieu immobilier et la confiance qu'elle démontre ont été révélateur tout comme sa personnalité attachante et dynamique. Nous sommes enchantés de notre expérience et n'hésiter pas, c'est Sonia Rose qu'il vous faut!!",
            author: "– Louis et Lise, Longueuil",
        },
    ];

    return (
        <>
            {/* SECTION 1 — HERO */}
            <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-brand-cream">
                <div className="absolute inset-0 z-0">
                    <motion.div
                        initial={{ scale: 1 }}
                        animate={{ scale: 2 }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "linear"
                        }}
                        className="relative h-full w-full"
                    >
                        <Image
                            src="/assets/home/hero-bg.jpg"
                            alt="Sonia Rose Courtier Immobilier"
                            fill
                            className="object-cover"
                            priority
                            style={{ objectPosition: heroImagePosition }}
                        />
                    </motion.div>
                    <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, rgba(255, 255, 255, var(--hero-bg-opacity, 0.1)), rgba(255, 255, 255, var(--hero-bg-opacity, 0.1)))` }} />
                </div>

                <div className="container relative z-10 mx-auto px-4 text-center text-brand-navy">
                    <FadeIn delay={0.2}>
                        <h1 className="mb-6 font-serif text-4xl font-bold md:text-6xl">
                            L'immobilier, <span className="text-brand-gold">plus qu'une transaction</span>
                        </h1>
                        <p className="mb-8 text-lg font-medium md:text-xl text-slate-900">
                            Une étape de vie qui mérite réflexion, stratégie et respect.
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
            <section className="relative bg-[#E6DDD0] flex flex-col md:block">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/2 py-12 md:py-16 text-center flex flex-col items-center justify-center">
                            <FadeIn>
                                <h2 className="mb-8 font-serif text-6xl md:text-7xl font-light tracking-wide leading-tight" style={{ color: '#734838' }}>
                                    QUI EST<br />SONIA ROSE?
                                </h2>
                                <p className="mb-10 text-xl md:text-2xl leading-relaxed max-w-lg" style={{ color: '#734838' }}>
                                    Courtière immobilière depuis plus de 20 ans, Sonia Rose accompagne vendeurs, acheteurs et investisseurs avec une approche humaine, authentique et profondément stratégique. Reconnue pour sa transparence, sa sensibilité et son expertise, elle guide chaque client vers les bonnes décisions — au bon moment.
                                </p>
                                <Button asChild size="lg" className="px-10 py-8 text-xl rounded-none shadow-none hover:opacity-90 transition-opacity" style={{ backgroundColor: '#734838', color: '#FFFFFF' }}>
                                    <Link href="/a-propos">
                                        DÉCOUVRIR MON<br />HISTOIRE
                                    </Link>
                                </Button>
                            </FadeIn>
                        </div>
                        <div className="md:w-1/2"></div> {/* Spacer */}
                    </div>
                </div>

                {/* Image Container */}
                <div className="relative w-full h-[500px] md:absolute md:top-0 md:right-0 md:w-1/2 md:h-full z-0">
                    <Image
                        src="/assets/home/sonia-portrait-intro.png"
                        alt="Sonia Rose"
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                    />
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
                                <Image
                                    src="/assets/home/my-properties-bg.jpg"
                                    alt="Propriétés Sonia Rose"
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
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
                                <Image
                                    src="/assets/home/free-eval-bg.jpg"
                                    alt="Évaluation Gratuite"
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
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
                                <Image
                                    src="/assets/home/buy-with-me-bg.jpg"
                                    alt="Acheter avec Sonia Rose"
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
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
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-black">
                                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                                </svg>
                            </Link>
                            <Link href="https://www.instagram.com/soniarose.remax" target="_blank" className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md transition-transform hover:scale-110 hover:text-brand-gold">
                                <svg viewBox="0 0 24 24" className="w-8 h-8">
                                    <defs>
                                        <linearGradient id="instagram-gradient-home" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#f09433" />
                                            <stop offset="25%" stopColor="#e6683c" />
                                            <stop offset="50%" stopColor="#dc2743" />
                                            <stop offset="75%" stopColor="#cc2366" />
                                            <stop offset="100%" stopColor="#bc1888" />
                                        </linearGradient>
                                    </defs>
                                    <path fill="url(#instagram-gradient-home)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </Link>
                            <Link href="https://www.facebook.com/SoniaRoseImmobilier/" target="_blank" className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md transition-transform hover:scale-110 hover:text-brand-gold">
                                <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#1877F2] fill-current">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </Link>
                            <Link href="https://www.youtube.com/@rosesonia662" target="_blank" className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md transition-transform hover:scale-110 hover:text-brand-gold">
                                <Youtube size={32} className="text-[#FF0000]" />
                            </Link>
                            <Link href="https://www.linkedin.com/in/sonia-rose-969025127" target="_blank" className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md transition-transform hover:scale-110 hover:text-brand-gold">
                                <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#0A66C2] fill-current">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </FadeIn>
            </Section>




            {/* SECTION 5- CALL TO ACTION */}
            <section className={`relative flex items-center overflow-hidden ${ctaSectionPadding}`}>
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/assets/home/footer-bg.jpg"
                        alt="Background"
                        fill
                        className="object-cover"
                    />
                    {/* Overlay/Blur */}
                    <div className="absolute inset-0 bg-white/30 backdrop-blur-sm" />
                </div>

                <div className="container relative z-10 mx-auto px-4 h-full flex flex-col md:flex-row items-center">
                    {/* Left Column - Sonia Image */}
                    <div className="md:w-1/2 h-full flex items-end justify-center md:justify-start mt-10 md:mt-0">
                        <div className={`relative w-full max-w-5xl ${ctaImageHeight} md:-mb-20`}>
                            <Image
                                src="/assets/home/sonia-portrait-cta.png"
                                alt="Sonia Rose"
                                fill
                                className="object-cover object-top md:object-contain md:object-bottom"
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
