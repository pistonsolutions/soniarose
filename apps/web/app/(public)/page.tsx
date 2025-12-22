import { Metadata } from 'next';
import HomeClient from '@/components/public/home-client';

export const metadata: Metadata = {
    title: 'Sonia Rose | Courtier Immobilier Rive-Sud & Montréal',
    description: "Courtière immobilière d'expérience sur la Rive-Sud et Montréal. Achat, vente, investissement : une approche humaine, transparente et stratégique pour vos projets.",
};

export default function HomePage() {
    return <HomeClient />;
}
