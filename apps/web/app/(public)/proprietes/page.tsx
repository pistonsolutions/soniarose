import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/ui/section';
import { FadeIn } from '@/components/ui/fade-in';
import { MapPin, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import { EvaluationSection } from '@/components/evaluation-section';

export const metadata: Metadata = {
    title: 'Propriétés à vendre Rive-Sud | Sonia Rose Courtier Immobilier',
    description: 'Consultez les propriétés à vendre sur la Rive-Sud et à Montréal avec Sonia Rose. Maisons, condos, plex. Trouvez la propriété idéale avec une courtière d’expérience.',
};

const properties = [
    {
        id: 1,
        status: 'Nouveau',
        city: "Saint-Paul-de-l'Île-aux-Noix",
        title: 'Bord de l\'eau exceptionnel',
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
        title: 'Maison familiale',
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
        title: 'Propriété à revenus',
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
        title: 'Plain-pied moderne',
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
        title: 'Maison de ville',
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
        title: 'Prestige et confort',
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
        title: 'Bungalow rénové',
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
        title: 'Investissement idéal',
        address: 'Saint-Hubert, QC',
        price: 'Vendu',
        image: '/Vendu Saint-Hubert.jpg',
        beds: 2,
        baths: 1,
        sqft: 1000,
    },
];

export default function PropertiesPage() {
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
                    src="/Nouveaute - Saint-Paul-de-l'Ile-aux-Noix.jpeg"
                    alt="Propriétés à vendre Sonia Rose"
                    fill
                    className="object-cover"
                    style={{ opacity: 0.6 }}
                    priority
                />
                <div className="absolute inset-0 bg-black/20" />
                <div className="container relative z-10 mx-auto px-4 text-center">
                    <FadeIn delay={0.2}>
                        <h1 className="mb-4 font-serif text-5xl font-normal text-white md:text-7xl tracking-widest opacity-90">
                            MES PROPRIÉTÉS
                        </h1>
                        <p className="text-sm md:text-base text-white/90 font-light tracking-wide uppercase">
                            À Vendre & Vendu
                        </p>
                    </FadeIn>
                </div>
            </div>

            {/* SECTION 2 — LISTE DES PROPRIÉTÉS */}
            <Section className="py-20 bg-[#F4F1EE]">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <div className="mb-12 flex flex-col items-center justify-between gap-4 md:flex-row">
                            <h2 className="font-serif text-3xl font-bold text-[#734838]">Propriétés en vedette</h2>
                            <div className="flex gap-2">
                                <Button variant="outline" className="border-[#734838] text-[#734838] hover:bg-[#734838] hover:text-white">Tous</Button>
                                <Button variant="ghost" className="text-[#734838] hover:bg-[#734838]/10">Maisons</Button>
                                <Button variant="ghost" className="text-[#734838] hover:bg-[#734838]/10">Condos</Button>
                                <Button variant="ghost" className="text-[#734838] hover:bg-[#734838]/10">Revenus</Button>
                            </div>
                        </div>

                        {/* Property Grid */}
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {properties.map((property) => (
                                <div key={property.id} className="group overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                                    <div className="relative aspect-[4/3] bg-slate-200">
                                        <div className={`absolute top-4 left-4 z-10 rounded-md px-3 py-1 text-sm font-bold text-white ${property.status === 'Nouveau' ? 'bg-[#734838]' : 'bg-black/50'
                                            }`}>
                                            {property.status}
                                        </div>
                                        <Image
                                            src={property.image}
                                            alt={property.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <div className="mb-2 text-sm font-medium text-[#734838]/70 uppercase tracking-wider">{property.city}</div>
                                        <h3 className="mb-2 font-serif text-xl font-bold text-[#734838]">{property.title}</h3>
                                        <div className="mb-4 flex items-center text-[#734838]/80">
                                            <MapPin size={16} className="mr-1" />
                                            <span className="text-sm">{property.address}</span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="text-xl font-bold text-[#734838]">{property.price}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-16 text-center">
                            <p className="mb-6 text-lg text-[#734838]">
                                Vous ne trouvez pas ce que vous cherchez ? <br />
                                Inscrivez-vous à mon alerte immobilière pour recevoir les nouveautés en primeur.
                            </p>
                            <Button asChild size="lg" className="bg-[#734838] text-white hover:bg-[#5e3a2d]">
                                <Link href="https://tally.so/r/w7X1p6" target="_blank">
                                    M'inscrire à l'alerte <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </FadeIn>
                </div>
            </Section >

            {/* SECTION 3 — EVALUATION */}
            <FadeIn>
                <EvaluationSection />
            </FadeIn>
        </>
    );
}
