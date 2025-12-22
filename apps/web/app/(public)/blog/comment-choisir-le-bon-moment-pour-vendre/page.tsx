import Image from 'next/image';
import { Section } from '@/components/ui/section';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Comment choisir le bon moment pour vendre | Blog Sonia Rose',
    description: 'Avec le temps, nos besoins, nos valeurs et notre énergie changent. Cet article t’aide à reconnaître les signaux qui indiquent qu’une nouvelle étape se prépare.',
};

export default function BlogPostPage() {
    return (
        <>
            {/* HERO SECTION */}
            <div className="relative flex min-h-[500px] items-center justify-center pt-20 m-4 rounded-[3rem] overflow-hidden">
                <Image
                    src="/assets/blog/article-1.png"
                    alt="Comment choisir le bon moment pour vendre"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* CONTENT SECTION */}
            <Section className="py-20 bg-[#F4F1EE]">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h1 className="font-sans text-4xl md:text-5xl text-[#734838] font-bold mb-8 leading-tight">
                        Comment choisir le bon moment <br /> pour vendre
                    </h1>

                    <div className="prose prose-lg max-w-none text-[#734838]">
                        <p className="font-bold italic text-xl mb-12 leading-relaxed">
                            Avec le temps, nos besoins, nos valeurs et notre énergie changent. Et parfois, la maison qui nous a autrefois comblés ne nous correspond plus autant. Cet article t’aide à reconnaître les signaux qui indiquent qu’une nouvelle étape se prépare doucement.
                        </p>

                        <div className="space-y-6 mb-12 text-lg font-light leading-relaxed">
                            <p>On dirait qu'il arrive un moment, dans la vie, où on entre chez soi... et quelque chose a changé.</p>
                            <p>Ce n'est pas un meuble brisé, ce n'est pas une fissure dans un mur.</p>
                            <p>Non.</p>
                            <p>C'est beaucoup plus subtil que ça.</p>
                            <p>C'est un petit « quelque chose » que tu ressens dans le ventre.</p>
                            <p>Comme une énergie qui n'est plus pareille.</p>
                            <p>Comme si la maison ne vibrait plus au même rythme que toi.</p>
                            <p>Et ça, personne ne peut le voir à ta place.</p>
                            <p>Mais toi, tu le sais.</p>
                            <p>Choisir le bon moment pour vendre, ce n'est pas juste une décision financière.</p>
                            <p>C'est un mélange de timing, d'intuition, de lucidité... et d'émotions.</p>
                            <p>Une maison, ça n'a jamais été juste un toit.</p>
                            <p>C'est un chapitre de vie : rempli d'habitudes, de souvenirs, parfois même de choses qu'on a dû porter trop longtemps.</p>
                            <p>Alors comment savoir que c'est vraiment le moment?</p>
                            <p>Voici ce que je vois le plus souvent, dans la vraie vie, avec les vrais humains que j'accompagne, et peut-être que tu vas te reconnaitre dans un de ces points-là.</p>
                        </div>

                        <div className="space-y-12">
                            {/* Point 1 */}
                            <div>
                                <h3 className="font-sans text-2xl font-bold mb-4">1. Quand ton quotidien ne "fitte" plus avec ta maison</h3>
                                <div className="space-y-4 font-light text-lg">
                                    <p>C'est souvent le premier signe.</p>
                                    <p>Tu fais les mêmes gestes que d'habitude, mais tout te semble... lourd.</p>
                                    <p>La cuisine est trop petite.</p>
                                    <p>Le salon n'est plus pratique.</p>
                                    <p>La cour n'est plus utilisée.</p>
                                    <p>Tu réalises que tu t'adaptes constamment à la maison, au lieu que la maison s'adapte à toi. Et ça, c'est souvent la première cloche qui sonne.</p>
                                </div>
                            </div>

                            {/* Point 2 */}
                            <div>
                                <h3 className="font-sans text-2xl font-bold mb-4">2. Quand l'entretien devient un poids</h3>
                                <div className="space-y-4 font-light text-lg">
                                    <p>Tu sais, ce moment où juste regarder la cour te décourage?</p>
                                    <p>Où repeindre une pièce te semble comme monter l'Everest?</p>
                                    <p>Où tu n'as plus envie de rien améliorer?</p>
                                    <p>Ce n'est pas de la paresse. C'est un détachement. Quand l'entretien n'est plus un « plaisir », mais un fardeau, ça veut dire que l'énergie ne circule plus.</p>
                                    <p>Et quand l'énergie ne circule plus, on stagne.</p>
                                </div>
                            </div>

                            {/* Point 3 */}
                            <div>
                                <h3 className="font-sans text-2xl font-bold mb-4">3. Quand ton énergie change...mais la maison reste figée</h3>
                                <div className="space-y-4 font-light text-lg">
                                    <p>On évolue.</p>
                                    <p>On guérit.</p>
                                    <p>On traverse des épreuves.</p>
                                    <p>On change de carrière.</p>
                                    <p>On devient quelqu'un d'autre.</p>
                                    <p>Mais à la maison, elle, reste pareille. Et un jour, on se rend compte que ce qu'on ressent à l'intérieur de nous n'a plus rapport avec ce qu'on voit en ouvrant la porte d'entrée.</p>
                                    <p>Une maison peut très bien être parfaite... pour la personne que tu étais avant. Mais peut-être plus pour celle que tu es devenue aujourd'hui.</p>
                                </div>
                            </div>

                            {/* Point 4 */}
                            <div>
                                <h3 className="font-sans text-2xl font-bold mb-4">4. Quand tu commences à te projeter ailleurs</h3>
                                <div className="space-y-4 font-light text-lg">
                                    <p>C'est subtil, mais c'est puissant. Tu te surprends à regarder les maisons sur Centris, à passer dans un quartier et te dire :</p>
                                    <p>« J'aimerais tellement habiter ici... »</p>
                                    <p>Tu imagines une cuisine différente. Une pièce lumineuse. Un espace plus fonctionnel. Tu rêves d'autre chose... et ce rêve revient souvent. Quand ton cœur commence à habiter ailleurs avant même que ton corps déménage, ça dit quelque chose.</p>
                                </div>
                            </div>

                            {/* Point 5 */}
                            <div>
                                <h3 className="font-sans text-2xl font-bold mb-4">5. Quand les finances jouent en ta faveur</h3>
                                <div className="space-y-4 font-light text-lg">
                                    <p>On ne se mentira pas :</p>
                                    <p>il y a aussi un côté stratégique.</p>
                                    <p>Parfois, le marché est bon.</p>
                                    <p>Parfois, ta maison vaut plus que ce que tu pensais.</p>
                                    <p>Parfois, tu es rendu à un moment où tu peux te permettre d'avancer.</p>
                                    <p>Le bon moment, c'est aussi quand la décision s'aligne autant avec ta tête qu'avec ton portefeuille.</p>
                                </div>
                            </div>

                            {/* Point 6 */}
                            <div>
                                <h3 className="font-sans text-2xl font-bold mb-4">6. Quand tu ressens un besoin de tourner une page</h3>
                                <div className="space-y-4 font-light text-lg">
                                    <p>Ce point-là, c'est celui dont les gens ne parlent pas assez souvent.</p>
                                    <p>Il arrive un moment où on n'a plus envie de "réparer". On a envie de recommencer ailleurs. D'avoir un nouveau décor, une nouvelle énergie, une nouvelle histoire.</p>
                                    <p>Ce besoin-là, il ne s'explique pas avec des chiffres. Il se ressent. Et quand il est là, il est là.</p>
                                </div>
                            </div>

                            {/* Point 7 */}
                            <div>
                                <h3 className="font-sans text-2xl font-bold mb-4">7. Quand tu réalises que tu mérites mieux</h3>
                                <div className="space-y-4 font-light text-lg">
                                    <p>Souvent, on attend parce qu'on pense que ce n'est pas le bon moment.</p>
                                    <p>Ou qu'on dérange.</p>
                                    <p>Ou qu'on a peur.</p>
                                    <p>Ou qu'on se dit :</p>
                                    <p>« J'ai vécu ici, je vais m'arranger... »</p>
                                    <p>Mais à un moment donné, tu réalises que tu mérites un endroit qui t'élève. Pas un endroit qui te retient. Et ça, c'est un des plus beaux signes d'évolution.</p>
                                </div>
                            </div>

                            {/* Conclusion */}
                            <div className="mt-16 pt-8 border-t border-[#734838]/20">
                                <h3 className="font-sans text-2xl font-bold mb-6">En résumé</h3>
                                <div className="space-y-4 font-light text-lg">
                                    <p>On ne vend pas une maison juste parce qu'on en a envie.</p>
                                    <p>On vend parce qu'on évolue.</p>
                                    <p>Parce qu'on change.</p>
                                    <p>Parce qu'on se respecte.</p>
                                    <p>Parce qu'on veut un environnement qui nous reflète, maintenant.</p>
                                    <p>Le bon moment n'est jamais écrit noir sur blanc. Il se ressent dans les petits inconforts, dans les rêves silencieux, dans l'énergie qui circule... ou qui ne circule plus.</p>
                                    <p>Et quand tous ces signes s'alignent, c'est souvent que le prochain chapitre t'attend déjà.</p>
                                    <p>Si tu te reconnais là-dedans, même un peu, c'est que ta réflexion est peut-être déjà commencée.</p>
                                    <p className="font-medium italic mt-8">Et si un jour tu as envie d'en jaser pour vrai, sans pression, sans obligation — juste pour voir clair —</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
        </>
    );
}
