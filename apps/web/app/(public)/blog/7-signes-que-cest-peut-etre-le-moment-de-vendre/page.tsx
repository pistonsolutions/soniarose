import Image from 'next/image';
import { Section } from '@/components/ui/section';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '7 signes que c’est peut-être le moment de vendre | Blog Sonia Rose',
    description: 'Certaines maisons nous parlent sans qu’on s’en rende compte. À travers ces sept indices concrets et émotionnels, tu pourras mieux savoir si ta maison t’offre encore ce dont tu as besoin.',
};

export default function BlogPostPage() {
    return (
        <>
            {/* HERO SECTION */}
            <div className="relative flex min-h-[500px] items-center justify-center pt-20 m-4 rounded-[3rem] overflow-hidden">
                <Image
                    src="/blog-card-4.jpg"
                    alt="7 signes que c’est peut-être le moment de vendre"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* CONTENT SECTION */}
            <Section className="py-20 bg-[#F4F1EE]">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h1 className="font-serif text-4xl md:text-5xl text-[#734838] font-bold mb-8 leading-tight">
                        7 signes que c’est peut-être <br /> le moment de vendre
                    </h1>

                    <div className="prose prose-lg max-w-none text-[#734838]">
                        <p className="font-bold italic text-xl mb-12 leading-relaxed">
                            Certaines maisons nous parlent sans qu’on s’en rende compte. À travers ces sept indices concrets et émotionnels, tu pourras mieux savoir si ta maison t’offre encore ce dont tu as besoin — ou si un nouveau chapitre s’annonce.
                        </p>

                        <div className="space-y-6 mb-12 text-lg font-light leading-relaxed">
                            <p>On pense souvent qu’on va “savoir” quand ce sera le bon moment pour vendre. Mais dans la vraie vie, c’est rarement un déclic clair et parfait. C’est plutôt une accumulation de petits signes : des choses qu’on remarque sans trop y prêter attention, mais qui reviennent. Des impressions, des inconforts, des réflexions qui s’installent.</p>
                            <p>Pas de panique : ça ne veut pas dire qu’il faut déménager demain matin. Mais ça veut dire que quelque chose est en train de changer, et que ça vaut la peine d’écouter.</p>
                            <p>Voici les 7 signes les plus fréquents que je vois chez mes clients depuis 20 ans. Des signes simples, concrets, réalistes... mais révélateurs.</p>
                        </div>

                        <div className="space-y-12">
                            {/* Point 1 */}
                            <div>
                                <h3 className="font-serif text-2xl font-bold mb-4">1. La maison ne correspond plus à ta vie actuelle</h3>
                                <div className="space-y-4 font-light text-lg">
                                    <p>Ça arrive à tout le monde. La maison parfaite il y a 10 ans ne l’est plus aujourd’hui. Pourquoi ?</p>
                                    <p>Parce que nos vies changent :</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>les enfants partent</li>
                                        <li>une séparation arrive</li>
                                        <li>un nouveau travail change ton horaire</li>
                                        <li>tu veux quelque chose de plus simple</li>
                                        <li>ou au contraire, plus grand</li>
                                    </ul>
                                    <p className="mt-6">Quand tu regardes autour et que tu te dis : <strong>Ce n’est plus vraiment ce dont j’ai besoin</strong>, c’est un signe.</p>
                                </div>
                            </div>

                            {/* Point 2 */}
                            <div>
                                <h3 className="font-serif text-2xl font-bold mb-4">2. L’entretien devient un poids au lieu d’un plaisir</h3>
                                <div className="space-y-4 font-light text-lg">
                                    <p>Une maison, c’est beau. Mais une maison, c’est aussi de l’ouvrage... et ça, ça peut devenir lourd. Les tâches qui étaient faciles avant deviennent épuisantes :</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>tondre le gazon</li>
                                        <li>pelleter</li>
                                        <li>entretenir une grande cour</li>
                                        <li>nettoyer une grande maison</li>
                                        <li>gérer les réparations</li>
                                        <li>t’occuper de la piscine</li>
                                        <li>monter/descendre les escaliers vingt fois par jour</li>
                                    </ul>
                                    <p className="mt-6">Si tu sens que <strong>tu fais plus d’entretien que de vraie vie</strong>, ce n’est pas banal.</p>
                                </div>
                            </div>

                            {/* Point 3 */}
                            <div>
                                <h3 className="font-serif text-2xl font-bold mb-4">3. Tu ne te sens plus “chez toi” comme avant</h3>
                                <div className="space-y-4 font-light text-lg">
                                    <p>C’est un signe subtil, mais puissant. Tu rentres chez toi et... l’ambiance n’est plus la même. Il manque quelque chose. Tu n’as plus le même attachement.</p>
                                    <p>Des fois, c’est à cause d’un changement personnel.<br />
                                        Des fois, c’est parce que l’énergie n’est plus pareille.<br />
                                        Des fois, c’est parce que tu sens que tu as évolué... mais ta maison, non.</p>
                                    <p>Si tu ne vibres plus dans ton espace, écoute ce message-là.</p>
                                </div>
                            </div>

                            {/* Point 4 */}
                            <div>
                                <h3 className="font-serif text-2xl font-bold mb-4">4. Tes besoins d’espace ont changé</h3>
                                <div className="space-y-4 font-light text-lg">
                                    <p>Dans la vie, on passe par différentes phases.</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>Famille qui s’agrandit</li>
                                        <li>Famille qui rétrécit</li>
                                        <li>Travail à la maison</li>
                                        <li>Projet personnel</li>
                                        <li>Nouveau couple</li>
                                        <li>Besoin de plus de rangement</li>
                                        <li>Besoin de moins de maux de tête</li>
                                    </ul>
                                    <p className="mt-6">Le problème le plus fréquent que je vois :<br />
                                        des maisons trop grandes pour la nouvelle réalité ou trop petites pour la vie actuelle. Quand ça ne “fit” plus, ça se ressent tous les jours.</p>
                                </div>
                            </div>

                            {/* Point 5 */}
                            <div>
                                <h3 className="font-serif text-2xl font-bold mb-4">5. Tu penses souvent à autre chose... un autre quartier, une autre vibe</h3>
                                <div className="space-y-4 font-light text-lg">
                                    <p>Ce signe-là, il est révélateur.</p>
                                    <p>Tu observes d’autres quartiers.<br />
                                        Tu regardes les nouvelles constructions.<br />
                                        Tu te surprends à ouvrir Centris “juste pour voir”.<br />
                                        Tu imagines une autre ambiance, un autre style, une autre lumière.</p>
                                    <p>Ce n’est pas un hasard. C’est ton esprit qui te montre ce que ton cœur n’ose pas encore dire.</p>
                                </div>
                            </div>

                            {/* Point 6 */}
                            <div>
                                <h3 className="font-serif text-2xl font-bold mb-4">6. Ta maison est rendue plus lourde que ta vie</h3>
                                <div className="space-y-4 font-light text-lg">
                                    <p>Ça, c’est LE signe que les gens ignorent trop longtemps.</p>
                                    <p>Quand une maison n’accompagne plus ton quotidien mais le complique :</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>trop de pièces</li>
                                        <li>trop d’escaliers</li>
                                        <li>trop de réparations</li>
                                        <li>trop de responsabilités</li>
                                        <li>trop de coûts pour l’usage réel</li>
                                        <li>trop d’efforts pour l’entretenir</li>
                                    </ul>
                                    <p className="mt-6">C’est souvent là que la réflexion commence à être sérieuse. Une maison doit supporter ton mode de vie, pas l’alourdir.</p>
                                </div>
                            </div>

                            {/* Point 7 */}
                            <div>
                                <h3 className="font-serif text-2xl font-bold mb-4">7. Tu sens que tu es prête à passer à autre chose</h3>
                                <div className="space-y-4 font-light text-lg">
                                    <p>C’est le signe le plus important... et le plus difficile à nommer. Tu n’es pas malheureuse. Mais tu n’es plus pleinement bien non plus.</p>
                                    <p>Tu sens que quelque chose est terminé.<br />
                                        Tu sens que tu as besoin d’un renouveau.<br />
                                        Tu sens qu’il y a une nouvelle version de toi qui pointe.</p>
                                    <p>Et souvent, ton environnement doit suivre ce changement-là.</p>
                                </div>
                            </div>

                            {/* Ce qu'il faut comprendre */}
                            <div className="mt-12">
                                <h3 className="font-serif text-2xl font-bold mb-4">Ce qu’il faut comprendre</h3>
                                <div className="space-y-4 font-light text-lg">
                                    <p>Vendre une maison, ce n’est jamais juste financier. C’est un mélange de logique... et d’instinct. Les deux comptent.</p>
                                    <p>Tu n’as pas besoin d’être certaine à 100 % pour commencer à t’informer.<br />
                                        Tu as juste besoin d’être attentive aux signes.</p>
                                    <p>Parce que ces signes-là, ce sont tes indicateurs.<br />
                                        Ils te montrent où tu en es.<br />
                                        Ils t’aident à décider si tu dois rester, rénover, simplifier... ou vendre.</p>
                                    <p>Et vendre, ce n’est pas “tout recommencer”. C’est choisir une maison qui correspond à ta vie d’aujourd’hui — pas celle d’hier.</p>
                                </div>
                            </div>

                            {/* Conclusion */}
                            <div className="mt-16 pt-8 border-t border-[#734838]/20">
                                <h3 className="font-serif text-2xl font-bold mb-6">Conclusion</h3>
                                <div className="space-y-4 font-light text-lg">
                                    <p>Si tu te reconnais dans un de ces signes, ce n’est pas une urgence. C’est juste un message. Une invitation à réfléchir.</p>
                                    <p>Moi, je suis là pour t’accompagner dans cette réflexion-là :<br />
                                        clairement, simplement, sans pression.</p>
                                    <p>Parce que la meilleure décision, c’est celle qui t’aligne avec ta vie d’aujourd’hui... et avec celle que tu veux créer.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
        </>
    );
}
