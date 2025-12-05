import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/ui/section';
import { MapPin, Bed, Bath, Maximize, Instagram, Facebook, Linkedin } from 'lucide-react';
import type { Metadata } from 'next';

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
            <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden bg-slate-50">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/Nouveaute - Saint-Paul-de-l'Ile-aux-Noix.jpeg"
                        alt="Propriétés à vendre Sonia Rose"
                        fill
                        className="object-cover opacity-30 blur-sm"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-white/90" />
                </div>

                <div className="container relative z-10 mx-auto px-4 text-center">
                    <h1 className="mb-6 font-serif text-4xl font-bold text-brand-navy md:text-5xl lg:text-6xl">
                        Mes Propriétés <br />
                        <span className="text-brand-gold">À Vendre</span>
                    </h1>
                    <p className="mx-auto max-w-3xl text-lg text-slate-600 md:text-xl">
                        Découvrez une sélection de propriétés sur la Rive-Sud et dans le Grand Montréal.
                        Que vous cherchiez votre première maison, un condo moderne ou un investissement, je suis là pour vous guider.
                    </p>
                </div>
            </section>

            {/* SECTION 2 — LISTE DES PROPRIÉTÉS */}
            <Section background="white">
                <div className="mb-12 flex flex-col items-center justify-between gap-4 md:flex-row">
                    <h2 className="font-serif text-3xl font-bold text-brand-navy">Propriétés en vedette</h2>
                    <div className="flex gap-2">
                        <Button variant="outline">Tous</Button>
                        <Button variant="ghost">Maisons</Button>
                        <Button variant="ghost">Condos</Button>
                        <Button variant="ghost">Revenus</Button>
                    </div>
                </div>

                {/* Property Grid */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {properties.map((property) => (
                        <div key={property.id} className="group overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl">
                            <div className="relative aspect-[4/3] bg-slate-200">
                                <div className={`absolute top-4 left-4 z-10 rounded-md px-3 py-1 text-sm font-bold text-white ${property.status === 'Nouveau' ? 'bg-brand-gold' : 'bg-brand-navy'
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
                                <div className="mb-2 text-sm font-medium text-brand-gold">{property.city}</div>
                                <h3 className="mb-2 font-serif text-xl font-bold text-brand-navy">{property.title}</h3>
                                <div className="mb-4 flex items-center text-slate-500">
                                    <MapPin size={16} className="mr-1" />
                                    <span className="text-sm">{property.address}</span>
                                </div>
                                <div className="mb-6 flex justify-between border-y border-slate-100 py-4 text-sm text-slate-600">
                                    <div className="flex items-center gap-1"><Bed size={18} /> {property.beds} Lits</div>
                                    <div className="flex items-center gap-1"><Bath size={18} /> {property.baths} Bains</div>
                                    <div className="flex items-center gap-1"><Maximize size={18} /> {property.sqft} pi²</div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xl font-bold text-brand-navy">{property.price}</span>
                                    <Button size="sm" variant="outline" className="group-hover:bg-brand-navy group-hover:text-white">
                                        Voir détails
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <p className="mb-6 text-lg text-slate-600">
                        Vous ne trouvez pas ce que vous cherchez ? <br />
                        Inscrivez-vous à mon alerte immobilière pour recevoir les nouveautés en primeur.
                    </p>
                    <Button asChild size="lg" variant="gold">
                        <Link href="https://tally.so/r/w7X1p6" target="_blank">M'inscrire à l'alerte</Link>
                    </Button>
                </div>
            </Section >
        </>
    );
}
