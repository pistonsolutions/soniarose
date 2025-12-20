'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const blogPosts = [
    {
        id: 1,
        title: "Comment choisir le bon moment pour vendre",
        description: "Avec le temps, nos besoins, nos valeurs et notre énergie changent. Et parfois, la maison qui nous a autrefois comblés ne nous correspond plus autant. Cet article t’aide à reconnaître les signaux qui indiquent qu’une nouvelle étape se prépare doucement.",
        image: "/assets/blog/article-1.png",
        link: "/blog/comment-choisir-le-bon-moment-pour-vendre",
        date: "12 Déc 2024"
    },
    {
        id: 2,
        title: "Ce que les vendeurs regrettent le plus",
        description: "Une vente immobilière, c’est un mélange d’émotions, de décisions et d’intuitions. Avec l’expérience, j’ai observé les erreurs les plus fréquentes qui créent des déceptions. Cet article t’offre une perspective claire pour faire les bons choix dès le départ.",
        image: "/assets/blog/article-2.png",
        link: "/blog/ce-que-les-vendeurs-regrettent-le-plus",
        date: "05 Déc 2024"
    },
    {
        id: 3,
        title: "L’art de tourner une page sans se perdre",
        description: "Tourner une page, ce n’est jamais simple. C’est laisser aller ce qui ne nous ressemble plus, reconnaître ce qui doit changer, et avancer vers un nouveau chapitre. Cet article t’aide à comprendre ce moment fragile où l’on peut se perdre… ou enfin se retrouver.",
        image: "/assets/blog/article-3.png",
        link: "/blog/l-art-de-tourner-une-page-sans-se-perdre",
        date: "28 Nov 2024"
    },
    {
        id: 4,
        title: "7 signes que c’est peut-être le moment de vendre",
        description: "Certaines maisons nous parlent sans qu’on s’en rende compte. À travers ces sept indices concrets et émotionnels, tu pourras mieux savoir si ta maison t’offre encore ce dont tu as besoin — ou si un nouveau chapitre s’annonce doucement.",
        image: "/assets/blog/article-4.png",
        link: "/blog/7-signes-que-cest-peut-etre-le-moment-de-vendre",
        date: "20 Nov 2024"
    },
    {
        id: 5,
        title: "Quand ta maison ne te ressemble plus",
        description: "Parfois, sans qu’on s’en aperçoive, la maison qu’on aimait ne reflète plus qui on est devenu. Cet article explore les signes subtils — et parfois évidents — qui montrent qu’un changement s’impose, non par pression, mais pour ton bien-être.",
        image: "/assets/blog/article-5.png",
        link: "/blog/quand-ta-maison-ne-te-ressemble-plus",
        date: "15 Nov 2024"
    },
    {
        id: 6,
        title: "80 % du succès se joue dans les 7 premiers jours",
        description: "Les premières impressions comptent énormément en immobilier. Cet article t’explique pourquoi les premiers jours sur le marché déterminent l’intérêt des acheteurs, le nombre de visites et même le prix final — et comment maximiser ton lancement.",
        image: "/assets/blog/article-6.png",
        link: "/blog/80-pourcent-succes-7-premiers-jours",
        date: "08 Nov 2024"
    }
];

export function BlogPageCarousel() {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = current.clientWidth; // Scroll one full view width
            if (direction === 'left') {
                current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    return (
        <div className="relative w-full max-w-[1400px] mx-auto px-12 md:px-20">
            {/* Left Arrow */}
            <button
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 text-[#734838] hover:opacity-70 transition-opacity"
                aria-label="Previous"
            >
                <ChevronLeft size={48} strokeWidth={1.5} />
            </button>

            {/* Carousel Container */}
            <div
                ref={scrollRef}
                className="flex overflow-x-auto snap-x snap-mandatory gap-8 pb-12 hide-scrollbar"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {blogPosts.map((post) => (
                    <div
                        key={post.id}
                        className="flex-none w-full md:w-[calc(33.333%-1.33rem)] snap-center group"
                    >
                        <Link href={post.link} className="block h-full">
                            <div className="flex flex-col h-full">
                                {/* Image Container with Overlay Title */}
                                <div className="relative aspect-square w-full overflow-hidden mb-6">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />

                                    {/* Title Overlay */}
                                    <div className="absolute top-4 left-4 right-4 text-center">
                                        <h3 className="text-white font-sans font-bold text-lg md:text-xl leading-tight drop-shadow-md">
                                            {post.title}
                                        </h3>
                                    </div>
                                </div>

                                {/* Content Below */}
                                <div className="flex flex-col flex-grow items-center text-center px-2">
                                    <p className="text-[#734838] text-sm leading-relaxed mb-6 line-clamp-6">
                                        {post.description}
                                    </p>

                                    <div className="mt-auto">
                                        <span
                                            className="inline-flex items-center px-6 py-3 bg-[#734838] text-white text-sm font-medium uppercase tracking-wider hover:bg-[#5e3a2d] transition-colors"
                                        >
                                            LIRE L'ARTICLE <ArrowRight size={16} className="ml-2" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

            {/* Right Arrow */}
            <button
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 text-[#734838] hover:opacity-70 transition-opacity"
                aria-label="Next"
            >
                <ChevronRight size={48} strokeWidth={1.5} />
            </button>
        </div>
    );
}
