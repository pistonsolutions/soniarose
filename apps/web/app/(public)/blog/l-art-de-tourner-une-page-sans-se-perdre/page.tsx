import Image from 'next/image';
import { Section } from '@/components/ui/section';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'L’art de tourner une page sans se perdre | Blog Sonia Rose',
    description: 'Tourner une page, ce n’est jamais simple. C’est laisser aller ce qui ne nous ressemble plus, reconnaître ce qui doit changer, et avancer vers un nouveau chapitre.',
};

export default function BlogPostPage() {
    return (
        <>
            {/* HERO SECTION */}
            <div className="relative flex min-h-[500px] items-center justify-center pt-20 m-4 rounded-[3rem] overflow-hidden">
                <Image
                    src="/blog-card-3.jpg"
                    alt="L’art de tourner une page sans se perdre"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* CONTENT SECTION */}
            <Section className="py-20 bg-[#F4F1EE]">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h1 className="font-sans text-4xl md:text-5xl text-[#734838] font-bold mb-8 leading-tight">
                        L’art de tourner une page <br /> sans se perdre
                    </h1>

                    <div className="prose prose-lg max-w-none text-[#734838]">
                        <p className="font-bold italic text-xl mb-12 leading-relaxed">
                            Tourner une page, ce n’est jamais simple. C’est laisser aller ce qui ne nous ressemble plus, reconnaître ce qui doit changer, et avancer vers un nouveau chapitre. Cet article t’aide à comprendre ce moment fragile où l’on peut se perdre... ou enfin se retrouver.
                        </p>

                        <div className="space-y-6 mb-12 text-lg font-light leading-relaxed">
                            <p>On ne se l’avouera pas toujours, mais il arrive un moment où ça ne "fit" plus. Ça peut être dans une relation, dans un travail, ou encore... dans une maison. Et même si on le sait intérieurement, on repousse. On attend "le bon moment". On espère que ça va revenir comme avant. Mais plus on reste, plus on se perd un peu.</p>
                            <p>Tourner une page, ce n’est pas abandonner. Ce n’est pas fuir. C’est juste reconnaître que quelque chose a changé — en toi, dans ta vie, dans ton quotidien — et que continuer comme avant ne fonctionne plus. Et ça, ce n’est pas évident à accepter.</p>
                        </div>

                        <div className="space-y-12">
                            {/* Point 1 */}
                            <div>
                                <h3 className="font-sans text-2xl font-bold mb-4">1. Pourquoi c’est si difficile de tourner une page ?</h3>
                                <div className="space-y-4 font-light text-lg">
                                    <p>Parce qu’on s’attache.</p>
                                    <p>Parce qu’on a investi du temps, de l’argent, de l’énergie, des souvenirs.</p>
                                    <p>On veut croire qu’avec un peu plus d’efforts, tout pourrait redevenir simple.</p>
                                    <p>Mais dans la vraie vie, ce qui bloque le plus, ce n’est pas ce qu’on laisse derrière.</p>
                                    <p>C’est la peur de :</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>se tromper</li>
                                        <li>regretter</li>
                                        <li>faire un choix trop vite</li>
                                        <li>perdre un confort connu</li>
                                        <li>ou simplement changer d’environnement</li>
                                    </ul>
                                    <p className="mt-6">C’est humain. Ce que les gens me disent le plus souvent en immobilier, c’est :</p>
                                    <p>« <strong>Je savais que je devais changer, mais je me suis accrochée trop longtemps.</strong> » Pas parce qu’ils ne voulaient pas avancer. Parce qu’ils ne savaient juste pas comment commencer.</p>
                                </div>
                            </div>

                            {/* Point 2 */}
                            <div>
                                <h3 className="font-sans text-2xl font-bold mb-4">2. Les signaux qui montrent que tu es prête à passer à autre chose</h3>
                                <div className="space-y-4 font-light text-lg">
                                    <p>Tourner une page, ça ne se fait pas du jour au lendemain. Ça commence par des petits signes, presque invisibles au début.</p>
                                    <p>Voici ceux que j’entends le plus souvent :</p>

                                    <div className="space-y-4 mt-6">
                                        <p><strong>• Tu te sens étouffée dans ton espace</strong><br />
                                            La maison qui te convenait avant te paraît rendue trop grande, trop petite ou trop lourde à gérer.</p>

                                        <p><strong>• Tu fais des compromis qui ne t’alignent plus</strong><br />
                                            Tu t’ajustes constamment... mais ça ne t’apporte plus rien.</p>

                                        <p><strong>• Le sentiment de “chez soi” n’est plus là</strong><br />
                                            Tu vis dans une maison... mais tu n’y vibres plus. Tu fonctionnes, mais tu ne t’y sens plus vraiment.</p>

                                        <p><strong>• Tes besoins ont changé</strong><br />
                                            Une séparation, un nouveau départ, les enfants partis, un nouveau rythme de vie... Ce qui marchait avant ne correspond plus à ta réalité.</p>

                                        <p><strong>• Le futur t’attire plus que ton présent</strong><br />
                                            Tu te surprends à imaginer une autre maison, un autre quartier, un autre style de vie.</p>
                                    </div>

                                    <p className="mt-6">Quand ces signes-là se répètent, c’est rarement une phase. C’est un message.</p>
                                </div>
                            </div>

                            {/* Point 3 */}
                            <div>
                                <h3 className="font-sans text-2xl font-bold mb-4">3. Dans la maison comme dans la vie : rester trop longtemps peut coûter cher.</h3>
                                <div className="space-y-4 font-light text-lg">
                                    <p>Et je ne parle pas juste d’argent.</p>
                                    <p>Oui, financièrement, attendre trop longtemps peut faire perdre :</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>de la valeur</li>
                                        <li>des opportunités</li>
                                        <li>des acheteurs motivés</li>
                                        <li>du momentum dans le marché</li>
                                    </ul>
                                    <p className="mt-6">Mais émotionnellement aussi, il y a un prix à payer. Quand une maison ou une situation ne te ressemble plus, ça se ressent :</p>
                                    <p>tu traînes de la fatigue, de l’irritation, un sentiment de lourdeur... et ça finit par déborder sur le reste de ta vie. Tourner la page au bon moment, ce n’est pas juste stratégique. C’est sain.</p>
                                </div>
                            </div>

                            {/* Point 4 */}
                            <div>
                                <h3 className="font-sans text-2xl font-bold mb-4">4. Tourner une page, ce n’est pas se détacher de tout : c’est choisir mieux</h3>
                                <div className="space-y-4 font-light text-lg">
                                    <p>Les gens pensent souvent qu’en changeant de maison, ils “perdent” leur histoire. C’est faux. Tu ne perds pas ton passé. Tu choisis ton prochain chapitre.</p>
                                    <p>Chaque maison marque une période de ta vie :</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>la maison où tu as élevé tes enfants</li>
                                        <li>celle où tu t’es reconstruite</li>
                                        <li>celle où tu as vécu une grande phase de travail</li>
                                        <li>celle où tu t’es retrouvée</li>
                                    </ul>
                                    <p className="mt-6">Changer de maison, ce n’est pas renier ces moments-là. C’est juste accepter qu’un cycle est terminé... et qu’un autre commence.</p>
                                </div>
                            </div>

                            {/* Point 5 */}
                            <div>
                                <h3 className="font-sans text-2xl font-bold mb-4">5. Comment savoir que c’est le bon moment d’avancer ?</h3>
                                <div className="space-y-4 font-light text-lg">
                                    <p>Voici ce que j’explique souvent à mes clients :</p>
                                    <p><strong>Si rester t’épuise plus que partir, c’est un signe clair.</strong> Oui, ça peut paraître simple, mais c’est vrai. On ne tourne pas une page quand tout est parfait. On la tourne quand on sait que rester bloque l’évolution.</p>
                                    <p>Pose-toi ces questions :</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>Est-ce que ma maison correspond encore à mes besoins ?</li>
                                        <li>Est-ce qu’elle soutient le style de vie que je veux maintenant ?</li>
                                        <li>Est-ce qu’elle m’aide... ou est-ce qu’elle m’alourdit ?</li>
                                        <li>Est-ce que je peux me projeter ici pour les prochaines années ?</li>
                                    </ul>
                                    <p className="mt-6">Si la réponse hésite... tu connais la suite.</p>
                                </div>
                            </div>

                            {/* Point 6 */}
                            <div>
                                <h3 className="font-sans text-2xl font-bold mb-4">6. Se retrouver au lieu de se perdre.</h3>
                                <div className="space-y-4 font-light text-lg">
                                    <p>Tourner une page peut te donner l’impression de perdre tes repères. Mais souvent, c’est là que tu te retrouves vraiment.</p>
                                    <p>Parce que tu recrées un espace qui te ressemble aujourd’hui, pas hier. Parce que tu reprends le contrôle. Parce que tu fais un choix pour toi.</p>
                                    <p>Avancer, c’est refaire de la place :</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>pour ta paix</li>
                                        <li>pour tes projets</li>
                                        <li>pour ton énergie</li>
                                        <li>pour la personne que tu deviens</li>
                                    </ul>
                                    <p className="mt-6">C’est là, exactement là, que tu te retrouves.</p>
                                </div>
                            </div>

                            {/* Conclusion */}
                            <div className="mt-16 pt-8 border-t border-[#734838]/20">
                                <h3 className="font-sans text-2xl font-bold mb-6">Conclusion : tourner la page, c’est se réaligner.</h3>
                                <div className="space-y-4 font-light text-lg">
                                    <p>Ce n’est pas être impulsive. Ce n’est pas “faire un move” sans réfléchir. C’est reconnaître ce qui change en toi... et choisir un environnement qui suit cette évolution. Tourner une page sans se perdre, c’est simplement ça :</p>
                                    <p><strong>faire un choix qui te ramène à toi-même.</strong></p>
                                    <p className="mt-6">Et moi, comme courtière, je suis là pour t’aider dans ce passage-là :</p>
                                    <p>clair, structuré, sans pression, et toujours adapté à la personne que tu es maintenant.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
        </>
    );
}
