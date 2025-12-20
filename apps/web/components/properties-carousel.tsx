'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Property {
    id: number;
    status: string;
    city: string;
    title: string;
    address: string;
    price: string;
    image: string;
    beds: number;
    baths: number;
    sqft: number;
}

interface PropertiesCarouselProps {
    properties: Property[];
}

export function PropertiesCarousel({ properties }: PropertiesCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(3);

    // Responsive items per page
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setItemsPerPage(1);
            } else if (window.innerWidth < 1024) {
                setItemsPerPage(2);
            } else {
                setItemsPerPage(3);
            }
        };

        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex + itemsPerPage >= properties.length ? 0 : prevIndex + itemsPerPage
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex - itemsPerPage < 0
                ? Math.max(0, properties.length - itemsPerPage) // Go to last full page roughly
                : prevIndex - itemsPerPage
        );
    };

    const visibleProperties = properties.slice(currentIndex, currentIndex + itemsPerPage);

    // If we are at the end and don't have enough items to fill the row, just show what's left
    // or wrap around logic could be more complex, but simple slice is often enough.
    // However, for a carousel, usually you want a full "page" if possible.
    // Let's stick to simplest valid slice first.

    return (
        <div className="relative">
            {/* Carousel Container */}
            <div className="overflow-hidden py-4">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
                    >
                        {visibleProperties.map((property) => (
                            <div key={property.id} className="group overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                                <div className="relative aspect-[4/3] bg-slate-200">
                                    <div className={`absolute top-4 left-4 z-10 rounded-md px-3 py-1 text-sm font-bold text-white ${property.status === 'Nouveau' ? 'bg-brand-brown' : 'bg-brand-brown/80'
                                        }`}>
                                        {property.status}
                                    </div>
                                    <Image
                                        src={property.image}
                                        alt={property.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <div className="p-6">
                                    <div className="mb-2 text-sm font-medium text-brand-brown/70 uppercase tracking-wider">{property.city}</div>
                                    <h3 className="mb-2 font-sans text-xl font-bold text-brand-brown">{property.title}</h3>
                                    <div className="mb-4 flex items-center text-brand-brown/80">
                                        <MapPin size={16} className="mr-1" />
                                        <span className="text-sm">{property.address}</span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-xl font-bold text-brand-brown">{property.price}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Controls */}
            <div className="mt-8 flex justify-center gap-4">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={prevSlide}
                    className="h-12 w-12 rounded-full border-brand-brown text-brand-brown hover:bg-brand-brown hover:text-white"
                >
                    <ChevronLeft className="h-6 w-6" />
                </Button>
                <div className="flex items-center text-sm font-medium text-brand-brown">
                    {Math.ceil((currentIndex + 1) / itemsPerPage)} / {Math.ceil(properties.length / itemsPerPage)}
                </div>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={nextSlide}
                    className="h-12 w-12 rounded-full border-brand-brown text-brand-brown hover:bg-brand-brown hover:text-white"
                >
                    <ChevronRight className="h-6 w-6" />
                </Button>
            </div>
        </div>
    );
}
