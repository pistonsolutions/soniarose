import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/ui/section';
import { FadeIn } from '@/components/ui/fade-in';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'À propos de Sonia Rose | Courtière immobilière Rive-Sud & Grand Montréal',
    description: 'Découvrez Sonia Rose, courtière immobilière RE/MAX sur la Rive-Sud. 20 ans d’expérience, approche humaine, stratégie, transparence et accompagnement complet.',
};

export default function AboutPage() {
    // ADJUST PORTRAIT IMAGE POSITION HERE:
    const portraitX = '50%'; // Horizontal: 0% = Left, 100% = Right
    const portraitY = '50%'; // Vertical: 0% = Top, 100% = Bottom
    const portraitZoom = 1.6; // Zoom: 1 = 100%, 1.1 = 110%, etc.

    // HERO CONFIGURATION
    const heroImageOpacity = 1.0; // Opacity of the background image (0.0 to 1.0)
    const heroZoom = 1; // Zoom level (1 = 100%)
    const heroImagePosition = '50% 80%'; // Position: '50% 50%' = center, '50% 100%' = bottom. '50% 80%' moves it up slightly.

    // BIO SECTION CONFIGURATION
    const bioImageScale = 1.2; // Adjusted for new Portrait asset (was 3.5)
    const bioImageX = 0; // Horizontal offset in pixels
    const bioImageY = 0; // Vertical offset in pixels

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'AboutPage',
                        name: 'À propos de Sonia Rose',
                        url: 'https://soniarose.ca/a-propos',
                        description:
                            'Découvrez le parcours, les valeurs et l’approche humaine de Sonia Rose, courtière immobilière sur la Rive-Sud, spécialisée en accompagnement émotionnel et stratégique des vendeurs et acheteurs.',
                        mainEntity: {
                            '@type': 'Person',
                            name: 'Sonia Rose',
                            jobTitle: 'Courtière immobilière',
                            worksFor: {
                                '@type': 'Organization',
                                name: 'RE/MAX Imagine & Privilège',
                            },
                        },
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

            {/* SECTION 1 — HERO “À PROPOS” */}
            <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-brand-beige-50">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/assets/about/hero.png"
                        alt="À Propos Background"
                        fill
                        className="object-cover"
                        priority
                        style={{ opacity: heroImageOpacity, transform: `scale(${heroZoom})`, objectPosition: heroImagePosition }}
                    />
                    {/* Light overlay to ensure text readability if needed, but keeping it minimal as per design */}
                    {/* <div className="absolute inset-0 bg-black/10" /> */}
                </div>

                <div className="container relative z-10 mx-auto px-4 text-center">
                    <FadeIn delay={0.2}>
                        <h1 className="font-sans text-7xl md:text-9xl tracking-widest uppercase text-brand-beige-300" style={{ textShadow: '3px 5px 6px rgba(0, 0, 0, 0.4)' }}>
                            À PROPOS
                        </h1>
                    </FadeIn>
                </div>
            </section>



            {/* SECTION 1.5 — À PROPOS DE SONIA ROSE */}
            <section className="py-16 bg-brand-beige">
                <div className="container mx-auto px-4 text-center">
                    <FadeIn>
                        <p className="text-lg text-brand-brown">
                            Courtière immobilière depuis plus de 20 ans, Sonia Rose accompagne vendeurs et acheteurs et investisseurs sur la Rive-Sud et dans le Grand Montréal. Connue pour sa façon juste et transparente d’aborder l’immobilier, Sonia offre un accompagnement complet et des stratégies adaptées à chacun, que ce soit pour la vente ou l’achat de propriétés, de condos et d’immeubles à revenus.
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* SECTION 2 — SONIA ROSE (portrait + bio) */}
            <section className="relative py-20 overflow-hidden bg-brand-beige-600">
                {/* Logo Top Right */}
                <div className="absolute top-8 right-8 z-10 opacity-80 w-48 md:w-64">
                    <Image
                        src="/assets/logo-sonia-rose-new.png"
                        alt="Sonia Rose Logo"
                        width={200}
                        height={100}
                        className="object-contain"
                    />
                </div>

                <div className="container mx-auto px-4">
                    <FadeIn>
                        <div className="flex flex-col lg:flex-row items-center">
                            {/* Left Column: Text */}
                            <div className="lg:w-1/2 z-10 lg:pr-12">
                                <h2 className="mb-2 font-sans text-5xl md:text-6xl text-brand-brown uppercase tracking-wide">
                                    SONIA ROSE
                                </h2>
                                <h3 className="mb-8 font-sans text-xl md:text-2xl font-bold text-brand-brown">
                                    Courtière immobilière – Rive-Sud & Grand Montréal
                                </h3>

                                <div className="space-y-6 text-lg leading-relaxed text-brand-brown">
                                    <p>
                                        Depuis plus de 20 ans, Sonia Rose accompagne vendeurs, acheteurs et investisseurs dans la réalisation de leurs projets immobiliers sur la Rive-Sud et dans le Grand Montréal.
                                    </p>
                                    <p>
                                        Forte de son expérience au sein de RE/MAX, Sonia allie une expertise pointue du marché à une stratégie claire et une compréhension fine des étapes de vie que présente chaque transaction.
                                    </p>
                                    <p>
                                        Sonia possède également une solide expertise en financement, grâce à son expérience comme courtière hypothécaire. Cette double compétence lui permet de comprendre autant les aspects humains que les enjeux financiers derrière chaque transaction.
                                    </p>
                                    <p>
                                        Reconnue pour son écoute, sa transparence et son sens aiguisé de la négociation, Sonia bâtit des relations de confiance qui vont bien au-delà de la simple transaction. Chaque mandat est traité avec rigueur et bienveillance, afin d'atteindre un seul objectif: vendre au meilleur prix, acheter en sécurité, investir intelligemment et surtout avancer avec confiance.
                                    </p>
                                    <p>
                                        Pour Sonia, chaque projet immobilier est unique.<br />
                                        Et chaque rencontre est une opportunité de guider quelqu'un vers son prochain chapitre.
                                    </p>
                                </div>

                                <div className="mt-10">
                                    <Button asChild size="lg" className="px-8 py-4 text-lg shadow-none hover:opacity-90 transition-opacity" style={{ backgroundColor: '#734838', color: '#FFFFFF' }}>
                                        <Link href="/contact">ME CONTACTER</Link>
                                    </Button>
                                </div>
                            </div>

                            {/* Right Column: Image */}
                            <div className="lg:w-1/2 relative h-[600px] md:h-[800px] w-full mt-10 lg:mt-0 flex items-end justify-center lg:justify-end">
                                <div className="relative w-full h-full">
                                    <Image
                                        src="/assets/about/portrait-main.png"
                                        alt="Sonia Rose Portrait"
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

            {/* SECTION 3 — MES VALEURS */}
            <section className="py-20 bg-brand-beige-400">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <div className="mx-auto max-w-4xl">
                            <div className="">
                                <h2 className="mb-4 font-sans text-4xl font-bold text-brand-navy">Mes valeurs</h2>
                                <h3 className="mb-6 text-xl font-medium text-brand-gold">
                                    L’immobilier, pour moi, ça n’a jamais été juste des transactions.<br />
                                    Ce sont des vies, des histoires, et des moments importants.
                                </h3>
                                <div className="space-y-6 text-lg text-brand-navy/80">
                                    <p>
                                        Depuis plus de 20 ans dans l’immobilier, j’ai compris que ce métier-là, ce n’est pas juste vendre des propriétés : c’est accompagner des personnes dans des étapes importantes. Chaque fois qu’on me confie une maison, on me confie aussi une partie de vie.
                                    </p>
                                    <p>
                                        Je travaille avec authenticité : je dis les vraies choses, et je te guide avec clarté. Ce qui compte pour moi, c’est que tu prennes une décision réfléchie, basée sur ta réalité du moment et tes objectifs futurs — pas seulement sur les chiffres.
                                    </p>
                                    <p>
                                        Je suis quelqu’un de concret et présente. Quand je m’engage dans un dossier, je m’implique à 100 % : analyse, stratégie, négociation et protections. J’utilise mes 20 ans d’expérience pour que tu avances avec confiance, que ce soit pour acheter, vendre, recommencer ou tourner une page.
                                    </p>
                                    <p className="font-bold text-brand-navy">
                                        Parce que pour moi, un client, c’est bien plus qu’un simple numéro...
                                    </p>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* SECTION 4 — MON APPROCHE */}
            <Section background="white">
                <div className="mx-auto max-w-4xl text-center">
                    <FadeIn>
                        <h2 className="mb-4 font-sans text-4xl font-bold text-brand-navy">Mon approche</h2>
                        <h3 className="mb-8 text-xl font-medium text-brand-gold">
                            Une façon de travailler qui met l’humain avant la transaction, le respect avant la pression, et ta réalité avant tout le reste.
                        </h3>
                        <div className="space-y-6 text-left text-lg text-brand-navy/80">
                            <p>
                                Mon approche est toujours la même : je prends le temps. Avant de parler chiffres, stratégies ou mise en marché, je veux comprendre où tu es rendu dans ta vie. Chaque situation est différente, et je m’adapte à toi — pas l’inverse.
                            </p>
                            <p>
                                Je ne crois pas aux approches robotisées, ni aux discours préparés. Je travaille avec mon intuition, mon expérience, et surtout avec ce que je ressens quand je t’écoute.
                            </p>
                            <p>
                                Je veux savoir ce qui est vraiment important pour toi, ce qui te stresse, ce que tu veux éviter — et ce que tu espères en silence.
                            </p>
                            <p>
                                Quand je m’engage dans un dossier, je deviens ton alliée.
                                Je te guide étape par étape avec transparence, je te mets à l’aise dans la maison, dans le processus, dans les émotions.
                            </p>
                            <p>
                                Je marche le terrain avec toi, je m’assure que tu avances avec confiance, sans jamais te sentir bousculé(e).
                                Parce que ton projet immobilier doit être un moment où tu te sens respecté(e), écouté(e), et accompagné(e).
                            </p>
                        </div>
                    </FadeIn>
                </div>
            </Section>

            {/* SECTION 5 — POURQUOI LES GENS TRAVAILLENT AVEC MOI */}
            <section className="py-20 bg-brand-charcoal">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <div className="mx-auto max-w-4xl text-center">
                            <h2 className="mb-4 font-sans text-4xl font-bold text-white">Pourquoi les gens travaillent avec moi</h2>
                            <h3 className="mb-8 text-xl font-medium text-brand-gold">
                                Parce qu’au-delà des maisons, je m’investis dans les gens, leurs histoires, leurs émotions — et leurs résultats.
                            </h3>
                            <div className="grid gap-6 text-left text-lg text-slate-300 md:grid-cols-2">
                                <div className="rounded-xl bg-white/5 p-6">
                                    <p>Depuis plus de 20 ans, les gens choisissent de travailler avec moi pour une raison simple : ils sentent qu’ils peuvent me faire confiance.</p>
                                </div>
                                <div className="rounded-xl bg-white/5 p-6">
                                    <p>Avec moi, il n’y a pas de façade, pas de masque, pas de pression. Je dis les vraies choses, toujours avec respect, et jamais en contournant la vérité.</p>
                                </div>
                                <div className="rounded-xl bg-white/5 p-6">
                                    <p>Les gens viennent vers moi parce qu’ils savent que je vais protéger leurs intérêts, comme si c’était ma propre transaction.</p>
                                </div>
                                <div className="rounded-xl bg-white/5 p-6">
                                    <p>Ils travaillent avec moi parce qu’ils sentent que je suis présente. Pas juste pour vendre une maison, mais pour accompagner une étape de vie.</p>
                                </div>
                                <div className="rounded-xl bg-white/5 p-6">
                                    <p>Parce que je prends le temps de comprendre leur histoire, leurs émotions, leurs craintes, et leurs projets.</p>
                                </div>
                                <div className="rounded-xl bg-white/5 p-6">
                                    <p>Ils choisissent ma façon de travailler, qui est simple : être honnête, humaine et stratégique. Trouver des solutions, et surtout livrer des résultats.</p>
                                </div>
                            </div>
                            <div className="mt-10">
                                <p className="text-xl font-medium text-white">
                                    Et surtout, ils travaillent avec moi parce qu’ils sentent que je suis là pour eux — vraiment.
                                </p>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>
        </>
    );
}