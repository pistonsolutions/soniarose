import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/ui/section';
import { FadeIn } from '@/components/ui/fade-in';
import { TrendingUp, Users, Camera, FileCheck } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Vendre sa propriété Rive-Sud | Évaluation Gratuite Sonia Rose',
    description: 'Vendez votre propriété au meilleur prix avec Sonia Rose. Stratégie de mise en marché performante, photos pro et évaluation gratuite sur la Rive-Sud.',
};

export default function SellersPage() {
    // CONFIGURATION
    const heroImageOpacity = 0.6; // Opacity of the background image (0.0 to 1.0)

    // BIO SECTION CONFIGURATION
    const sellersBioScale = 1.5; // Adjusted for new Portrait asset (was 3.7)
    const sellersBioX = 0; // Horizontal offset in pixels
    const sellersBioY = 150; // Vertical offset in pixels

    // GUIDE SECTION CONFIGURATION
    const sellersGuideScale = 1; // Scale the image (1 = 100%, 1.1 = 110%, etc.)
    const sellersGuideX = 0; // Horizontal offset in pixels
    const sellersGuideY = 0; // Vertical offset in pixels

    // CTA SECTION CONFIGURATION
    const ctaImageOpacity = 0.4; // Opacity of the background image (0.0 to 1.0)

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
                                url: 'https://soniarose.ca/assets/logo-sonia-rose-new.png',
                            },
                        },
                    }),
                }}

            />

            {/* HERO SECTION */}
            <section className="relative flex h-[60vh] min-h-[500px] items-center justify-center overflow-hidden">
                <Image
                    src="/sellers-hero-bg.jpg"
                    alt="Vendre sa propriété avec Sonia Rose"
                    fill
                    className="object-cover"
                    priority
                    style={{ opacity: heroImageOpacity }}
                />
                <div className="container relative z-10 mx-auto px-4 text-center">
                    <FadeIn delay={0.2}>
                        <h1 className="font-sans text-6xl md:text-8xl lg:text-9xl tracking-widest uppercase text-brand-beige-300" style={{ textShadow: '3px 5px 6px rgba(0, 0, 0, 0.4)' }}>
                            VENDEURS
                        </h1>
                    </FadeIn>
                </div>
            </section>

            {/* Section 2 - POURQUOI VENDRE AVEC SONIA ROSE */}
            <section className="py-20 overflow-hidden bg-brand-beige-400">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <div className="flex flex-col lg:flex-row items-center">
                            {/* Left Column: Text */}
                            <div className="lg:w-1/2 z-10 lg:pr-12">
                                <h2 className="mb-2 font-sans text-5xl md:text-6xl uppercase tracking-wide leading-tight text-brand-brown">
                                    POURQUOI VENDRE AVEC <br /> SONIA ROSE
                                </h2>

                                <div className="space-y-6 text-lg leading-relaxed mt-8 text-brand-brown">
                                    <p>
                                        Vendre une propriété, ce n’est pas juste une transaction — c’est un moment important de ta vie. Et tu mérites quelqu’un qui va te représenter comme si c’était sa propre maison.
                                    </p>
                                    <p>
                                        Depuis plus de 20 ans, j’accompagne les vendeurs qui veulent une transaction fluide, bien gérée, et surtout rentable. Mon rôle, c’est de protéger ta valeur, ton temps et tes intérêts à chaque étape.
                                    </p>
                                    <p>
                                        Voici ce que je fais pour toi :
                                    </p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>analyse juste de la valeur marchande</li>
                                        <li>stratégie de mise en marché réfléchie</li>
                                        <li>photos et vidéos professionnelles qui attirent les bons acheteurs</li>
                                        <li>positionnement optimal sur les plateformes clés</li>
                                        <li>visibilité maximale pour générer des visites qualifiées</li>
                                        <li>négociation serrée pour aller chercher chaque dollar possible</li>
                                        <li>suivi rigoureux jusqu’à la signature chez le notaire</li>
                                    </ul>
                                    <p>
                                        Je prends ton dossier à cœur — et je le mène comme si je vendais ma propre propriété. Avec clarté, rigueur et expertise.
                                    </p>
                                </div>
                            </div>

                            {/* Right Column: Image */}
                            <div className="lg:w-1/2 relative h-[500px] md:h-[700px] w-full mt-10 lg:mt-0 flex items-end justify-center lg:justify-end">
                                <div className="relative w-full h-full max-w-lg">
                                    <Image
                                        src="/assets/sellers/why-sell-portrait.png"
                                        alt="Sonia Rose"
                                        fill
                                        className="object-contain object-bottom"
                                        style={{
                                            transform: `scale(${sellersBioScale}) translate(${sellersBioX}px, ${sellersBioY}px)`,
                                            transformOrigin: 'bottom center'
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Section 3 - QUELLE EST LA VALEUR DE VOTRE PROPRIÉTÉ? */}
            <section className="py-20 bg-brand-beige-400">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                            {/* Left Column: Image */}
                            <div className="lg:w-1/2">
                                <div className="relative aspect-square w-full shadow-xl">
                                    <Image
                                        src="/assets/sellers/sellers-explore.jpg"
                                        alt="Cuisine moderne"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>

                            {/* Right Column: Content */}
                            <div className="lg:w-1/2 text-center">
                                <h2 className="mb-4 font-sans text-3xl md:text-5xl uppercase leading-tight text-brand-brown">
                                    QUELLE EST LA VALEUR DE <br /> VOTRE PROPRIÉTÉ?
                                </h2>
                                <p className="mb-8 text-lg leading-relaxed text-brand-brown">
                                    Reçois une estimation personnalisée basée sur ton adresse.<br />
                                    Simple, rapide, sans pression — juste une analyse claire pour savoir où tu te situes réellement sur le marché.
                                </p>

                                {/* Address Input Simulation */}
                                <Link href="https://tally.so/r/QKKpvG" target="_blank" className="mb-8 mx-auto max-w-md bg-white/50 p-2 rounded-full border border-brand-brown/30 flex items-center shadow-sm hover:bg-white/70 transition-colors cursor-pointer">
                                    <div className="flex-grow px-4 py-2 text-left text-brand-brown/70 italic">
                                        Entrez votre adresse pour commencer
                                    </div>
                                    <div className="h-10 w-10 flex items-center justify-center bg-brand-beige-400 rounded-full text-brand-brown font-bold border border-brand-brown/20">
                                        #
                                    </div>
                                </Link>

                                <div className="mb-12">
                                    <Button asChild size="lg" className="px-12 py-6 text-xl shadow-none hover:opacity-90 transition-opacity uppercase tracking-wider bg-brand-brown text-white">
                                        <Link href="https://tally.so/r/QKKpvG" target="_blank">SUIVANT</Link>
                                    </Button>
                                </div>

                                {/* Steps */}
                                <div className="flex justify-center gap-4 md:gap-8">
                                    {/* Step 1 */}
                                    <div className="flex flex-col items-center justify-center w-28 h-28 md:w-32 md:h-32 rounded-full bg-brand-beige-200 text-brand-brown p-2 shadow-sm">
                                        <span className="font-sans font-bold text-lg mb-1">ÉTAPE 1</span>
                                        <span className="text-xs md:text-sm leading-tight">Adresse de la propriété</span>
                                    </div>
                                    {/* Step 2 */}
                                    <div className="flex flex-col items-center justify-center w-28 h-28 md:w-32 md:h-32 rounded-full bg-brand-beige-400 text-brand-brown p-2 shadow-sm">
                                        <span className="font-sans font-bold text-lg mb-1">ÉTAPE 2</span>
                                        <span className="text-xs md:text-sm leading-tight">Détails de la propriété</span>
                                    </div>
                                    {/* Step 3 */}
                                    <div className="flex flex-col items-center justify-center w-28 h-28 md:w-32 md:h-32 rounded-full bg-brand-beige-600 text-white p-2 shadow-sm">
                                        <span className="font-sans font-bold text-lg mb-1">ÉTAPE 3</span>
                                        <span className="text-xs md:text-sm leading-tight">Évaluation gratuite</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Section 4 - GUIDE PRATIQUE POUR VOTRE VENTE */}
            <section className="py-20 bg-brand-beige-400">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                            {/* Left Column: Image */}
                            <div className="lg:w-1/2 flex justify-center lg:justify-end">
                                <div className="relative w-full max-w-md aspect-[3/4] shadow-2xl">
                                    <Image
                                        src="/sellers-guide-cover.png"
                                        alt="Guide du Vendeur"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>

                            {/* Right Column: Content */}
                            <div className="lg:w-1/2 text-left">
                                <h2 className="mb-6 font-sans text-3xl md:text-5xl uppercase leading-tight text-brand-brown">
                                    GUIDE PRATIQUE POUR <br /> VOTRE VENTE
                                </h2>
                                <div className="space-y-6 text-lg leading-relaxed text-brand-brown">
                                    <p>
                                        Vendre une propriété, c’est un projet important.<br />
                                        Pour t’aider à avancer avec clarté et confiance, j’ai préparé un guide complet rempli de conseils pratiques, d’étapes essentielles et d’informations précises pour que tu sois parfaitement accompagné du début à la fin.
                                    </p>
                                    <p>
                                        Télécharge-le gratuitement et prépare ta vente en toute tranquillité.
                                    </p>
                                </div>

                                <div className="mt-10">
                                    <Button asChild size="lg" className="px-10 py-6 text-xl shadow-none hover:opacity-90 transition-opacity uppercase tracking-wider bg-brand-brown text-white">
                                        <Link href="https://drive.google.com/file/d/1qEjWFoXa9zZv-LwFF5B83kG4UgjF8GES/view?usp=sharing" target="_blank">TÉLÉCHARGEZ-LE</Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Section 5 - MISE EN MARCHÉ STRATÉGIQUE */}
            <section>
                {/* Header Image */}
                <div className="relative h-[300px] md:h-[400px] w-full">
                    <Image
                        src="/sellers-marketing-header.jpg"
                        alt="Mise en marché stratégique"
                        fill
                        className="object-cover"
                    />
                </div>
                {/* Content */}
                <div className="py-20 bg-brand-beige-400">
                    <div className="container mx-auto px-4 text-center">
                        <FadeIn>
                            <h2 className="mb-8 font-sans text-3xl md:text-5xl uppercase leading-tight text-brand-brown">
                                MISE EN MARCHÉ STRATÉGIQUE
                            </h2>
                            <div className="max-w-4xl mx-auto space-y-6 text-lg leading-relaxed font-medium text-brand-brown">
                                <p>
                                    Chaque propriété est unique.<br />
                                    Mon rôle, c’est de créer une mise en marché réfléchie, professionnelle et conçue pour mettre en valeur ta maison au maximum.
                                </p>
                                <p>
                                    Voici comment je t’accompagne :
                                </p>
                                <ul className="space-y-1">
                                    <li>-ajuster juste la valeur marchande</li>
                                    <li>-préparer ta maison pour attirer l’acheteur idéal</li>
                                    <li>-photos/vidéos HD par des pros</li>
                                    <li>-positionnement optimal sur les plateformes clés</li>
                                    <li>-stratégie qui attire les bons acheteurs</li>
                                    <li>-négociation ferme et serrée</li>
                                    <li>-suivi rigoureux jusqu’à l’acte notarié</li>
                                </ul>
                                <p className="pt-6">
                                    Avec moi, tout est encadré, stratégique et pensé pour que tu obtiennes le meilleur résultat possible.
                                </p>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* Section 6 - OBTIENS TON RAPPORT PERSONNALISÉ */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                            {/* Left Column: Image */}
                            <div className="lg:w-1/2 flex justify-center lg:justify-end">
                                <div className="relative w-full max-w-md shadow-lg">
                                    <Image
                                        src="/sellers-report-quiz.png"
                                        alt="Rapport personnalisé"
                                        width={500}
                                        height={600}
                                        className="object-contain"
                                    />
                                </div>
                            </div>

                            {/* Right Column: Content */}
                            <div className="lg:w-1/2 text-center lg:text-right">
                                <h2 className="mb-4 font-sans text-3xl md:text-5xl uppercase leading-tight text-brand-brown">
                                    OBTIENS TON RAPPORT <br /> PERSONNALISÉE
                                </h2>
                                <h3 className="mb-8 font-sans text-xl md:text-2xl font-bold text-brand-brown">
                                    Découvre les vérités cachées qui influencent vraiment la valeur de ta propriété
                                </h3>
                                <div className="space-y-4 text-lg leading-relaxed text-brand-brown">
                                    <p>Découvre les vérités cachées qui influencent réellement ta valeur.</p>
                                    <p>Mon rapport personnalisé te montre :</p>
                                    <ul className="space-y-1">
                                        <li>-ce que ta maison vaut vraiment</li>
                                        <li>-ce que les acheteurs recherchent dans ton secteur</li>
                                        <li>-ce qui peut faire monter ta valeur</li>
                                        <li>-et ce que tu pourrais laisser sur la table si ce n’est pas bien présent</li>
                                    </ul>
                                    <p className="pt-4">Ton rapport est simple, clair et personnalisé selon ton dossier.</p>
                                </div>

                                <div className="mt-10">
                                    <Button asChild size="lg" className="px-10 py-6 text-xl rounded-none shadow-none hover:opacity-90 transition-opacity uppercase tracking-wider bg-brand-brown text-white">
                                        <Link href="https://tally.so/r/QKKpvG" target="_blank">RECEVOIR MON RAPPORT</Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Section 7 - ET SI TA MAISON NE TE RESSEMBLAIT PLUS VRAIMENT? */}
            <section>
                {/* Header Image */}
                <div className="relative h-[300px] md:h-[400px] w-full">
                    <Image
                        src="/assets/sellers/sellers-quiz-header.jpg"
                        alt="Café et détente"
                        fill
                        className="object-cover"
                    />
                </div>
                {/* Content */}
                <div className="py-20 bg-brand-beige-400">
                    <div className="container mx-auto px-4 text-center">
                        <FadeIn>
                            <h2 className="mb-8 font-sans text-3xl md:text-5xl uppercase leading-tight text-brand-brown">
                                ET SI TA MAISON NE TE RESSEMBLAIT <br /> PLUS VRAIMENT?
                            </h2>
                            <div className="max-w-3xl mx-auto space-y-6 text-lg leading-relaxed text-brand-brown">
                                <p>
                                    Il arrive un moment où une maison cesse d’être seulement un lieu.<br />
                                    Elle devient le reflet de ton histoire, de tes choix, et de ton évolution.
                                </p>
                                <p>
                                    Si tu ressens quelque chose qui ne correspond plus tout à fait à la personne que tu es devenue, prends deux minutes pour faire le test — il peut t’aider à voir si ta maison est encore alignée avec ta vie d’aujourd’hui.
                                </p>
                            </div>
                            <div className="mt-10">
                                <Button asChild size="lg" className="px-10 py-6 text-xl rounded-none shadow-none hover:opacity-90 transition-opacity uppercase tracking-wider bg-brand-brown text-white">
                                    <Link href="https://tally.so/r/mZK1pz" target="_blank">FAIS LE TEST</Link>
                                </Button>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* Section 8 - PRÊT(E) À PASSER À L’ACTION? */}
            <section className="relative py-32 overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/assets/sellers/cta-bg.jpg"
                        alt="Background"
                        fill
                        className="object-cover"
                        style={{ opacity: ctaImageOpacity }}
                    />
                </div>

                <div className="container relative z-10 mx-auto px-4 text-center">
                    <FadeIn>
                        <h2 className="mb-8 font-sans text-4xl md:text-6xl uppercase leading-tight text-brand-brown">
                            PRÊT(E) À PASSER À L’ACTION?
                        </h2>
                        <div className="max-w-4xl mx-auto space-y-6 text-xl leading-relaxed font-medium text-brand-brown">
                            <p>
                                Vendre une propriété, ce n’est pas rien.<br />
                                C’est une décision importante, un chapitre de vie qui mérite d’être accompagné(e) avec soin.
                            </p>
                            <p>
                                Si tu veux avancer avec clarté, sécurité et un vrai accompagnement humain, je suis là pour te guider du début à la fin — avec rigueur, transparence et bienveillance.
                            </p>
                            <p className="pt-4">
                                Parle-moi de ton projet quand tu seras prêt(e).<br />
                                On va transformer ça en réussite.
                            </p>
                        </div>

                        <div className="mt-12">
                            <Button asChild size="lg" className="px-10 py-6 text-xl rounded-none shadow-none hover:opacity-90 transition-opacity uppercase tracking-wider bg-brand-brown text-white">
                                <Link href="/contact">ME CONTACTER</Link>
                            </Button>
                        </div>
                    </FadeIn>
                </div>

                {/* Logo Watermark */}
                <div className="absolute right-4 bottom-4 w-48 md:w-64 opacity-50 pointer-events-none z-0">
                    <Image
                        src="/assets/logo-sonia-rose-new.png"
                        alt="Sonia Rose Logo"
                        width={200}
                        height={100}
                        className="object-contain"
                    />
                </div>
            </section>
        </>
    );
}
