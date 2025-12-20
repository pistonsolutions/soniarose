import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/ui/section';
import { ArrowRight, Star, Instagram, Facebook, Linkedin, Youtube } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sonia Rose – Courtière Immobilière Rive-Sud | Achat, Vente & Évaluation Gratuite',
  description: 'Sonia Rose, courtière immobilière Rive-Sud depuis 20 ans. Vente, achat, investissement, évaluation gratuite. Une approche humaine, stratégique et transparente.',
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Sonia Rose - Courtière immobilière',
            url: 'https://soniarose.ca',
            potentialAction: {
              '@type': 'SearchAction',
              target: 'https://soniarose.ca/recherche?query={search_term_string}',
              'query-input': 'required name=search_term_string',
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Accueil',
            url: 'https://soniarose.ca',
            description:
              'Sonia Rose, courtière immobilière sur la Rive-Sud de Montréal. Approche humaine, stratégique et moderne pour vendre ou acheter une propriété en toute confiance.',
            publisher: {
              '@type': 'Organization',
              name: 'Sonia Rose Immobilier',
              logo: {
                '@type': 'ImageObject',
                url: 'https://soniarose.ca/assets/logo-sonia-rose-new.png',
              },
            },
          }),
        }}
      />

      {/* SECTION 1 — HERO */}
      <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-slate-50">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-bg-placeholder.jpg" // Replace with actual image
            alt="Intérieur lumineux moderne – Sonia Rose courtière immobilière Rive-Sud"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-white/80" />
        </div>

        <div className="container relative z-10 mx-auto px-4 text-center">
          <h1 className="mb-6 font-sans text-4xl font-bold text-brand-brown md:text-6xl lg:text-7xl">
            Courtier Immobilier Rive-Sud <br />
            <span className="text-brand-gold">Sonia Rose</span> | Achat & Vente
          </h1>
          <h2 className="mb-8 text-xl font-medium text-slate-600 md:text-2xl">
            Parce que l’immobilier, c’est plus qu’une simple transaction.
          </h2>
          <p className="mx-auto mb-10 max-w-3xl text-lg text-slate-600 md:text-xl">
            C’est une étape de vie qui mérite réflexion, stratégie et une approche profondément humaine, alignée sur vos besoins réels.
            Sonia Rose, courtière immobilière sur la Rive-Sud et dans le Grand Montréal, vous accompagne à chaque étape — vendre, acheter, investir — avec transparence, sensibilité et rigueur.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" variant="gold" className="min-w-[200px] text-lg">
              <Link href="https://tally.so/r/mZK1pz" target="_blank">
                Fais le test
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="min-w-[200px] text-lg">
              <Link href="https://tally.so/r/QKKpvG" target="_blank">
                Découvre les vérités cachées
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 2 — QUI EST SONIA ROSE ? */}
      <Section background="white">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative h-[500px] overflow-hidden rounded-2xl bg-slate-100">
            {/* Placeholder for Sonia's portrait */}
            <div className="flex h-full w-full items-center justify-center text-slate-400">
              Portrait de Sonia Rose
            </div>
            {/* Uncomment when image is available
            <Image
              src="/sonia-portrait.jpg"
              alt="Portrait professionnel de Sonia Rose courtière immobilière"
              fill
              className="object-cover"
            />
            */}
          </div>
          <div>
            <h2 className="mb-6 font-sans text-4xl font-bold text-brand-brown">Qui est Sonia Rose ?</h2>
            <div className="space-y-6 text-lg text-slate-600">
              <p>
                Courtière immobilière depuis plus de 20 ans, Sonia Rose accompagne vendeurs, acheteurs et investisseurs avec une approche humaine, authentique et profondément stratégique.
              </p>
              <p>
                Reconnue pour sa transparence, son écoute et sa sensibilité, elle guide chaque client vers les bonnes décisions — au bon moment.
              </p>
            </div>
            <div className="mt-8">
              <Button asChild variant="link" className="text-lg text-brand-gold p-0 h-auto font-sans italic">
                <Link href="/a-propos">Découvrir mon histoire <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* SECTION 3 — AVEC SONIA ROSE (3 blocs) */}
      <Section background="cream">
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-sans text-4xl font-bold text-brand-brown">Avec Sonia Rose</h2>
          <p className="text-xl text-slate-600">Vendre. Acheter. Évaluer. Tout commence ici.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Bloc 1 */}
          <Link href="/proprietes" className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-transform hover:-translate-y-1">
            <div className="aspect-[4/3] bg-slate-200 relative">
              {/* Image placeholder */}
            </div>
            <div className="p-6">
              <h3 className="mb-2 font-sans text-2xl font-bold text-brand-brown group-hover:text-brand-gold">Mes Propriétés</h3>
              <p className="text-slate-600">Découvrez les propriétés disponibles sur la Rive-Sud.</p>
            </div>
          </Link>

          {/* Bloc 2 */}
          <Link href="https://tally.so/r/QKKpvG" target="_blank" className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-transform hover:-translate-y-1">
            <div className="aspect-[4/3] bg-slate-200 relative">
              {/* Image placeholder */}
            </div>
            <div className="p-6">
              <h3 className="mb-2 font-sans text-2xl font-bold text-brand-brown group-hover:text-brand-gold">Évaluation Gratuite</h3>
              <p className="text-slate-600">Estimez ce que votre propriété vaut vraiment.</p>
            </div>
          </Link>

          {/* Bloc 3 */}
          <Link href="/acheteurs" className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-transform hover:-translate-y-1">
            <div className="aspect-[4/3] bg-slate-200 relative">
              {/* Image placeholder */}
            </div>
            <div className="p-6">
              <h3 className="mb-2 font-sans text-2xl font-bold text-brand-brown group-hover:text-brand-gold">Achetez avec moi</h3>
              <p className="text-slate-600">Un accompagnement humain pour votre projet d'achat.</p>
            </div>
          </Link>
        </div>
      </Section>

      {/* SECTION 4 — TRAVAILLER AVEC MOI */}
      <Section background="brown">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="order-2 lg:order-1">
            <h2 className="mb-6 font-sans text-4xl font-bold text-white">Travailler avec moi</h2>
            <div className="space-y-6 text-lg text-slate-300">
              <p>
                Avec moi, vous obtenez bien plus qu’une courtière immobilière. Vous bénéficiez de plus de 20 ans d’expérience, de stratégie, de négociation et surtout d’écoute.
              </p>
              <p>
                Je cible vite ce qui est le mieux pour vous, je vous représente avec rigueur et transparence, et je m’occupe de tout du début à la fin.
              </p>
              <p>
                Parce que pour moi, une transaction n’est jamais “juste une transaction”. C’est votre histoire. C’est votre vie. Chaque projet mérite une réflexion juste, humaine et rentable.
              </p>
            </div>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg" variant="gold">
                <Link href="https://tally.so/r/QKKpvG" target="_blank">Évaluation gratuite</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white bg-transparent text-white hover:bg-white hover:text-brand-brown">
                <Link href="/contact">Parler à Sonia</Link>
              </Button>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="aspect-square rounded-2xl bg-white/10 p-8">
              {/* Decorative element or another image */}
              <div className="h-full w-full border border-white/20 rounded-xl flex items-center justify-center text-white/40">
                Image / Illustration
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* SECTION 5 — TÉMOIGNAGES */}
      <Section background="white">
        <div className="text-center">
          <h2 className="mb-12 font-sans text-4xl font-bold text-brand-brown">Témoignages</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Testimonial placeholders */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-xl bg-slate-50 p-8 shadow-sm">
                <div className="mb-4 flex justify-center text-brand-gold">
                  {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
                </div>
                <p className="mb-6 text-slate-600 italic">"Une expérience incroyable avec Sonia. Elle a su nous écouter et nous guider avec une patience exemplaire."</p>
                <p className="font-bold text-brand-brown">- Client Satisfait</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* SECTION 6 — MÉDIAS SOCIAUX */}
      <Section background="cream">
        <div className="text-center">
          <h2 className="mb-4 font-sans text-4xl font-bold text-brand-brown">Médias sociaux</h2>
          <p className="mb-12 text-xl text-slate-600">Suivez-moi sur mes réseaux</p>

          <div className="flex justify-center gap-6">
            <Link href="https://www.tiktok.com/@soniarose.remax" target="_blank" className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md transition-transform hover:scale-110 hover:text-brand-gold">
              <span className="font-bold">TT</span>
            </Link>
            <Link href="https://www.instagram.com/soniarose.remax" target="_blank" className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md transition-transform hover:scale-110 hover:text-brand-gold">
              <Instagram size={32} />
            </Link>
            <Link href="https://www.facebook.com/SoniaRoseImmobilier/" target="_blank" className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md transition-transform hover:scale-110 hover:text-brand-gold">
              <Facebook size={32} />
            </Link>
            <Link href="https://www.youtube.com/@rosesonia662" target="_blank" className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md transition-transform hover:scale-110 hover:text-brand-gold">
              <Youtube size={32} />
            </Link>
            <Link href="https://www.linkedin.com/in/sonia-rose-969025127" target="_blank" className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md transition-transform hover:scale-110 hover:text-brand-gold">
              <Linkedin size={32} />
            </Link>
          </div>
        </div>
      </Section>

      {/* SECTION 7 — MESSAGE FINAL */}
      <Section background="white">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-8 font-sans text-3xl font-bold text-brand-brown md:text-4xl">
            Votre projet immobilier mérite une expérience douce, respectueuse et en confiance.
          </h2>
          <p className="mb-10 text-xl text-slate-600">
            Qu’il s’agisse d’acheter, vendre ou investir, je vous accompagne avec humanité, écoute et stratégie. Ma priorité est de comprendre ce que vous vivez maintenant, vos besoins réels et de vous proposer une stratégie qui est alignée avec votre vie.
            Je suis là pour vous du début à la fin.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" variant="gold" className="min-w-[200px]">
              <Link href="/acheteurs">Achetez avec moi</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="min-w-[200px]">
              <Link href="/vendeurs">Vendez avec moi</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
