'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronDown, MapPin, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function EvaluationSection() {
    const [step, setStep] = useState<1 | 2 | 3 | 'success'>(1);
    const [address, setAddress] = useState('');

    const nextStep = () => {
        if (step === 1 && !address) return; // Basic validation
        if (step === 3) {
            setStep('success');
        } else if (typeof step === 'number') {
            setStep((step + 1) as 1 | 2 | 3);
        }
    };

    const prevStep = () => {
        if (step === 'success') {
            setStep(1);
            setAddress('');
        } else if (step > 1) {
            setStep((step - 1) as 1 | 2 | 3);
        }
    };

    return (
        <section className="bg-[#EBE5E0]">
            <div className="grid lg:grid-cols-2">
                {/* Left Side - Image */}
                <div className="relative min-h-[500px] lg:min-h-full">
                    <Image
                        src="/blog-card-1.jpg" // Placeholder
                        alt="Cuisine moderne"
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Right Side - Content */}
                <div className="flex flex-col justify-center p-8 py-20 lg:p-20">
                    <div className="mx-auto max-w-md text-center w-full">
                        <h2 className="mb-4 font-serif text-3xl font-normal text-[#734838] md:text-4xl lg:text-5xl leading-tight">
                            QUELLE EST LA VALEUR DE VOTRE PROPRIÉTÉ?
                        </h2>

                        <AnimatePresence mode="wait">
                            {step !== 'success' ? (
                                <motion.div
                                    key="form"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <p className="mb-2 text-[#734838]/80">
                                        {step === 1 && "Commençons par localiser votre propriété."}
                                        {step === 2 && "Dites-nous en un peu plus sur votre propriété."}
                                        {step === 3 && "Merci! Votre propriété a été localisée."}
                                    </p>
                                    <p className="mb-8 text-[#734838]/80">
                                        {step === 1 && "Entrez votre adresse pour débuter l'évaluation."}
                                        {step === 2 && "Ces détails nous aideront à préciser l'estimation."}
                                        {step === 3 && "Où souhaitez-vous recevoir votre analyse personnalisée ?"}
                                    </p>

                                    <div className="mb-8 min-h-[300px] flex flex-col justify-center">
                                        <AnimatePresence mode="wait">
                                            {/* STEP 1: ADDRESS */}
                                            {step === 1 && (
                                                <motion.div
                                                    key="step1"
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -20 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="space-y-4"
                                                >
                                                    <div className="relative">
                                                        <Input
                                                            placeholder="Entrez votre adresse complète"
                                                            value={address}
                                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
                                                            className="rounded-full border-[#734838]/30 bg-transparent px-6 py-6 pl-12 text-[#734838] placeholder:text-[#734838]/50 focus-visible:ring-[#734838]"
                                                        />
                                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#734838]/50" size={20} />
                                                    </div>
                                                    <div className="h-48 w-full overflow-hidden rounded-xl border-2 border-white/50 bg-slate-200 relative">
                                                        {/* Fake Map UI */}
                                                        <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=Montreal&zoom=12&size=600x300&sensor=false&key=YOUR_API_KEY')] bg-cover bg-center opacity-50 grayscale" style={{ backgroundImage: 'url(/map-placeholder.png)' }}></div>
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <div className="bg-[#734838]/10 p-4 rounded-full animate-pulse">
                                                                <MapPin className="text-[#734838]" size={32} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}

                                            {/* STEP 2: DETAILS */}
                                            {step === 2 && (
                                                <motion.div
                                                    key="step2"
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -20 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="space-y-3"
                                                >
                                                    <div className="relative">
                                                        <select
                                                            className="w-full appearance-none rounded-full border border-[#734838]/30 bg-transparent px-6 py-3.5 text-[#734838] focus:outline-none focus:ring-2 focus:ring-[#734838]"
                                                            defaultValue=""
                                                        >
                                                            <option value="" disabled>- Type de propriété -</option>
                                                            <option value="maison">Maison unifamiliale</option>
                                                            <option value="condo">Condo / Loft</option>
                                                            <option value="plex">Multiplex</option>
                                                            <option value="terrain">Terrain</option>
                                                        </select>
                                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#734838] pointer-events-none" size={16} />
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-3">
                                                        <Input placeholder="Chambres" type="number" className="rounded-full border-[#734838]/30 bg-transparent px-6 py-6 text-[#734838] placeholder:text-[#734838]/50 focus-visible:ring-[#734838]" />
                                                        <Input placeholder="Salles de bain" type="number" className="rounded-full border-[#734838]/30 bg-transparent px-6 py-6 text-[#734838] placeholder:text-[#734838]/50 focus-visible:ring-[#734838]" />
                                                    </div>
                                                    <Input placeholder="Année de construction" type="number" className="rounded-full border-[#734838]/30 bg-transparent px-6 py-6 text-[#734838] placeholder:text-[#734838]/50 focus-visible:ring-[#734838]" />
                                                    <Input placeholder="Superficie habitable (pi²)" type="number" className="rounded-full border-[#734838]/30 bg-transparent px-6 py-6 text-[#734838] placeholder:text-[#734838]/50 focus-visible:ring-[#734838]" />
                                                </motion.div>
                                            )}

                                            {/* STEP 3: CONTACT */}
                                            {step === 3 && (
                                                <motion.div
                                                    key="step3"
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -20 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="flex items-center justify-center gap-4"
                                                >
                                                    {/* Map Preview (Small) */}
                                                    <div className="relative h-32 w-32 overflow-hidden rounded-lg border-2 border-white shadow-md bg-slate-200 shrink-0">
                                                        <div className="absolute inset-0 bg-slate-300 flex items-center justify-center">
                                                            <MapPin className="text-[#734838]" size={24} />
                                                        </div>
                                                        {/* Overlay address if needed */}
                                                    </div>

                                                    {/* Form Fields */}
                                                    <div className="flex-1 space-y-3">
                                                        <Input
                                                            placeholder="Votre nom"
                                                            className="rounded-full border-[#734838]/30 bg-transparent px-6 py-6 text-[#734838] placeholder:text-[#734838]/50 focus-visible:ring-[#734838]"
                                                        />
                                                        <Input
                                                            placeholder="Votre courriel"
                                                            className="rounded-full border-[#734838]/30 bg-transparent px-6 py-6 text-[#734838] placeholder:text-[#734838]/50 focus-visible:ring-[#734838]"
                                                        />
                                                        <Input
                                                            placeholder="Votre téléphone"
                                                            className="rounded-full border-[#734838]/30 bg-transparent px-6 py-6 text-[#734838] placeholder:text-[#734838]/50 focus-visible:ring-[#734838]"
                                                        />
                                                        <div className="relative">
                                                            <select
                                                                className="w-full appearance-none rounded-full border border-[#734838]/30 bg-transparent px-6 py-3.5 text-[#734838] focus:outline-none focus:ring-2 focus:ring-[#734838]"
                                                                defaultValue=""
                                                            >
                                                                <option value="" disabled>
                                                                    - Date de la vente -
                                                                </option>
                                                                <option value="asap">Dès que possible</option>
                                                                <option value="3months">Dans 3 mois</option>
                                                                <option value="6months">Dans 6 mois</option>
                                                                <option value="1year">Dans 1 an</option>
                                                            </select>
                                                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#734838] pointer-events-none" size={16} />
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {/* Steps Indicator */}
                                    <div className="mb-8 flex justify-center gap-4">
                                        <div className={`flex h-24 w-24 flex-col items-center justify-center rounded-full p-2 text-center shadow-sm transition-colors ${step === 1 ? 'bg-[#99857A]' : 'bg-[#F4F1EE]'}`}>
                                            <span className="font-serif text-lg font-bold text-[#734838]">ÉTAPE 1</span>
                                            <span className="text-xs leading-tight text-[#734838]/80">Adresse de la propriété</span>
                                        </div>
                                        <div className={`flex h-24 w-24 flex-col items-center justify-center rounded-full p-2 text-center shadow-sm transition-colors ${step === 2 ? 'bg-[#99857A]' : 'bg-[#F4F1EE]'}`}>
                                            <span className="font-serif text-lg font-bold text-[#734838]">ÉTAPE 2</span>
                                            <span className="text-xs leading-tight text-[#734838]/80">Détails de la propriété</span>
                                        </div>
                                        <div className={`flex h-24 w-24 flex-col items-center justify-center rounded-full p-2 text-center shadow-sm transition-colors ${step === 3 ? 'bg-[#99857A]' : 'bg-[#F4F1EE]'}`}>
                                            <span className="font-serif text-lg font-bold text-[#734838]">ÉTAPE 3</span>
                                            <span className="text-xs leading-tight text-[#734838]/80">Évaluation gratuite</span>
                                        </div>
                                    </div>

                                    {/* Navigation Buttons */}
                                    <div className="flex gap-4">
                                        {step > 1 && (
                                            <Button
                                                className="flex-1 bg-[#734838] py-6 text-lg hover:bg-[#5e3a2d]"
                                                onClick={prevStep}
                                            >
                                                PRÉCÉDENT
                                            </Button>
                                        )}
                                        <Button
                                            className="flex-1 bg-[#734838] py-6 text-lg hover:bg-[#5e3a2d]"
                                            onClick={nextStep}
                                        >
                                            {step === 3 ? 'TERMINER' : 'SUIVANT'}
                                        </Button>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <p className="mb-2 text-[#734838]/80">
                                        Merci! Votre demande a bien été envoyée.
                                    </p>
                                    <p className="mb-12 text-[#734838]/80">
                                        Je vous contacterai dans les meilleurs délais pour vous présenter une analyse complète, réaliste et personnalisée de la valeur de votre propriété.
                                    </p>

                                    <Button
                                        variant="outline"
                                        className="mb-16 w-full rounded-full border-[#734838] py-6 text-lg text-[#734838] hover:bg-[#734838] hover:text-white"
                                        onClick={() => setStep(1)}
                                    >
                                        RETOURNER AU SITE
                                    </Button>

                                    {/* Steps Indicator (Faded/Static) */}
                                    <div className="flex justify-center gap-4 opacity-80">
                                        <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-[#F4F1EE] p-2 text-center shadow-sm">
                                            <span className="font-serif text-lg font-bold text-[#734838]">ÉTAPE 1</span>
                                            <span className="text-xs leading-tight text-[#734838]/80">Adresse de la propriété</span>
                                        </div>
                                        <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-[#F4F1EE] p-2 text-center shadow-sm">
                                            <span className="font-serif text-lg font-bold text-[#734838]">ÉTAPE 2</span>
                                            <span className="text-xs leading-tight text-[#734838]/80">Détails de la propriété</span>
                                        </div>
                                        <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-[#99857A] p-2 text-center shadow-sm">
                                            <span className="font-serif text-lg font-bold text-[#734838]">ÉTAPE 3</span>
                                            <span className="text-xs leading-tight text-[#734838]/80">Évaluation gratuite</span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
