import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/ui/section';
import { FadeIn } from '@/components/ui/fade-in';
import { FileText, Calculator, HelpCircle, BookOpen, Facebook, Instagram } from 'lucide-react';
import type { Metadata } from 'next';
import { ResourcesBlogCarousel } from '@/components/resources-blog-carousel';
import { MortgageCalculator } from '@/components/mortgage-calculator';

// Configuration for image opacities
const heroImageOpacity = 0.6;
const reportImageOpacity = 1.0;
const calculatorImageOpacity = 1.0;
const interiorImageOpacity = 1.0;
const faqLaptopImageOpacity = 0.5;
const guideBgImageOpacity = 0.6;
const guideSoniaImageOpacity = 1.0;
// Configuration for Sonia image positioning in Guide section
const guideSoniaScale = 1.5; // Scale the image (1 = 100%, 1.1 = 110%, etc.)
const guideSoniaX = -400; // Horizontal offset in pixels
const guideSoniaY = 500; // Vertical offset in pixels

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
                                url: 'https://soniarose.ca/assets/logo-sonia-rose-new.png',
                            },
                        },
                    }),
                }}
            />

            {/* HERO SECTION */}
            <section className="relative flex h-[60vh] min-h-[500px] items-center justify-center overflow-hidden">
                <Image
                    src="/resources-hero-bg-v2.jpg"
                    alt="Ressources immobilières Sonia Rose"
                    fill
                    className="object-cover"
                    priority
                    style={{ opacity: heroImageOpacity }}
                />
                <div className="container relative z-10 mx-auto px-4 text-center">
                    <FadeIn delay={0.2}>
                        <h1 className="mb-6 font-sans text-6xl text-brand-brown md:text-8xl lg:text-9xl tracking-widest uppercase" style={{ textShadow: '3px 5px 6px rgba(0, 0, 0, 0.4)' }}>
                            RESSOURCES
                        </h1>
                        <h2 className="mb-8 text-xl font-medium text-brand-brown md:text-2xl font-sans max-w-2xl mx-auto">
                            Des outils simples, humains et pratiques pour vous accompagner dans votre projet immobilier
                        </h2>
                    </FadeIn>
                </div>
            </section>

            {/* SECTION 2 — GUIDES ET OUTILS */}
            <Section background="white">
                <FadeIn>
                    <div className="text-center mb-12">
                        <h2 className="font-sans text-3xl md:text-5xl text-brand-brown uppercase leading-tight">
                            RESSOURCES ET OUTILS IMMOBILIERS PRATIQUES <br /> POUR VOUS GUIDER
                        </h2>
                        <p className="mt-6 text-lg text-brand-brown max-w-4xl mx-auto font-medium">
                            Je vous ai créé des formulaires et des guides immobiliers clairs et structurés pour vous aider à préparer votre achat ou votre vente. Mes outils sont simples, humains et pratiques, et vous permettent d’avancer étape par étape, que vous soyez acheteur ou vendeur.
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {/* Guide Acheteur */}
                        <Link href="https://drive.google.com/file/d/1Pr6QYcisk7Rvrb4T6D1l9Iq3sNqPCyry/view" target="_blank" className="group block relative aspect-[3/4] overflow-hidden shadow-lg transition-transform hover:-translate-y-2">
                            <Image
                                src="/resources-card-buyer.jpg"
                                alt="Guide de l'Acheteur"
                                fill
                                className="object-cover"
                            />
                        </Link>

                        {/* Guide Vendeur */}
                        <Link href="https://drive.google.com/file/d/1qEjWFoXa9zZv-LwFF5B83kG4UgjF8GES/view?usp=sharing" target="_blank" className="group block relative aspect-[3/4] overflow-hidden shadow-lg transition-transform hover:-translate-y-2">
                            <Image
                                src="/resources-card-seller.jpg"
                                alt="Guide du Vendeur"
                                fill
                                className="object-cover"
                            />
                        </Link>

                        {/* Test Alignement */}
                        <Link href="https://tally.so/r/mZK1pz" target="_blank" className="group block relative aspect-[3/4] overflow-hidden shadow-lg transition-transform hover:-translate-y-2">
                            <Image
                                src="/resources-card-quiz.jpg"
                                alt="Est-ce que ta maison est encore alignée avec toi?"
                                fill
                                className="object-cover"
                            />
                        </Link>

                        {/* Alerte Immobilière */}
                        <Link href="https://tally.so/r/A7PEko" target="_blank" className="group block relative aspect-[3/4] overflow-hidden shadow-lg transition-transform hover:-translate-y-2">
                            <Image
                                src="/resources-card-alert.jpg"
                                alt="Alerte Immobilière Personnalisée"
                                fill
                                className="object-cover"
                            />
                        </Link>
                    </div>
                </FadeIn>
            </Section>

            {/* SECTION 3 — RAPPORT PERSONNALISÉ */}
            <Section background="white">
                <FadeIn>
                    <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                        {/* Left Column: Image */}
                        <div className="flex justify-center lg:justify-end">
                            <div className="relative w-full max-w-md shadow-lg">
                                <Image
                                    src="/sellers-report-quiz.png"
                                    alt="Rapport Personnalisé"
                                    width={500}
                                    height={600}
                                    className="object-contain"
                                    style={{ opacity: reportImageOpacity }}
                                />
                            </div>
                        </div>

                        {/* Right Column: Content */}
                        <div className="text-center lg:text-left">
                            <h2 className="mb-4 font-sans text-3xl md:text-5xl uppercase leading-tight text-brand-brown">
                                OBTIENS TON RAPPORT <br /> PERSONNALISÉE
                            </h2>
                            <h3 className="mb-6 font-sans text-xl md:text-2xl font-bold text-brand-brown">
                                Découvre les vérités cachées qui influencent vraiment la valeur de ta propriété
                            </h3>
                            <div className="space-y-4 text-lg leading-relaxed text-brand-brown">
                                <p>
                                    Réponds à ce mini-test et je t’envoie ton rapport personnalisé, basé sur ton secteur, ton type de propriété et la réalité actuelle du marché.
                                </p>
                                <p>Tu vas découvrir :</p>
                                <ul className="space-y-1">
                                    <li>• ce que tu pourrais laisser sur la table sans le savoir</li>
                                    <li>• ce que tu pourrais réellement aller chercher</li>
                                    <li>• et les vérités cachées que la majorité des vendeurs ignorent.</li>
                                </ul>
                                <p className="pt-4">Ton rapport est 100% confidentiel, sans pression.</p>
                            </div>

                            <div className="mt-10">
                                <Button asChild size="lg" className="px-10 py-6 text-xl shadow-none hover:opacity-90 transition-opacity uppercase tracking-wider bg-brand-brown text-white">
                                    <Link href="https://tally.so/r/QKKpvG" target="_blank">RECEVOIR MON RAPPORT</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </Section>

            {/* SECTION 4 — OUTILS IMMOBILIER PRATIQUES */}
            <section className="py-20 bg-brand-beige-500">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <h2 className="mb-16 text-center font-sans text-3xl md:text-5xl uppercase tracking-wide text-brand-brown">
                            OUTILS IMMOBILIER <br /> PRATIQUES
                        </h2>

                        <div className="grid gap-8 lg:grid-cols-3 lg:items-center">
                            {/* Left Column: Calculator Component */}
                            <div className="flex flex-col items-center w-full">
                                <MortgageCalculator />
                            </div>

                            {/* Center Column: Text */}
                            <div className="text-center">
                                <p className="font-sans text-3xl md:text-4xl leading-snug text-brand-brown">
                                    Estimez <br />
                                    rapidement vos <br />
                                    paiements <br />
                                    selon le prix <br />
                                    d’achat, votre mise <br />
                                    de fonds <br />
                                    et votre taux <br />
                                    d’intérêt.
                                </p>
                            </div>

                            {/* Right Column: Interior Image */}
                            <div className="flex justify-center lg:justify-end">
                                <div className="relative w-full max-w-md aspect-[3/4] overflow-hidden">
                                    <Image
                                        src="/resources-tools-interior.jpg"
                                        alt="Intérieur design"
                                        fill
                                        className="object-cover"
                                        style={{ opacity: interiorImageOpacity }}
                                    />
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* SECTION 5 — FAQ */}
            <section className="py-20 bg-brand-beige-400">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <div className="text-center mb-16">
                            <h2 className="font-sans text-3xl md:text-5xl uppercase tracking-wide text-brand-brown">
                                FAQ – ACHAT ET VENTE IMMOBILIÈRE
                            </h2>
                            <p className="mt-4 text-lg text-brand-brown font-medium">
                                Des réponses simples, claires et stratégiques pour t’aider à prendre les meilleures décisions.
                            </p>
                        </div>

                        <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3 text-brand-brown">
                            {/* Column 1 */}
                            <div className="space-y-10">
                                <div>
                                    <h3 className="font-bold text-lg mb-3">
                                        Quels sont les frais réels à prévoir quand on vend une propriété?
                                    </h3>
                                    <p className="leading-relaxed">
                                        Les frais courants : notaire, ajustements de taxes, certificat de localisation (si à refaire) et petites réparations. Je t’explique tout pour éviter les surprises.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-3">
                                        Comment évaluer si une propriété est affichée au juste prix?
                                    </h3>
                                    <p className="leading-relaxed">
                                        On analyse les comparables, l’état de la maison, ton secteur et le marché actuel. Une évaluation réaliste = plus d’acheteurs.
                                    </p>
                                </div>
                            </div>

                            {/* Column 2 */}
                            <div className="space-y-10">
                                <div>
                                    <h3 className="font-bold text-lg mb-3">
                                        Est-ce que les rénovations peuvent vraiment augmenter la valeur de votre propriété?
                                    </h3>
                                    <p className="leading-relaxed">
                                        Oui, surtout cuisine, salle de bain, peinture et planchers. Je te dis quoi faire... et quoi ne pas faire pour ne pas perdre d’argent.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-3">
                                        Quelles erreurs courantes peuvent faire perdre de la valeur à une maison?
                                    </h3>
                                    <p className="leading-relaxed">
                                        Surévaluer, négliger les réparations, mauvaises photos, déco trop chargée ou une mise en marché faible. J’évite tout ça pour toi.
                                    </p>
                                </div>
                            </div>

                            {/* Column 3 */}
                            <div className="space-y-10">
                                <div>
                                    <h3 className="font-bold text-lg mb-3">
                                        Quels petits détails peuvent vraiment augmenter la valeur de votre propriété?
                                    </h3>
                                    <p className="leading-relaxed">
                                        Désencombrer, nettoyer, éclairage, petites retouches et mise en scène pour les photos. Les détails créent le coup de cœur.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-3">
                                        Comment savoir si c’est le bon moment pour acheter ou vendre?
                                    </h3>
                                    <p className="leading-relaxed">
                                        Ça dépend de ta situation : budget, taux, besoins, échéancier, le marché. On regarde ensemble ce qui est le mieux pour toi maintenant — sans pression.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>

                {/* Bottom Image - Full Width */}
                <div className="mt-16 relative h-[300px] md:h-[500px] w-full overflow-hidden">
                    <Image
                        src="/resources-faq-laptop.jpg"
                        alt="Espace de travail immobilier"
                        fill
                        className="object-cover"
                        style={{ opacity: faqLaptopImageOpacity }}
                    />
                </div>
            </section>

            {/* SECTION 6 — BLOG CAROUSEL */}
            <section className="py-20 bg-brand-beige-200">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <div className="text-center mb-16">
                            <h2 className="font-sans text-3xl md:text-5xl uppercase tracking-wide text-brand-brown">
                                BLOG IMMOBILIER <br /> CONSEILS & ÉMOTIONS
                            </h2>
                            <p className="mt-4 text-lg text-brand-brown font-medium">
                                Des articles humains, et inspirant pour guider vos décisions immobilières
                            </p>
                        </div>

                        <ResourcesBlogCarousel />
                    </FadeIn>
                </div>
            </section>

            {/* SECTION 7 — GUIDE EXCLUSIF */}
            <section className="min-h-[600px] flex flex-col md:flex-row">
                {/* Left Column - Image Composition */}
                <div className="relative w-full md:w-1/2 min-h-[400px] md:min-h-auto overflow-hidden">
                    {/* Background Image */}
                    <Image
                        src="/resources-guide-bg.jpg"
                        alt="Intérieur design minimaliste"
                        fill
                        className="object-cover"
                        style={{ opacity: guideBgImageOpacity }}
                    />

                    {/* Sonia Overlay */}
                    <div
                        className="absolute bottom-0 left-0 w-full h-full z-10 pointer-events-none"
                        style={{
                            transform: `translate(${guideSoniaX}px, ${guideSoniaY}px) scale(${guideSoniaScale})`,
                            transformOrigin: 'bottom left'
                        }}
                    >
                        <Image
                            src="/resources-guide-sonia.png"
                            alt="Sonia Rose"
                            fill
                            className="object-contain object-bottom left-0"
                            style={{ opacity: guideSoniaImageOpacity }}
                        />
                    </div>


                    {/* Contact Info Overlay */}
                    <div className="absolute bottom-8 right-8 z-20 text-right flex flex-col items-end">
                        <div className="relative w-64 h-32 mb-2">
                            <Image
                                src="/assets/logo-sonia-rose-new.png"
                                alt="Sonia Rose Logo"
                                fill
                                className="object-contain object-right"
                            />
                        </div>
                        <div className="text-brand-brown text-sm font-medium space-y-1 mb-3">
                            <p>514 250-9297</p>
                            <p>sonia.rose@remax-quebec.com</p>
                        </div>
                        <div className="flex gap-3">
                            <a href="https://www.facebook.com/SoniaRoseImmobilier/" target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white p-1.5 rounded-full hover:opacity-90 transition-opacity">
                                <Facebook size={16} fill="white" />
                            </a>
                            <a href="https://www.instagram.com/soniarose.remax" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 text-white p-1.5 rounded-full hover:opacity-90 transition-opacity">
                                <Instagram size={16} />
                            </a>
                            <a href="https://www.tiktok.com/@soniarose.remax" target="_blank" rel="noopener noreferrer" className="bg-black text-white p-1.5 rounded-full hover:opacity-90 transition-opacity">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="white"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Right Column - Content & Form */}
                <div className="w-full md:w-1/2 flex flex-col justify-center px-8 py-16 md:px-20 lg:px-24 bg-brand-beige-400">
                    <FadeIn>
                        <div className="max-w-md mx-auto md:mx-0 text-center md:text-left">
                            <h2 className="font-sans text-3xl md:text-4xl uppercase tracking-wide text-brand-brown mb-8 border-b border-brand-brown/20 pb-8">
                                REÇOIS TON GUIDE <br /> EXCLUSIF
                            </h2>

                            <h3 className="font-sans text-xl text-brand-brown font-bold mb-6">
                                “Les 7 signes que ta maison n’est plus alignée avec toi”
                            </h3>

                            <p className="text-brand-brown mb-10 leading-relaxed">
                                Laisse-moi ton nom complet et ton courriel — je t’envoie ton guide dès maintenant.
                                <br /><br />
                                Un contenu clair, structuré et humain pour t’aider à mieux comprendre où tu en es dans ta relation avec ta maison.
                            </p>

                            <div className="mt-8">
                                <Button asChild size="lg" className="w-full rounded-none uppercase tracking-wider text-white py-6 text-sm hover:opacity-90 transition-opacity bg-brand-brown">
                                    <Link href="https://drive.google.com/file/d/1kzazVf9vYNgjpKB1CX10LFan71pQ34C/view?usp=sharing" target="_blank">
                                        RECEVOIR MON GUIDE
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </FadeIn >
                </div >
            </section >
        </>
    );
}
