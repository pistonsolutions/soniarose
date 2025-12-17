import Image from 'next/image';
import { Section } from '@/components/ui/section';
import type { Metadata } from 'next';
import { Check } from 'lucide-react';

export const metadata: Metadata = {
    title: '80 % du succès se joue dans les 7 premiers jours | Blog Sonia Rose',
    description: 'Les premières impressions comptent énormément en immobilier. Cet article t’explique pourquoi les premiers jours sur le marché déterminent l’intérêt des acheteurs, le nombre de visites et même le prix final.',
};

export default function BlogPostPage() {
    return (
        <>
            {/* HERO SECTION */}
            <div className="relative flex min-h-[500px] items-center justify-center pt-20 m-4 rounded-[3rem] overflow-hidden">
                <Image
                    src="/blog-card-2.jpg"
                    alt="80 % du succès se joue dans les 7 premiers jours"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* CONTENT SECTION */}
            <Section className="py-20 bg-[#F4F1EE]">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h1 className="font-sans text-4xl md:text-5xl text-[#734838] font-bold mb-8 leading-tight">
                        80 % du succès se joue <br /> dans les 7 premiers jours
                    </h1>

                    <div className="prose prose-lg max-w-none text-[#734838]">
                        <p className="font-bold italic text-xl mb-12 leading-relaxed">
                            Les premières impressions comptent énormément en immobilier. Cet article t’explique pourquoi les premiers jours sur le marché déterminent l’intérêt des acheteurs, le nombre de visites et même le prix final — et comment maximiser ton lancement.
                        </p>

                        <div className="space-y-6 mb-12 text-lg font-light leading-relaxed">
                            <p>Quand une maison arrive sur le marché, les premiers jours ne sont pas “importants”.<br />
                                Ils sont <strong>cruciaux</strong>.</p>
                            <p>C’est là que tout se joue.<br />
                                L’intérêt, les visites, les offres, la perception de valeur...<br />
                                Tout se passe dans cette petite fenêtre qui dure environ une semaine.</p>
                            <p>Après 20 ans dans le métier, je peux te garantir une chose :<br />
                                quand un lancement est bien fait, la maison attire tout de suite ses acheteurs naturels.<br />
                                Quand il est mal fait ou bâclé, on le paie plus tard — en temps, en énergie, et souvent en argent.</p>
                            <p>Cet article existe pour t’expliquer pourquoi <strong>les sept premiers jours sont décisifs</strong>, et comment mettre toutes les chances de ton côté dès le départ.</p>
                        </div>

                        <div className="space-y-12">
                            {/* Point 1 */}
                            <div>
                                <h3 className="font-sans text-2xl font-bold mb-4">1. Les acheteurs regardent chaque nouveau listing... mais seulement une fois</h3>
                                <div className="space-y-4 font-light text-lg">
                                    <p>Dans les sept premiers jours, ton listing apparaît dans :</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>les alertes</li>
                                        <li>les notifications</li>
                                        <li>les recherches quotidiennes</li>
                                        <li>les portails immobiliers</li>
                                        <li>les groupes Facebook</li>
                                        <li>les réseaux de courtiers</li>
                                    </ul>
                                    <p className="mt-6">C’est le moment où <strong>tout le monde te regarde</strong>. Après? Ton listing tombe dans les résultats “normaux” et n’a plus le même impact. C’est pour ça qu’il faut “frapper fort” dès le début.</p>
                                </div>
                            </div>

                            {/* Point 2 */}
                            <div>
                                <h3 className="font-sans text-2xl font-bold mb-4">2. Les acheteurs veulent être les premiers — pas les derniers</h3>
                                <div className="space-y-4 font-light text-lg">
                                    <p>Les acheteurs fonctionnent par émotion, mais aussi par réflexe :<br />
                                        ils ont peur de manquer une opportunité.</p>
                                    <p>Quand une propriété vient d’arriver :</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>ils bookent plus vite</li>
                                        <li>ils visitent plus tôt</li>
                                        <li>ils font des offres plus rapidement</li>
                                    </ul>
                                    <p className="mt-6">Parce qu’ils savent qu’ils ne sont pas seuls. Mais si ta maison est en ligne depuis 3-4 semaines, l’effet tombe.</p>
                                    <p>Les gens se disent :</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>“Pourquoi elle n’est pas vendue?”</li>
                                        <li>“Il doit y avoir quelque chose...”</li>
                                        <li>“On va attendre encore un peu.”</li>
                                    </ul>
                                    <p className="mt-6">Et ça, c’est le genre de perception qui peut coûter des milliers de dollars.</p>
                                </div>
                            </div>

                            {/* Point 3 */}
                            <div>
                                <h3 className="font-sans text-2xl font-bold mb-4">3. Le prix juste au départ = le maximum que tu peux aller chercher</h3>
                                <div className="space-y-4 font-light text-lg">
                                    <p>C’est mathématique, mais surtout psychologique.</p>
                                    <p>Quand tu arrives au bon prix dès le départ :</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>tu génères plus de visites</li>
                                        <li>tu crées plus d’intérêt</li>
                                        <li>tu augmentes la compétition</li>
                                        <li>tu reçois des offres rapidement</li>
                                    </ul>
                                    <p className="mt-6">Et qui dit compétition, dit <strong>prix final plus élevé</strong>. Le piège que je vois trop souvent?</p>
                                    <p>Les vendeurs qui se disent :<br />
                                        “On va essayer plus haut, on verra.”</p>
                                    <p>Résultat :<br />
                                        moins de visites, moins d’intérêt, plus de temps sur le marché... et une baisse de prix plus grande que si on avait bien parti dès le début.</p>
                                </div>
                            </div>

                            {/* Point 4 */}
                            <div>
                                <h3 className="font-sans text-2xl font-bold mb-4">4. Les photos et la présentation — ça change tout</h3>
                                <div className="space-y-4 font-light text-lg">
                                    <p>Je le répète depuis des années :<br />
                                        <strong>les gens achètent ce qu’ils voient, pas ce qu’ils imaginent.</strong></p>
                                    <p>Les photos sont la première impression.<br />
                                        Si elles sont :</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>sombres</li>
                                        <li>floues</li>
                                        <li>mal cadrées</li>
                                        <li>prises trop vite</li>
                                        <li>sans mise en scène</li>
                                        <li>sans désencombrement</li>
                                    </ul>
                                    <p className="mt-6">Tu viens de perdre une grosse partie de tes acheteurs dès la première seconde. Les bonnes photos, c’est pas un luxe. C’est un investissement qui rapporte immédiatement.</p>
                                </div>
                            </div>

                            {/* Point 5 */}
                            <div>
                                <h3 className="font-sans text-2xl font-bold mb-4">5. Les sept premiers jours créent “l’histoire” de ta maison</h3>
                                <div className="space-y-4 font-light text-lg">
                                    <p>Une maison crée sa réputation très vite.</p>
                                    <p>Si, dès le début :</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>il y a des visites</li>
                                        <li>il y a des demandes d’infos</li>
                                        <li>il y a des suivis</li>
                                        <li>il y a du mouvement</li>
                                    </ul>
                                    <p className="mt-6">C’est le signe que c’est un “hot listing”.</p>
                                    <p>Mais pour ça, il faut que tout soit prêt AVANT d’appuyer sur le bouton “Mettre en ligne”.</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>photos</li>
                                        <li>vidéos</li>
                                        <li>description</li>
                                        <li>réseaux sociaux</li>
                                        <li>annonces ciblées</li>
                                        <li>visites</li>
                                        <li>disponibilité</li>
                                        <li>messages de suivi</li>
                                        <li>script de qualification</li>
                                    </ul>
                                    <p className="mt-6">Quand tout est prêt, ça roule comme une machine. Quand tout est fait à la va-vite, les sept jours sont gaspillés. Et ça, on ne peut pas se le permettre.</p>
                                </div>
                            </div>

                            {/* Point 7 (Keeping numbering as per source text) */}
                            <div>
                                <h3 className="font-sans text-2xl font-bold mb-4">7. Les vendeurs qui comprennent l’importance du début vendent plus vite — et mieux</h3>
                                <div className="space-y-4 font-light text-lg">
                                    <p>C’est le point le plus simple à comprendre :<br />
                                        les maisons qui sont :</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>bien préparées</li>
                                        <li>bien mises en marché</li>
                                        <li>bien lancées</li>
                                        <li>bien positionnées</li>
                                    </ul>
                                    <p className="mt-6">se vendent <strong>plus vite, plus cher</strong>, et <strong>avec moins de stress.</strong></p>
                                    <p>Pas parce que le marché est magique.<br />
                                        Parce qu’on a respecté la psychologie des acheteurs.<br />
                                        Parce qu’on a travaillé stratégiquement.<br />
                                        Parce qu’on a maximisé la fenêtre la plus importante.</p>
                                </div>
                            </div>

                            {/* Comment maximiser TON lancement */}
                            <div className="mt-12">
                                <h3 className="font-sans text-2xl font-bold mb-4">Comment maximiser TON lancement</h3>
                                <div className="space-y-4 font-light text-lg">
                                    <p>Voici ce que je dis toujours à mes vendeurs :</p>

                                    <div className="space-y-4">
                                        <div className="flex gap-3">
                                            <Check className="text-[#734838] shrink-0 mt-1" size={20} />
                                            <div>
                                                <p className="font-bold">Prépare ta maison comme si tu recevais un invité important</p>
                                                <p>Désencombrer, nettoyer, réparer les petits détails.</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <Check className="text-[#734838] shrink-0 mt-1" size={20} />
                                            <div>
                                                <p className="font-bold">Mets ta maison en valeur</p>
                                                <p>Photos professionnelles, ambiance, lumière, cohérence.</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <Check className="text-[#734838] shrink-0 mt-1" size={20} />
                                            <div>
                                                <p className="font-bold">Arrive avec un prix réaliste</p>
                                                <p>Un prix juste = un marché qui répond rapidement.</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <Check className="text-[#734838] shrink-0 mt-1" size={20} />
                                            <div>
                                                <p className="font-bold">Sois disponible les premiers jours</p>
                                                <p>Les visites doivent être faciles, flexibles et rapides.</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <Check className="text-[#734838] shrink-0 mt-1" size={20} />
                                            <div>
                                                <p className="font-bold">Utilise une stratégie complète</p>
                                                <p>Pas juste Centris. Réseaux sociaux, visibilité locale, vidéos, etc.</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <Check className="text-[#734838] shrink-0 mt-1" size={20} />
                                            <div>
                                                <p className="font-bold">Entoure-toi du bon monde</p>
                                                <p>Une mise en marché réussie, ça ne se fait pas seul.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Le mot de la fin */}
                            <div className="mt-16 pt-8 border-t border-[#734838]/20">
                                <h3 className="font-sans text-2xl font-bold mb-6">Le mot de la fin</h3>
                                <div className="space-y-4 font-light text-lg">
                                    <p>Les sept premiers jours ne sont pas un détail. Ce sont <strong>le cœur de la mise en marché.</strong></p>
                                    <p>Quand on comprend ça, tout change :</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>on prend de meilleures décisions</li>
                                        <li>on évite les regrets</li>
                                        <li>on optimise le prix final</li>
                                        <li>on se donne les meilleures chances</li>
                                    </ul>
                                    <p className="mt-6">Ton lancement, c’est ton moment. Il doit être réfléchi, préparé et stratégique. Et si tu veux un accompagnement humain, simple et structuré — je suis là pour ça.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
        </>
    );
}
