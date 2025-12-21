'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { blogPosts } from '@/lib/blog-data';

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
                                src={post.image || '/assets/blog/default-card.jpg'}
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
                                {post.excerpt}
                            </p>

                            <div className="mt-auto">
                                <Button
                                    asChild
                                    className="rounded-none uppercase tracking-wider text-white px-8 py-2 text-sm hover:opacity-90 transition-opacity"
                                    style={{ backgroundColor: '#734838' }}
                                >
                                    <Link href={`/blog/${post.slug}`}>
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
