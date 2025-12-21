"use client";


import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const CALENDLY_BASE_URL = "https://calendly.com/sonia-rose-remax-quebec/30min";

export function EvaluationTunnel() {
    const [step, setStep] = useState<1 | 2>(1);
    const [formData, setFormData] = useState({
        address: "",
        name: "",
        email: "",
        phone: "",
        saleDate: "",
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleNext = () => {
        if (!formData.address) return; // Basic validation
        setStep(2);
    };

    const handleSchedule = () => {
        const params = new URLSearchParams({
            name: formData.name,
            email: formData.email,
            a1: formData.address,
            a2: formData.phone,
            a3: `Délai de vente visé : ${formData.saleDate}`,
        });
        const finalUrl = `${CALENDLY_BASE_URL}?${params.toString()}`;
        window.open(finalUrl, "_blank");
    };

    return (
        <div className="w-full max-w-3xl mx-auto">
            {/* Main Content Area - Single Column Centered */}
            <div className="flex flex-col justify-center py-8 text-center w-full mx-auto">
                <AnimatePresence mode="wait">
                    {step === 1 ? (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-6"
                        >
                            <h1 className="font-sans text-3xl md:text-5xl uppercase text-brand-brown leading-tight">
                                QUELLE EST LA VALEUR DE TA PROPRIÉTÉ?
                            </h1>
                            <p className="text-brand-brown text-lg leading-relaxed px-4 max-w-2xl mx-auto">
                                Reçois une estimation personnalisée basée sur ton adresse.<br />
                                Simple, rapide, sans pression — juste une analyse partielle pour savoir où tu te situes réellement sur le marché.
                            </p>

                            <div className="space-y-4 max-w-md mx-auto pt-4">
                                <Input
                                    placeholder="Entrez votre adresse pour commencer"
                                    className="h-14 rounded-full border-brand-brown bg-[#EFEAE2] placeholder:text-brand-brown/50 text-center text-lg border focus-visible:ring-0 focus-visible:border-brand-brown"
                                    value={formData.address}
                                    onChange={(e) => handleInputChange("address", e.target.value)}
                                />
                                <Input
                                    placeholder="Votre nom"
                                    className="h-14 rounded-full border-brand-brown bg-[#EFEAE2] placeholder:text-brand-brown/50 text-center text-lg border focus-visible:ring-0 focus-visible:border-brand-brown"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange("name", e.target.value)}
                                />
                                <Input
                                    placeholder="Votre courriel"
                                    className="h-14 rounded-full border-brand-brown bg-[#EFEAE2] placeholder:text-brand-brown/50 text-center text-lg border focus-visible:ring-0 focus-visible:border-brand-brown"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange("email", e.target.value)}
                                />
                                <Input
                                    placeholder="Votre téléphone"
                                    className="h-14 rounded-full border-brand-brown bg-[#EFEAE2] placeholder:text-brand-brown/50 text-center text-lg border focus-visible:ring-0 focus-visible:border-brand-brown"
                                    value={formData.phone}
                                    onChange={(e) => handleInputChange("phone", e.target.value)}
                                />
                                <div className="relative">
                                    <select
                                        className="w-full h-14 rounded-full border-brand-brown bg-[#EFEAE2] text-brand-brown text-center text-lg border appearance-none px-4 cursor-pointer focus:outline-none"
                                        value={formData.saleDate}
                                        onChange={(e) => handleInputChange("saleDate", e.target.value)}
                                    >
                                        <option value="" disabled selected>– Date de la vente –</option>
                                        <option value="0-1 mois">0 – 1 mois</option>
                                        <option value="1-3 mois">1 – 3 mois</option>
                                        <option value="3-6 mois">3 – 6 mois</option>
                                        <option value="6-12 mois">6 – 12 mois</option>
                                        <option value="12+ mois">12 mois et +</option>
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-brand-brown">
                                        ▼
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6">
                                <Button
                                    onClick={handleNext}
                                    disabled={!formData.address}
                                    className="px-12 py-7 text-xl font-bold rounded-full bg-[#735e4d] text-white hover:bg-[#5d4a3c] shadow-lg uppercase tracking-widest w-auto min-w-[200px]"
                                >
                                    SUIVANT
                                </Button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-8"
                        >
                            <h1 className="font-sans text-3xl md:text-5xl uppercase text-brand-brown leading-tight mt-8">
                                MERCI TA DEMANDE A BIEN ÉTÉ REÇUE.
                            </h1>
                            <div className="text-brand-brown text-lg leading-relaxed space-y-6 max-w-2xl mx-auto">
                                <p>
                                    Une analyse partielle de la valeur de ta propriété est en cours de préparation à partir des informations fournies.
                                </p>
                                <p>
                                    Pour obtenir une évaluation complète, précise et personnalisée, je t’invite à planifier une rencontre selon tes disponibilités.
                                </p>
                                <p className="font-bold">
                                    C’est gratuit et sans engagement.
                                </p>
                            </div>

                            <div className="pt-8">
                                <Button
                                    onClick={handleSchedule}
                                    className="px-8 py-8 text-xl font-bold rounded-full bg-[#735e4d] text-white hover:bg-[#5d4a3c] shadow-lg uppercase tracking-tight leading-none h-auto w-auto max-w-xs whitespace-normal text-center"
                                >
                                    Planifie ton évaluation <br /> complète
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Step Indicators */}
                <div className="flex justify-center gap-6 mt-16">
                    <div className={`flex flex-col items-center justify-center w-28 h-24 rounded-2xl transition-all ${step === 1 ? 'bg-[#5d4a3c] text-white shadow-xl scale-105' : 'bg-white/50 text-[#5d4a3c]'}`}>
                        <span className="text-sm font-bold uppercase tracking-wider mb-1">ÉTAPE 1</span>
                        <span className="text-xs leading-tight">Analyse<br />partielle</span>
                    </div>
                    <div className={`flex flex-col items-center justify-center w-28 h-24 rounded-2xl transition-all ${step === 2 ? 'bg-[#5d4a3c] text-white shadow-xl scale-105' : 'bg-white text-[#5d4a3c] shadow-sm'}`}>
                        <span className="text-sm font-bold uppercase tracking-wider mb-1">ÉTAPE 2</span>
                        <span className="text-xs leading-tight">Évaluation<br />complète</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
