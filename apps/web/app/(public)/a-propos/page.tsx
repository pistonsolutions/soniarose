import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/ui/section';
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
                                url: 'https://soniarose.ca/assets/logo.png',
                            },
                        },
                    }),
                }}
            />

            {/* SECTION 1 — HERO “À PROPOS” */}
            <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-brand-cream">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/home-hero.png"
                        alt="Image décor épuré beige – Page À propos Sonia Rose courtière immobilière"
                        fill
                        className="object-cover opacity-20"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-cream/50 to-brand-cream/90" />
                </div>

                <div className="container relative z-10 mx-auto px-4 text-center">
                    <h1 className="mb-6 font-serif text-4xl font-bold md:text-5xl lg:text-6xl text-brand-navy">
                        À propos de Sonia Rose <br />
                        <span className="text-brand-gold">Courtière immobilière</span> Rive-Sud & Grand Montréal
                    </h1>
                    <h2 className="mb-8 text-xl font-medium md:text-2xl text-brand-navy">
                        20 ans d’expérience. Une approche humaine, stratégique et profondément authentique.
                    </h2>
                    <p className="mx-auto max-w-3xl text-lg md:text-xl text-brand-navy/80">
                        Courtière immobilière depuis plus de 20 ans, Sonia Rose accompagne vendeurs, acheteurs et investisseurs sur la Rive-Sud et dans le Grand Montréal. Connue pour sa transparence, son écoute et sa capacité à créer une stratégie adaptée à chaque client, Sonia offre un accompagnement complet — qu’il s’agisse de vendre une propriété, d’acheter un condo, une maison, ou d’investir dans un immeuble à revenus.
                    </p>
                </div>
            </section>

            {/* SECTION 2 — SONIA ROSE (portrait + bio) */}
            <Section background="white">
                <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                    <div className="relative h-[600px] overflow-hidden rounded-2xl bg-brand-beige">
                        <Image
                            src="/about-portrait.png"
                            alt="Portrait professionnel de Sonia Rose – courtière immobilière RE/MAX Rive-Sud"
                            fill
                            className="object-cover transition-transform duration-700"
                            style={{
                                objectPosition: `${portraitX} ${portraitY}`,
                                transform: `scale(${portraitZoom})`
                            }}
                            quality={100}
                        />
                    </div>
                    <div>
                        <h2 className="mb-6 font-serif text-4xl font-bold text-brand-navy">
                            Sonia Rose – Courtière immobilière <br />
                            <span className="text-brand-gold">Rive-Sud & Grand Montréal</span>
                        </h2>
                        <div className="space-y-6 text-lg text-brand-navy/80">
                            <p>
                                Depuis plus de 20 ans, Sonia Rose accompagne vendeurs, acheteurs et investisseurs dans la réalisation de leurs projets immobiliers sur la Rive-Sud et dans le Grand Montréal.
                            </p>
                            <p>
                                Forte de son expérience au sein de RE/MAX, Sonia allie une expertise pointue du marché à une approche humaine et une compréhension fine des étapes de vie qui précèdent chaque transaction.
                            </p>
                            <p>
                                Son solide parcours dans la vente et le financement, ainsi que sa maîtrise de la négociation, lui permettent de représenter ses clients avec stratégie, précision et transparence.
                            </p>
                            <p>
                                Sonia est reconnue pour dire les vraies choses avec douceur, pour simplifier chaque étape et pour accompagner ses clients du début à la fin, comme si chaque projet était le sien.
                            </p>
                            <p className="font-medium text-brand-navy">
                                Pour Sonia, chaque projet immobilier est unique.
                                Elle rencontre chaque personne avec respect, stratégie et humain — afin de guider chacun vers son prochain chapitre.
                            </p>
                        </div>
                        <div className="mt-8">
                            <Button asChild size="lg" variant="gold">
                                <Link href="/contact">Me contacter</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </Section>

            {/* SECTION 3 — MES VALEURS */}
            <Section background="cream">
                <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                    <div className="order-2 lg:order-1">
                        <h2 className="mb-4 font-serif text-4xl font-bold text-brand-navy">Mes valeurs</h2>
                        <h3 className="mb-6 text-xl font-medium text-brand-gold">
                            L’immobilier, pour moi, ça n’a jamais été juste des transactions. C’est des vies. Des histoires. Des moments charnières.
                        </h3>
                        <div className="space-y-6 text-lg text-brand-navy/80">
                            <p>
                                Depuis plus de 20 ans, j’ai compris que ce métier, ce n’est pas vendre des maisons — c’est accompagner des humains. À chaque fois qu’une personne m’ouvre sa porte, elle m’ouvre aussi un morceau de sa vie. Et moi, je prends ça à cœur.
                            </p>
                            <p>
                                Les gens me disent souvent que je suis authentique, que je dis les vraies choses avec douceur. Je veux que tu te sentes en sécurité, que tu comprennes chaque étape, sans pression, sans fla fla.
                            </p>
                            <p>
                                Je donne tout : mes 20 ans d’expérience, mes connaissances du marché, ma capacité à négocier, à anticiper et à protéger tes intérêts.
                            </p>
                            <p className="font-bold text-brand-navy">
                                Pour moi, un client n’est pas un numéro.
                                C’est une personne qui m’accorde sa confiance.
                                Et ça, je ne le prends jamais pour acquis.
                            </p>
                        </div>
                    </div>
                    <div className="order-1 lg:order-2 flex justify-center">

                        <div className="relative h-64 w-64 rounded-full bg-white p-8 shadow-xl flex items-center justify-center border-4 border-brand-gold/20 overflow-hidden">
                            <Image
                                src="/logo.png"
                                alt="Sonia Rose Valeurs"
                                fill
                                className="object-contain p-8"
                            />
                        </div>
                    </div>
                </div>
            </Section>

            {/* SECTION 4 — MON APPROCHE */}
            <Section background="white">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="mb-4 font-serif text-4xl font-bold text-brand-navy">Mon approche</h2>
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
                </div>
            </Section>

            {/* SECTION 5 — POURQUOI LES GENS TRAVAILLENT AVEC MOI */}
            <Section background="navy">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="mb-4 font-serif text-4xl font-bold text-white">Pourquoi les gens travaillent avec moi</h2>
                    <h3 className="mb-8 text-xl font-medium text-brand-gold">
                        Parce qu’au-delà des maisons, je m’investis dans les gens, leurs histoires, leurs émotions — et leurs résultats.
                    </h3>
                    <div className="grid gap-6 text-left text-lg text-slate-300 md:grid-cols-2">
                        <div className="rounded-xl bg-white/5 p-6">
                            <p>Depuis plus de 20 ans, les gens me choisissent parce qu’ils sentent qu’ils peuvent me faire confiance.</p>
                        </div>
                        <div className="rounded-xl bg-white/5 p-6">
                            <p>Je ne fais pas de façade, pas de masque : je dis les vraies choses, toujours avec respect.</p>
                        </div>
                        <div className="rounded-xl bg-white/5 p-6">
                            <p>Ils viennent vers moi parce qu’ils sentent que je vais défendre leurs intérêts comme si c’était ma propre transaction.</p>
                        </div>
                        <div className="rounded-xl bg-white/5 p-6">
                            <p>Ils savent que je protège leurs intérêts, que je règle les lignes, que j’anticipe les problèmes avant qu’ils n’arrivent.</p>
                        </div>
                        <div className="rounded-xl bg-white/5 p-6">
                            <p>Ils travaillent avec moi parce qu’ils savent que je suis présente : pas juste pour vendre une maison, mais pour accompagner une étape de vie.</p>
                        </div>
                        <div className="rounded-xl bg-white/5 p-6">
                            <p>Parce que je prends le temps de comprendre leur histoire, leurs craintes, leurs projets. Parce que je m’adapte à eux, pas l’inverse.</p>
                        </div>
                    </div>
                    <div className="mt-10">
                        <p className="text-xl font-medium text-white">
                            Et surtout, ils travaillent avec moi parce qu’ils sentent que je suis là pour eux — vraiment.
                        </p>
                    </div>
                </div>
            </Section>
        </>
    );
}