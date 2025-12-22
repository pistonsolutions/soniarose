import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface SectionProps {
    children: ReactNode;
    className?: string;
    id?: string;
    background?: 'white' | 'cream' | 'beige' | 'navy' | 'brown' | 'gold';
}

export function Section({ children, className, id, background = 'white' }: SectionProps) {
    const bgStyles = {
        white: 'bg-white',
        cream: 'bg-brand-beige-50', // Updated Cream #EFEAE2
        beige: 'bg-brand-beige-100', // Updated Cream #EFEAE2
        navy: 'bg-brand-brown text-white', // Deprecated
        brown: 'bg-brand-brown text-white',
        gold: 'bg-brand-gold text-white',
    };

    return (
        <section
            id={id}
            className={cn(
                'py-16 lg:py-24',
                bgStyles[background],
                className
            )}
        >
            <div className="container mx-auto px-4">
                {children}
            </div>
        </section>
    );
}
