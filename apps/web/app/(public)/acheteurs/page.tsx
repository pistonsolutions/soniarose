import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/ui/section';
import { FadeIn } from '@/components/ui/fade-in';
import { CheckCircle2, Search, Key, ShieldCheck } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Acheter une propriété Rive-Sud | Sonia Rose Courtier Immobilier',
    description: 'Achetez votre future propriété sur la Rive-Sud avec Sonia Rose. Un accompagnement stratégique pour trouver la maison idéale au meilleur prix.',
};

export default function BuyersPage() {
    // HERO CONFIGURATION
    const heroImageOpacity = 0.6; // Opacity of the background image (0.0 to 1.0)

    // BIO SECTION CONFIGURATION
    const bioImageScale = 3.5; // Scale the image (1 = 100%, 1.1 = 110%, etc.)
    const bioImageX = 0; // Horizontal offset in pixels
    const bioImageY = 150; // Vertical offset in pixels

    // CTA SECTION CONFIGURATION
    const ctaImageOpacity = 0.8; // Opacity of the background image (0.0 to 1.0)

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
            <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-brand-cream">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/buyers-hero.jpg"
                        alt="Acheter une propriété avec Sonia Rose"
                        fill
                        className="object-cover"
                        priority
                        style={{ opacity: heroImageOpacity }}
                    />
                    {/* Light overlay to ensure text readability if needed */}
                    <div className="absolute inset-0 bg-black/10" />
                </div>
                <div className="container relative z-10 mx-auto px-4 text-center">
                    <FadeIn delay={0.2}>
                        <h1 className="font-serif text-6xl md:text-8xl text-white tracking-widest uppercase" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                            ACHETEURS
                        </h1>
                    </FadeIn>
                </div>
            </section>

            {/* SECTION 2 — POURQUOI ACHETER AVEC SONIA ROSE */}
            <section className="relative py-6 overflow-hidden" style={{ backgroundColor: '#ddd6cc' }}>
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <div className="flex flex-col lg:flex-row items-center">
                            {/* Left Column: Text */}
                            <div className="lg:w-1/2 z-10 lg:pr-12">
                                <h2 className="mb-2 font-serif text-5xl md:text-6xl uppercase tracking-wide leading-tight" style={{ color: '#734838' }}>
                                    POURQUOI ACHETER AVEC <br /> SONIA ROSE
                                </h2>

                                <div className="space-y-6 text-lg leading-relaxed mt-8" style={{ color: '#734838' }}>
                                    <p>
                                        Acheter une propriété, ce n’est pas seulement une étape financière.<br />
                                        C’est un moment de vie, un tournant où on veut se sentir guidé avec coeur, clarté et sécurité.
                                    </p>
                                    <p>
                                        Depuis plus de 20 ans, j’accompagne des acheteurs qui veulent faire un choix éclairé, un achat qui leur ressemble et qui s’inscrit dans la réalité de leur vie – pas seulement dans les chiffres.
                                    </p>
                                    <p>
                                        Quand tu achètes avec moi, tu n’avance jamais à l’aveugle. Je t’explique, je s’implifie, je protège, et je t’aide à comprendre chaque étape pour que tu saches exactement où tu t’en vas.
                                    </p>
                                    <p>
                                        Je t’accompagne pour :
                                    </p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>analyser le marché avec stratégie</li>
                                        <li>déterminer la juste valeur des propriétés</li>
                                        <li>éviter les mauvaises surprises et les pièges courants</li>
                                        <li>négocier intelligemment pour obtenir les meilleures conditions</li>
                                        <li>vivre ton processus d’achat avec sérénité</li>
                                    </ul>
                                    <p>
                                        Mon rôle, c’est d’être ton repère. Je suis là pour t’éviter du stress, pour t’aider à voir plus clair, pour répondre à tes questions et pour que tu te sentes vraiment accompagné, du début à la fin.
                                    </p>
                                    <p>
                                        Avec moi, acheter n’est jamais une aventure compliquée :<br />
                                        c’est un parcours guidé, réfléchi, humain — et adapté à toi.
                                    </p>
                                </div>
                            </div>

                            {/* Right Column: Image */}
                            <div className="lg:w-1/2 relative h-[320px] md:h-[440px] w-full mt-10 lg:mt-0 flex items-end justify-center lg:justify-end">
                                <div className="relative w-full h-full">
                                    <Image
                                        src="/buyers-bio.png"
                                        alt="Sonia Rose"
                                        fill
                                        className="object-contain object-bottom"
                                        style={{
                                            transform: `scale(${bioImageScale}) translate(${bioImageX}px, ${bioImageY}px)`,
                                            transformOrigin: 'bottom center'
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>


            {/* Section 2.5 - GUIDE DE L'ACHETEUR */}
            <section className="py-20 bg-brand-cream" style={{ backgroundColor: '#F2EFE9' }}>
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
                            {/* Left Column: Image */}
                            <div className="lg:w-1/2 flex justify-center lg:justify-end">
                                <div className="relative w-full max-w-md aspect-[3/4] shadow-2xl lg:mr-60">
                                    <Image
                                        src="/buyer-guide-cover.png"
                                        alt="Guide de l'acheteur"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>

                            {/* Right Column: Text */}
                            <div className="lg:w-1/2 text-left">
                                <h2 className="mb-6 font-serif text-4xl md:text-5xl uppercase leading-tight" style={{ color: '#734838' }}>
                                    GUIDE PRATIQUE POUR ACHETER SEREINEMENT
                                </h2>
                                <div className="space-y-6 text-lg leading-relaxed" style={{ color: '#734838' }}>
                                    <p>
                                        Acheter une propriété, c’est un projet important.<br />
                                        Pour vous aider à avancer avec clarté, confiance et simplicité, j’ai créé un guide complet qui rassemble les étapes essentielles et les informations utiles pour que votre expérience d’achat soit fluide, sécurisée et sans stress.
                                    </p>
                                    <p>
                                        Téléchargez-le gratuitement et avancez vers votre prochain achat, bien préparé et bien accompagné.
                                    </p>
                                </div>
                                <div className="mt-10">
                                    <Button asChild size="lg" className="px-8 py-4 text-lg rounded-none shadow-none hover:opacity-90 transition-opacity uppercase tracking-wider" style={{ backgroundColor: '#734838', color: '#FFFFFF' }}>
                                        <Link href="https://drive.google.com/file/d/1Pr6QYcisk7Rvrb4T6D1l9Iq3sNqPCyry/view" target="_blank">TÉLÉCHARGEZ-LE</Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>




            {/* Section 2.6 - ACCOMPAGNEMENT ÉTAPE PAR ÉTAPE */}
            <section className="relative">
                {/* Header Image */}
                <div className="relative w-full h-[300px] md:h-[400px]">
                    <Image
                        src="/buyers-steps-header.jpg"
                        alt="Accompagnement étape par étape"
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Text Content */}
                <div className="py-20" style={{ backgroundColor: '#ddd6cc' }}>
                    <div className="container mx-auto px-4 text-center">
                        <FadeIn>
                            <h2 className="mb-6 font-serif text-4xl md:text-5xl uppercase leading-tight" style={{ color: '#734838' }}>
                                ACCOMPAGNEMENT ÉTAPE PAR ÉTAPE
                            </h2>
                            <p className="text-xl mb-12 italic" style={{ color: '#734838' }}>
                                À chaque achat, vous méritez un accompagnement clair et humain.
                            </p>

                            <div className="max-w-4xl mx-auto space-y-2 text-lg md:text-xl leading-relaxed" style={{ color: '#734838' }}>
                                <p>Voici comment je vous accompagne :</p>
                                <p>- compréhension complète de vos besoins, de votre style de vie et de votre budget</p>
                                <p>- sélection ciblée des propriétés selon vos critères</p>
                                <p>- visites organisées avec analyse stratégique</p>
                                <p>- explication simple et transparente du marché</p>
                                <p>- coordination de l’inspection, du financement et des étapes juridiques</p>
                                <p>- protection de vos intérêts à chaque étape, pour éviter les mauvaises surprises</p>
                            </div>

                            <p className="mt-12 max-w-4xl mx-auto text-lg md:text-xl leading-relaxed" style={{ color: '#734838' }}>
                                Avec moi, vous serez accompagné(e), informé(e) et protégé(e). Vous gardez toujours le contrôle, et je m’assure que vous avancez en confiance.
                            </p>
                        </FadeIn>
                    </div>
                </div>
            </section>





            {/* Section 2.7 - ALERTE IMMOBILIÈRE PERSONNALISÉE */}
            <section className="relative">
                {/* Header Image */}
                <div className="relative w-full h-[300px] md:h-[400px]">
                    <Image
                        src="/buyers-alert-header.jpg"
                        alt="Alerte immobilière personnalisée"
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Text Content */}
                <div className="py-20" style={{ backgroundColor: '#F2EFE9' }}>
                    <div className="container mx-auto px-4 text-center">
                        <FadeIn>
                            <h2 className="mb-8 font-serif text-4xl md:text-5xl uppercase leading-tight" style={{ color: '#734838' }}>
                                ALERTE IMMOBILIÈRE PERSONNALISÉE
                            </h2>

                            <div className="max-w-4xl mx-auto space-y-6 text-lg md:text-xl leading-relaxed" style={{ color: '#734838' }}>
                                <p>
                                    Chercher une propriété peut vite devenir un casse-tête.<br />
                                    Avec mon alerte personnalisée, vous recevez automatiquement les nouvelles propriétés qui répondent à vos critères, dès qu’elles sont disponibles sur le marché.
                                </p>
                                <p>
                                    C’est simple, gratuit, et sans engagement.
                                </p>
                                <p>
                                    Remplissez le court formulaire et recevez vos alertes personnalisées par courriel.
                                </p>
                            </div>

                            <div className="mt-12">
                                <Button asChild size="lg" className="px-8 py-4 text-lg rounded-none shadow-none hover:opacity-90 transition-opacity uppercase tracking-wider" style={{ backgroundColor: '#734838', color: '#FFFFFF' }}>
                                    <Link href="https://tally.so/r/w7X1p6" target="_blank">RECEVOIR MES ALERTES</Link>
                                </Button>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>


            {/* Section 2.8 - PRÊT(E) À AVANCER? */}
            <section className="relative min-h-[800px] flex items-center justify-center py-20">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/buyers-cta-bg.jpg"
                        alt="Prêt à avancer?"
                        fill
                        className="object-cover"
                        style={{ opacity: ctaImageOpacity }}
                    />
                </div>

                {/* Content */}
                <div className="container relative z-10 mx-auto px-4 text-center">
                    <FadeIn>
                        <h2 className="mb-12 font-serif text-5xl md:text-7xl uppercase leading-tight" style={{ color: '#734838' }}>
                            PRÊT(E) À AVANCER?
                        </h2>

                        <div className="max-w-4xl mx-auto space-y-8 text-xl md:text-2xl leading-relaxed font-medium" style={{ color: '#734838' }}>
                            <p>
                                Acheter une propriété, ce n’est pas rien.<br />
                                C’est une décision importante, un chapitre de vie qui mérite d’être accompagné avec soin.
                            </p>
                            <p>
                                Si vous souhaitez avancer avec clarté, sécurité et confiance, je suis là pour vous accompagner du début à la fin avec rigueur, transparence et bienveillance.
                            </p>
                            <p>
                                Parlez-moi de votre projet et voyons ensemble comment transformer votre recherche en réussite.
                            </p>
                        </div>

                        <div className="mt-16">
                            <Button asChild size="lg" className="px-10 py-6 text-xl rounded-none shadow-none hover:opacity-90 transition-opacity uppercase tracking-wider" style={{ backgroundColor: '#734838', color: '#FFFFFF' }}>
                                <Link href="/contact">ME CONTACTER</Link>
                            </Button>
                        </div>
                    </FadeIn>
                </div>

                {/* Logo Watermark */}
                <div className="absolute bottom-8 right-8 z-10 w-24 md:w-32 opacity-80">
                    <Image
                        src="/images/sonia-rose-logo.png"
                        alt="Sonia Rose Logo"
                        width={150}
                        height={150}
                        className="object-contain"
                    />
                </div>
            </section>



        </>
    );
}
