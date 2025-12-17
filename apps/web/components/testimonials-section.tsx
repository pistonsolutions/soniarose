'use client';

import { FadeIn } from '@/components/ui/fade-in';
import { Section } from '@/components/ui/section';
import { useState } from 'react';

const testimonials = [
    {
        quote: "Sonia Rose à dépassé toutes nos attentes en tant que Courtière immobilière. Son professionnalisme exceptionnel, sa connaissance approfondie du marché et son engagement à satisfaire pleinement ses clients ont rendu notre expérience remarquable.",
        author: "– Christiane et Louise, La Prairie",
    },
    {
        quote: "Une expérience incroyable avec Sonia. Elle a su nous écouter et nous guider avec une patience exemplaire.",
        author: "– Client Satisfait",
    },
    {
        quote: "Grâce à son dynamisme, sa transparence, son attitude positive et à sa diligence, elle a facilité chaque étape du processus.",
        author: "– Client Heureux",
    },
];

export function TestimonialsSection() {
    const [currentSlide, setCurrentSlide] = useState(0);

    return (
        <Section background="white">
            <FadeIn>
                <div className="text-center">
                    <h2 className="mb-12 font-sans text-5xl font-bold text-brand-brown">Témoignages</h2>
                    <div className="relative mx-auto max-w-4xl">
                        {/* Carousel container */}
                        <div className="overflow-hidden">
                            <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                                {testimonials.map((testimonial, index) => (
                                    <div key={index} className="w-full flex-shrink-0 px-8 py-12">
                                        <p className="mb-6 text-xl text-brand-brown italic">{testimonial.quote}</p>
                                        <p className="font-sans text-2xl font-bold text-brand-brown">{testimonial.author}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Navigation arrows */}
                        <button
                            className="absolute left-[-60px] top-1/2 -translate-y-1/2 text-brand-brown bg-white rounded-full shadow-md p-4 hover:bg-brand-gold hover:text-white transition"
                            onClick={() => setCurrentSlide((prev) => Math.max(prev - 1, 0))}
                        >
                            ←
                        </button>
                        <button
                            className="absolute right-[-60px] top-1/2 -translate-y-1/2 text-brand-brown bg-white rounded-full shadow-md p-4 hover:bg-brand-gold hover:text-white transition"
                            onClick={() => setCurrentSlide((prev) => Math.min(prev + 1, testimonials.length - 1))}
                        >
                            →
                        </button>
                    </div>
                </div>
            </FadeIn>
        </Section>
    );
}
