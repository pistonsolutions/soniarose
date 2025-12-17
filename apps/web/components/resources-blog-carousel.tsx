'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const blogPosts = [
    {
        title: "Quand ta maison ne te ressemble plus",
        description: "Avec le temps, nos besoins, nos valeurs et notre énergie changent. Et parfois, la maison qui nous a autrefois comblés ne nous correspond plus autant. Cet article explore les signes subtils — et parfois évidents — qui indiquent qu’une nouvelle étape s’en vient. Pas pour te pousser à vendre, mais pour t’aider à comprendre ce que tu ressens vraiment.",
        image: "/blog-card-1.jpg",
        link: "#"
    },
    {
        title: "Ce que les vendeurs regrettent le plus",
        description: "Une vente immobilière, c’est un mélange de décisions, d’émotions et de timing. Avec l’expérience, j’ai observé les regrets les plus fréquents des vendeurs... et surtout, comment les éviter. Que tu sois à quelques semaines ou simplement en réflexion, cet article t’offre une clarté précieuse pour faire les bons choix — au bon moment.",
        image: "/blog-card-2.jpg",
        link: "#"
    },
    {
        title: "Quand ta maison parle du passé, pas de toi",
        description: "Avec les années, nos besoins, nos valeurs et notre rythme de vie évoluent. Parfois, sans s’en rendre compte, on reste dans une maison qui ne nous ressemble plus. Cet article explore pourquoi ce décalage apparaît, comment l’identifier et comment retrouver un espace qui soutient réellement la personne que tu es devenue.",
        image: "/blog-card-3.jpg",
        link: "#"
    },
    {
        title: "Les 7 erreurs qui coûtent le plus cher aux vendeurs",
        description: "Quand vient le temps de vendre, certaines petites décisions peuvent faire perdre des milliers de dollars... sans que les vendeurs s’en rendent compte. Cet article explore les erreurs les plus fréquentes, pourquoi elles arrivent et comment les éviter pour protéger la valeur réelle de votre propriété.",
        image: "/blog-card-4.jpg",
        link: "#"
    },
    {
        title: "L'art de tourner une page sans se perdre",
        description: "Changer de maison, ce n’est jamais juste un déménagement. C’est une transition personnelle, parfois délicate, parfois libératrice. Dans cet article, je te parle de comment tourner une page avec douceur, lucidité et respect pour ce que tu laisses derrière. Parce que tu mérites d’avancer sans te perdre en chemin.",
        image: "/blog-card-1.jpg",
        link: "#"
    },
    {
        title: "80% du succès se joue dans les 7 premiers jours",
        description: "Les premières impressions comptent énormément en immobilier. Cet article t’explique pourquoi les premiers jours sur le marché déterminent l’intérêt des acheteurs, le nombre de visites et même le prix final — et comment maximiser ton lancement.",
        image: "/blog-card-2.jpg",
        link: "#"
    }
];

export function ResourcesBlogCarousel() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
        }
    };

    return (
        <div className="relative group">
            {/* Navigation Buttons */}
            <button
                onClick={scrollLeft}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-24 z-10 p-2 text-[#734838] hover:text-opacity-70 transition-colors hidden md:block"
                aria-label="Scroll left"
            >
                <ChevronLeft size={48} />
            </button>
            <button
                onClick={scrollRight}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-24 z-10 p-2 text-[#734838] hover:text-opacity-70 transition-colors hidden md:block"
                aria-label="Scroll right"
            >
                <ChevronRight size={48} />
            </button>

            {/* Carousel Container */}
            <div
                ref={scrollContainerRef}
                className="flex overflow-x-auto gap-8 pb-8 snap-x snap-mandatory hide-scrollbar"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {blogPosts.map((post, index) => (
                    <div
                        key={index}
                        className="flex-none w-[300px] md:w-[350px] snap-center flex flex-col"
                    >
                        {/* Image */}
                        <div className="relative aspect-square w-full mb-6 shadow-md">
                            <Image
                                src={post.image}
                                alt={post.title}
                                fill
                                className="object-cover"
                            />
                            {/* Title Overlay */}
                            <div className="absolute top-4 left-4 right-4 text-center">
                                <h3 className="text-white font-sans text-lg font-bold drop-shadow-md leading-tight">
                                    {post.title}
                                </h3>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-grow flex flex-col items-center text-center px-2">
                            <p className="text-[#734838] text-sm leading-relaxed mb-6 font-medium">
                                {post.description}
                            </p>

                            <div className="mt-auto">
                                <Button
                                    asChild
                                    className="rounded-none uppercase tracking-wider text-white px-8 py-2 text-sm hover:opacity-90 transition-opacity"
                                    style={{ backgroundColor: '#734838' }}
                                >
                                    <Link href={post.link}>
                                        LIRE L'ARTICLE <span className="ml-2">→</span>
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
