import Image from 'next/image';
import { Section } from '@/components/ui/section';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Quand ta maison ne te ressemble plus | Blog Sonia Rose',
    description: 'Parfois, sans qu’on s’en aperçoive, la maison qu’on aimait ne reflète plus qui on est devenu. Cet article explore les signes subtils — et parfois évidents — qui montrent qu’un changement s’impose.',
};

export default function BlogPostPage() {
    return (
        <>
            {/* HERO SECTION */}
            <div className="relative flex min-h-[500px] items-center justify-center pt-20 m-4 rounded-[3rem] overflow-hidden">
                <Image
                    src="/blog-card-1.jpg"
                    alt="Quand ta maison ne te ressemble plus"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* CONTENT SECTION */}
            <Section className="py-20 bg-[#F4F1EE]">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h1 className="font-sans text-4xl md:text-5xl text-[#734838] font-bold mb-8 leading-tight">
                        Quand ta maison ne te <br /> ressemble plus
                    </h1>

                    <div className="prose prose-lg max-w-none text-[#734838]">
                        <p className="font-bold italic text-xl mb-12 leading-relaxed">
                            Parfois, sans qu’on s’en aperçoive, la maison qu’on aimait ne reflète plus qui on est devenu. Cet article explore les signes subtils — et parfois évidents — qui montrent qu’un changement s’impose, non par pression, mais pour ton bien-être.
                        </p>

                        <div className="space-y-6 mb-12 text-lg font-light leading-relaxed">
                            <p>Il arrive un moment où la maison dans laquelle on vit ne suit plus notre évolution. Ce n’est pas quelque chose qu’on réalise en une journée. C’est subtil, graduel, presque invisible. Et pourtant... un matin, on se réveille, on regarde autour, et on se dit : « Je ne me reconnais plus ici. »</p>
                            <p>Ce n’est pas un échec.<br />
                                Ce n’est pas un caprice.<br />
                                Ce n’est pas une impulsion.</p>
                            <p>C’est simplement la vie qui avance.</p>
                            <p>On change. Notre rythme change. Notre énergie change. Notre style de vie évolue. Et ce qu’on avait choisi il y a 5, 10 ou 20 ans n’est plus nécessairement ce qui nous convient aujourd’hui.</p>
                            <p>Dans cet article, je t’explique comment reconnaître ces signes — les vrais — ceux que je vois depuis 20 ans dans les yeux de mes clients. Pas pour te pousser à vendre. Je déteste ce type de pression.<br />
                                Mais pour t’aider à comprendre ce que ta maison essaie de te dire, et ce que toi, tu ressens vraiment.</p>
                        </div>

                        <div className="space-y-12">
                            {/* Point 1 */}
                            <div>
                                <h3 className="font-sans text-2xl font-bold mb-4">1. Tu ne te sens plus “chez toi”, même si tout est correct en apparence</h3>
                                <div className="space-y-4 font-light text-lg">
                                    <p>C’est un des signes les plus fréquents. Tout a l’air correct :<br />
                                        les murs sont beaux, les pièces sont fonctionnelles, rien n’est brisé... mais <strong>l’énergie n’est plus la même.</strong></p>
                                    <p>Tu rentres et tu sens un petit décalage. Rien de dramatique. Rien de concret. Juste... un « ça ne fitte plus ». Si tu dois constamment “t’habituer” à ta propre maison, c’est souvent que tu n’y es plus aligné.</p>
                                </div>
                            </div>

                            {/* Point 2 */}
                            <div>
                                <h3 className="font-sans text-2xl font-bold mb-4">2. Ton style de vie a changé, mais ta maison est restée dans le passé</h3>
                                <div className="space-y-4 font-light text-lg">
                                    <p>Ce que tu aimais avant ne correspond plus à ta réalité :</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>les pièces ne sont plus optimales</li>
                                        <li>les espaces ne conviennent plus</li>
                                        <li>ce qui était important ne l’est plus autant</li>
                                    </ul>
                                    <p className="mt-4">Par exemple :</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>tu cuisinais beaucoup avant -&gt; maintenant, tu commandes souvent</li>
                                        <li>tu recevais du monde -&gt; tu préfères la tranquillité</li>
                                        <li>tu aimais bricoler -&gt; tu veux quelque chose de simple et facile</li>
                                    </ul>
                                    <p className="mt-6">Bref, la maison correspond à l’ancienne version de toi. Et c’est correct. Ça arrive à tout le monde.</p>
                                </div>
                            </div>

                            {/* Point 3 */}
                            <div>
                                <h3 className="font-sans text-2xl font-bold mb-4">3. Tu ressens un poids plutôt qu’un confort</h3>
                                <div className="space-y-4 font-light text-lg">
                                    <p>Une maison, ça doit t’apporter du repos, de la paix, un sentiment de sécurité. Quand au contraire :</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>tu rentres</li>
                                        <li>tu regardes autour</li>
                                        <li>et tu sens une tension, une lourdeur...</li>
                                    </ul>
                                    <p className="mt-6">C’est un message. Souvent, ce poids vient du fait que ta maison ne soutient plus ton style de vie actuel. Elle te demande trop d’énergie : gestion, entretien, réparations, rangement, etc. Parfois, juste le fait d’y penser... t’épuise.</p>
                                </div>
                            </div>

                            {/* Point 4 */}
                            <div>
                                <h3 className="font-sans text-2xl font-bold mb-4">4. Tu évites certaines pièces (ou tu restes toujours dans les mêmes)</h3>
                                <div className="space-y-4 font-light text-lg">
                                    <p>Ça, c’est un signe fort. Quand on n’est plus aligné avec sa maison :</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>on ferme une pièce sans raison</li>
                                        <li>on ne va plus dans le sous-sol</li>
                                        <li>on ne relaxe plus dans le salon</li>
                                        <li>on vit seulement dans la cuisine ou la chambre</li>
                                    </ul>
                                    <p className="mt-6">C’est comme si ton corps disait :<br />
                                        “Ce bout-là ne me parle plus.” Ce n’est pas conscient, mais c’est révélateur.</p>
                                </div>
                            </div>

                            {/* Point 5 */}
                            <div>
                                <h3 className="font-sans text-2xl font-bold mb-4">5. Tu rêves d’autre chose — souvent, et toujours pour les mêmes raisons</h3>
                                <div className="space-y-4 font-light text-lg">
                                    <p>Quand ce que tu désires revient en boucle :<br />
                                        un condo plus simple, un terrain plus petit, plus grand, plus lumineux, plus intime, plus pratique... Ce n’est pas un fantasme. C’est une réalité intérieure qui cherche à sortir.</p>
                                    <p>Les gens me disent souvent :<br />
                                        « J’ai l’impression d’être ailleurs. »</p>
                                    <p>Ou encore :<br />
                                        « Je me vois dans quelque chose de différent. »</p>
                                    <p>Quand ton esprit est constamment dans une autre maison...<br />
                                        c’est un signe clair que tu es prête à tourner une page.</p>
                                </div>
                            </div>

                            {/* Point 6 */}
                            <div>
                                <h3 className="font-sans text-2xl font-bold mb-4">6. Ton quotidien devient compliqué, alors qu’il devrait être simple</h3>
                                <div className="space-y-4 font-light text-lg">
                                    <p>Une maison doit t’aider, pas te nuire.</p>
                                    <p>Quand elle t’en demande trop :<br />
                                        plus d’entretien, plus de temps, plus de gestion, plus de stress... C’est que la balance n’est plus bonne.</p>
                                    <p>Exemples réels que j’entends tout le temps :</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>« C’est trop grand pour moi maintenant. »</li>
                                        <li>« J’ai l’impression de passer mes week-ends à entretenir. »</li>
                                        <li>« Je n’ai plus le goût de m’en occuper. »</li>
                                        <li>« Je passe plus de temps à gérer qu’à profiter. »</li>
                                    </ul>
                                    <p className="mt-6">Ça, ce sont des signaux qu’il faut écouter.</p>
                                </div>
                            </div>

                            {/* Point 7 */}
                            <div>
                                <h3 className="font-sans text-2xl font-bold mb-4">7. Tu changes intérieurement, et ton environnement ne suit plus</h3>
                                <div className="space-y-4 font-light text-lg">
                                    <p>C’est le plus important.</p>
                                    <p>Parfois, on évolue personnellement :<br />
                                        on devient plus zen, plus simple, plus fort, plus clair... et la maison ne reflète plus cette nouvelle version de nous.</p>
                                    <p>C’est là que le malaise apparaît. Ce n’est pas un manque de gratitude. Ce n’est pas un problème. C’est humain. Quand tu changes, tu te réalignes. Et ton environnement doit suivre ce réalignement.</p>
                                    <p className="mt-8 font-bold text-xl">Alors... qu’est-ce qu’on fait avec ça?</p>
                                    <p>La bonne réponse, ce n’est pas automatiquement : “Vends ta maison.” Non.</p>
                                    <p>La vraie question, c’est :<br />
                                        <strong>“Qu’est-ce que TU veux maintenant?”</strong></p>
                                    <p>Pas ce que tu voulais avant.<br />
                                        Pas ce que les autres pensent.<br />
                                        Pas ce qui était logique il y a 10 ans.</p>
                                    <p>Mais ce qui est vrai aujourd’hui.</p>
                                    <p>Et si tu sens que :</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>tu tournes en rond</li>
                                        <li>tu t’oublies</li>
                                        <li>tu ne te reconnais plus</li>
                                        <li>tu es prête à un changement</li>
                                    </ul>
                                    <p className="mt-6">Alors oui — peut-être que ta maison ne te ressemble plus.<br />
                                        Et c’est correct.</p>
                                    <p>Changer, ce n’est pas perdre. C’est avancer.</p>
                                    <p className="mt-6"><strong>Comme courtière, mon rôle n’est pas de te pousser.</strong></p>
                                    <p>C’est de te guider avec :</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>clarté</li>
                                        <li>transparence</li>
                                        <li>humanité</li>
                                        <li>zéro pression</li>
                                    </ul>
                                    <p className="mt-6">Pour que tu prennes une décision qui respecte ta vie, ton rythme, ton bien-être. Parce que vendre une maison, ce n’est jamais juste une transaction. C’est une transition.<br />
                                        Et ça doit se faire pour les bonnes raisons.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
        </>
    );
}
