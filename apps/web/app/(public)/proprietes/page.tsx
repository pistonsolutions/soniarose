import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/ui/section';
import { FadeIn } from '@/components/ui/fade-in';
import { MapPin, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import { EvaluationSection } from '@/components/evaluation-section';
import { PropertiesCarousel } from '@/components/properties-carousel';

export const metadata: Metadata = {
    title: 'Propriétés à vendre Rive-Sud | Sonia Rose Courtier Immobilier',
    description: 'Consultez les propriétés à vendre sur la Rive-Sud et à Montréal avec Sonia Rose. Maisons, condos, plex. Trouvez la propriété idéale avec une courtière d’expérience.',
};

const properties = [
    {
        id: 1,
        status: 'Nouveau',
        city: "Saint-Paul-de-l'Île-aux-Noix",
        title: 'Bord de l\'eau',
        address: "Saint-Paul-de-l'Île-aux-Noix, QC",
        price: 'Sur demande',
        image: "/Nouveaute - Saint-Paul-de-l'Ile-aux-Noix.jpeg",
        beds: 4,
        baths: 2,
        sqft: 2500,
    },
    {
        id: 2,
        status: 'Vendu',
        city: 'Boucherville',
        title: 'Condo',
        address: 'Boucherville, QC',
        price: 'Vendu',
        image: '/Vendu - Boucherville.jpeg',
        beds: 4,
        baths: 2,
        sqft: 2200,
    },
    {
        id: 3,
        status: 'Vendu',
        city: 'Brossard',
        title: 'Cottage rénové',
        address: 'Brossard, QC',
        price: 'Vendu',
        image: '/Vendu - Brossard.jpg',
        beds: 3,
        baths: 2,
        sqft: 1800,
    },
    {
        id: 4,
        status: 'Vendu',
        city: 'Longueuil',
        title: 'Condo lumineux',
        address: 'Longueuil, QC',
        price: 'Vendu',
        image: '/Vendu - Longeuil.png',
        beds: 2,
        baths: 1,
        sqft: 1100,
    },
    {
        id: 5,
        status: 'Vendu',
        city: 'Longueuil',
        title: 'Maison à étages',
        address: 'Longueuil, QC',
        price: 'Vendu',
        image: '/Vendu - Longeuil1.jpeg',
        beds: 6,
        baths: 3,
        sqft: 2800,
    },
    {
        id: 6,
        status: 'Vendu',
        city: 'Mercier',
        title: 'Maison à paliers multiples',
        address: 'Mercier, QC',
        price: 'Vendu',
        image: '/Vendu - Mercier.jpeg',
        beds: 3,
        baths: 2,
        sqft: 1500,
    },
    {
        id: 7,
        status: 'Vendu',
        city: 'Saint-Jean-sur-Richelieu',
        title: 'Maison plain-pied avec vue exceptionelle',
        address: 'Saint-Jean-sur-Richelieu, QC',
        price: 'Vendu',
        image: '/Vendu - Saint-Jean-sur-Richelieu.jpeg',
        beds: 3,
        baths: 1.5,
        sqft: 1600,
    },
    {
        id: 8,
        status: 'Vendu',
        city: 'Sainte-Julie',
        title: 'Maison de ville',
        address: 'Sainte-Julie, QC',
        price: 'Vendu',
        image: '/Vendu - Sainte-Julie.jpeg',
        beds: 5,
        baths: 3,
        sqft: 3200,
    },
    {
        id: 9,
        status: 'Vendu',
        city: 'Sainte-Madeleine',
        title: 'Charme champêtre',
        address: 'Sainte-Madeleine, QC',
        price: 'Vendu',
        image: '/Vendu - Sainte-Madelaine.jpg',
        beds: 3,
        baths: 1,
        sqft: 1400,
    },
    {
        id: 10,
        status: 'Vendu',
        city: 'Saint-Hubert',
        title: 'Condo rénové',
        address: 'Saint-Hubert, QC',
        price: 'Vendu',
        image: '/Vendu - St-Hubert.png',
        beds: 3,
        baths: 2,
        sqft: 1300,
    },
    {
        id: 11,
        status: 'Vendu',
        city: 'Stukely-Sud',
        title: 'Havre de paix',
        address: 'Stukely-Sud, QC',
        price: 'Vendu',
        image: '/Vendu - Stukely-Sud.jpeg',
        beds: 3,
        baths: 2,
        sqft: 2000,
    },
    {
        id: 12,
        status: 'Vendu',
        city: 'Saint-Hubert',
        title: 'Construction Neuve',
        address: 'Saint-Hubert, QC',
        price: 'Vendu',
        image: '/Vendu Saint-Hubert.jpg',
        beds: 2,
        baths: 1,
        sqft: 1000,
    },
    {
        id: 13,
        status: 'Vendu',
        city: 'Hochelaga-Maisonneuve',
        title: '6 Plex',
        address: 'Hochelaga-Maisonneuve, QC',
        price: 'Vendu',
        image: '/Vendu - 6plexes - Hochelaga-Maisonneuve.jpeg',
        beds: 6,
        baths: 6,
        sqft: 5000,
    },
    {
        id: 14,
        status: 'Vendu',
        city: 'Plateau Mont-Royal',
        title: 'Propriété à revenus - Idéal pour investissement',
        address: 'Plateau Mont-Royal, QC',
        price: 'Vendu',
        image: '/Vendu - Propriétés a revenu, idéal pour investissement - Plateau Montroyal.jpg',
        beds: 4,
        baths: 2,
        sqft: 3000,
    },
];

export default function PropertiesPage() {
    // HERO CONFIGURATION
    // Change to 'contain' to see the full image (unzoomed), or 'cover' to fill the area (zoomed/cropped)
    const heroObjectFit: 'cover' | 'contain' = 'cover';
    const heroScale = 1; // Scale factor: 1 = 100%
    const heroObjectPosition = '50% 70%'; // Focus on the lower part (50% horizontal, 70% vertical)

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'CollectionPage',
                        name: 'Propriétés à vendre',
                        url: 'https://soniarose.ca/proprietes',
                        description:
                            'Liste des propriétés résidentielles et commerciales à vendre sur la Rive-Sud de Montréal et les environs, représentées par Sonia Rose.',
                        mainEntity: {
                            '@type': 'ItemList',
                            itemListElement: properties.map((prop, index) => ({
                                '@type': 'ListItem',
                                position: index + 1,
                                name: prop.title,
                                url: `https://soniarose.ca/proprietes/${prop.id}`,
                            })),
                        },
                    }),
                }}
            />

            {/* SECTION 1 — HERO */}
            <div className="relative flex min-h-[500px] items-center justify-center pt-20 m-4 rounded-[3rem] overflow-hidden">
                <Image
                    src="/properties-hero-bg.jpg"
                    alt="Propriétés à vendre Sonia Rose"
                    fill
                    className={`object-${heroObjectFit}`}
                    style={{ opacity: 0.6, transform: `scale(${heroScale})`, objectPosition: heroObjectPosition }}
                    priority
                />
                <div className="absolute inset-0 bg-black/20" />
                <div className="container relative z-10 mx-auto px-4 text-center">
                    <FadeIn delay={0.2}>
                        <h1 className="mb-4 font-sans text-6xl font-normal md:text-8xl tracking-widest opacity-90 text-brand-beige-300" style={{ textShadow: '3px 5px 6px rgba(0, 0, 0, 0.4)' }}>
                            MES PROPRIÉTÉS
                        </h1>
                        <p className="text-sm md:text-base text-white/90 font-light tracking-wide uppercase">
                            À Vendre & Vendu
                        </p>
                    </FadeIn>
                </div>
            </div >

            {/* SECTION 2 — LISTE DES PROPRIÉTÉS */}
            <Section className="py-20 bg-brand-beige-200">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <div className="mb-12 flex flex-col items-center justify-between gap-4 md:flex-row">
                            <h2 className="font-sans text-3xl font-bold text-brand-brown">Propriétés en vedette</h2>
                        </div>

                        {/* Property Carousel */}
                        <PropertiesCarousel properties={properties} />

                        <div className="mt-16 text-center">
                            <p className="mb-6 text-lg text-brand-brown">
                                Vous ne trouvez pas ce que vous cherchez ? <br />
                                Inscrivez-vous à mon alerte immobilière pour recevoir les nouveautés en primeur.
                            </p>
                            <Button asChild size="lg" className="bg-brand-brown text-white hover:bg-brand-brown/90">
                                <Link href="https://tally.so/r/w7X1p6" target="_blank">
                                    M'inscrire à l'alerte <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </FadeIn>
                </div>
            </Section>

            {/* SECTION 3 — EVALUATION */}
            <FadeIn>
                <EvaluationSection />
            </FadeIn>
        </>
    );
}
