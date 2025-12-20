import Image from 'next/image';
import { Section } from '@/components/ui/section';
import type { Metadata } from 'next';
import { Check } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Ce que les vendeurs regrettent le plus | Blog Sonia Rose',
    description: 'Une vente immobilière, c’est un mélange d’émotions, de décisions et d’intuitions. Cet article t’offre une perspective claire pour faire les bons choix dès le départ.',
};

export default function BlogPostPage() {
    return (
        <>
            {/* HERO SECTION */}
            <div className="relative flex min-h-[500px] items-center justify-center pt-20 m-4 rounded-[3rem] overflow-hidden">
                <Image
                    src="/assets/blog/article-2.png"
                    alt="Ce que les vendeurs regrettent le plus"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* CONTENT SECTION */}
            <Section className="py-20 bg-[#F4F1EE]">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h1 className="font-sans text-4xl md:text-5xl text-[#734838] font-bold mb-8 leading-tight">
                        Ce que les vendeurs <br /> regrettent le plus
                    </h1>

                    <div className="prose prose-lg max-w-none text-[#734838]">
                        <p className="font-bold italic text-xl mb-12 leading-relaxed">
                            Une vente immobilière, c’est un mélange d’émotions, de décisions et d’intuitions. Avec l’expérience, j’ai observé les erreurs les plus fréquentes qui créent des déceptions. Cet article t’offre une perspective claire pour faire les bons choix dès le départ.
                        </p>

                        <div className="space-y-6 mb-12 text-lg font-light leading-relaxed">
                            <p>Vendre sa maison, ce n'est pas juste une transaction financière. C'est une étape de vie. C'est des émotions, de l'attachement, de la fierté, parfois même de la culpabilité... et oui, des regrets.</p>
                            <p>Et ce qui revient le plus souvent — que je le voie chez mes clients, mes collègues ou dans le marché — ce sont toujours les mêmes cinq regrets. Des regrets qu'on pourrait tellement éviter quand on sait à quoi s'attendre.</p>
                            <p>Alors aujourd'hui, on va les regarder en face. Sans jugement, sans phrases trop parfaites. Juste la vérité, comme j'aime le faire : simple, humain, concret.</p>
                        </div>

                        <div className="space-y-12">
                            {/* Point 1 */}
                            <div>
                                <h3 className="font-sans text-2xl font-bold mb-4">1. Attendre trop longtemps avant de mettre en vente.</h3>
                                <div className="space-y-4 font-light text-lg">
                                    <p>Ça, c'est probablement LE regret numéro un.</p>
                                    <p>Beaucoup de vendeurs se disent :</p>
                                    <p>« Je vais attendre que ça remonte. »</p>
                                    <p>« Je vais attendre que ça se replace. »</p>
                                    <p>« Je vais attendre après les fêtes. »</p>
                                    <p>Résultat? Le marché change, la compétition augmente, les acheteurs deviennent plus exigeants... et la valeur qui était là il y a six mois n'est plus là aujourd'hui. Ce qui fait le plus mal, c'est quand les vendeurs réalisent qu'ils ont perdu des milliers de dollars juste parce qu'ils ont voulu patienter. Pas par mauvaise intention — juste parce qu'ils ne savaient pas.</p>
                                </div>
                            </div>

                            {/* Point 2 */}
                            <div>
                                <h3 className="font-sans text-2xl font-bold mb-4">2. Sous-estimer l'importance de la première impression</h3>
                                <div className="space-y-4 font-light text-lg">
                                    <p>Une maison peut être belle, bien entretenue... mais si, en ligne, les photos ne passent pas, <strong>les acheteurs ne cliqueront même pas.</strong></p>
                                    <p>Et ça, c'est un autre gros regret.</p>
                                    <p>Souvent, les vendeurs pensent :</p>
                                    <p>« Les gens vont venir voir en vrai. »</p>
                                    <p>« Ça ne dérange pas si c'est un peu brouillon sur les photos. » Erreur.</p>
                                    <p>Aujourd'hui, les acheteurs magasinent comme sur Amazon. Ils scrollent. Ils comparent. Ils décident avant même de mettre un pied dans la maison.</p>
                                    <p>Une mauvaise première impression en ligne... ça peut coûter une visite. Une visite de moins, c'est une offre de moins. Une offre de moins... c'est parfois des milliers de dollars perdus. Et ça, je le vois trop souvent.</p>
                                </div>
                            </div>

                            {/* Point 3 */}
                            <div>
                                <h3 className="font-sans text-2xl font-bold mb-4">3. Avoir mis un prix trop élevé... juste "pour essayer". Ça, c'est un classique.</h3>
                                <div className="space-y-4 font-light text-lg">
                                    <p>On se dit :</p>
                                    <p>« On peut toujours baisser après. »</p>
                                    <p>« On va voir ce que ça donne. »</p>
                                    <p>Mais quand une propriété arrive sur le marché trop haut, ce qui arrive, c'est :</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>les bons acheteurs ne la voient même pas dans leur recherche</li>
                                        <li>ceux qui la voient passent tout droit</li>
                                        <li>la maison se "brûle"</li>
                                        <li>et quand on finit par baisser, c'est déjà trop tard :<br />la perception est installée → « Pourquoi elle ne s'est pas vendue avant ? »</li>
                                    </ul>
                                    <p>Le regret, ici, c'est de réaliser qu'un prix trop élevé au début a <strong>fait perdre du momentum</strong>, et parfois même plus que ça : le prix final est souvent plus bas que si on l'avait mise juste au départ.</p>
                                </div>
                            </div>

                            {/* Point 4 */}
                            <div>
                                <h3 className="font-sans text-2xl font-bold mb-4">4. Ne pas avoir corrigé quelques petits détails avant la mise en marché.</h3>
                                <div className="space-y-4 font-light text-lg">
                                    <p>Je te jure, des fois, ce sont des choses tellement simples... et pourtant tellement importantes :</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>une poignée qui branle</li>
                                        <li>un cadrage qui manque une vis</li>
                                        <li>une pièce trop encombrée</li>
                                        <li>une peinture qui aurait coûté 30 $ à rafraîchir</li>
                                        <li>des petits défauts qu'on ne voit plus, mais que les acheteurs voient tout de suite</li>
                                    </ul>
                                    <p>Après la vente, les vendeurs me disent souvent :</p>
                                    <p>« J'aurais dû le faire. Pour 15 minutes de job, j'ai perdu une visite. » Les acheteurs fonctionnent beaucoup par ressenti. Une maison entretenue = une maison aimée = une maison qui inspire confiance. Et la confiance, ça vaut cher.</p>
                                </div>
                            </div>

                            {/* Point 5 */}
                            <div>
                                <h3 className="font-sans text-2xl font-bold mb-4">5. Avoir accepté une offre trop vite... ou avoir trop attendu</h3>
                                <div className="space-y-4 font-light text-lg">
                                    <p>Il y a deux extrêmes :</p>

                                    <p className="font-bold">■ Ceux qui prennent la première offre, par stress</p>
                                    <p>Parce qu'ils ont peur que ça ne revienne pas.</p>
                                    <p>Parce qu'ils veulent que ça finisse vite.</p>
                                    <p>Parce qu'ils paniquent devant un marché imprévisible.</p>
                                    <p>Et après, ils réalisent qu'ils auraient pu faire mieux.</p>

                                    <p className="font-bold mt-6">■ Et il y a ceux qui veulent trop attendre la « bonne offre »</p>
                                    <p>Ils refusent une offre très correcte... puis le marché ralentit. Ils se retrouvent avec moins de visites, moins d'intérêt... et finissent par accepter une offre plus basse. Le regret est le même :</p>
                                    <p>« J'aurais dû... ». Mais ça, c'est facile à dire après.</p>
                                </div>
                            </div>

                            {/* Point 6 */}
                            <div>
                                <h3 className="font-sans text-2xl font-bold mb-4">6. Ne pas avoir posé les bonnes questions en cours de route.</h3>
                                <div className="space-y-4 font-light text-lg">
                                    <p>Et ça, je le vois souvent chez les gens qui ont essayé de vendre seuls, ou qui ont travaillé avec quelqu'un qui n'était pas assez présent.</p>
                                    <p>Ils me disent :</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>« On n'a jamais su c'était quoi la bonne stratégie. »</li>
                                        <li>« On n'a pas compris pourquoi la maison n'attirait pas. »</li>
                                        <li>« On n'a pas compris le marché. »</li>
                                        <li>« On n'a pas eu les vraies réponses. »</li>
                                    </ul>
                                    <p className="mt-6">Le regret, c'est de ne pas avoir été accompagnés par quelqu'un qui dit la vérité — même quand ce n'est pas ce qu'on veut entendre.</p>
                                    <p>Quelqu'un qui explique, pas quelqu'un qui récite. Quelqu'un qui voit le marché comme il est, pas comme on aimerait qu'il soit.</p>
                                </div>
                            </div>

                            {/* Conclusion */}
                            <div className="mt-16 pt-8 border-t border-[#734838]/20">
                                <h3 className="font-sans text-2xl font-bold mb-6">En conclusion</h3>
                                <div className="space-y-4 font-light text-lg">
                                    <p>Les regrets des vendeurs tournent toujours autour des mêmes thèmes :</p>
                                    <ul className="space-y-2">
                                        <li className="flex items-center gap-2"><Check size={18} /> attendre trop</li>
                                        <li className="flex items-center gap-2"><Check size={18} /> mettre un prix trop haut</li>
                                        <li className="flex items-center gap-2"><Check size={18} /> avoir négligé la préparation</li>
                                        <li className="flex items-center gap-2"><Check size={18} /> avoir pris une décision par stress</li>
                                        <li className="flex items-center gap-2"><Check size={18} /> ne pas avoir été assez informés</li>
                                    </ul>
                                    <p className="mt-6">La bonne nouvelle ?</p>
                                    <p>Tous ces regrets-là sont <strong>évités</strong> quand on a la bonne vision dès le départ — une vision réaliste, simple, humaine, et basée sur ce qui se passe VRAIMENT dans le marché... pas sur des espoirs ou des suppositions.</p>
                                    <p>Vendre une maison, c'est une étape. Une vraie étape. Et quand elle est bien préparée, on ne la regrette pas.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
        </>
    );
}
