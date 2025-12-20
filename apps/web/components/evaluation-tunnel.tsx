"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

// ⚠️ TODO: REPLACE WITH ACTUAL CALENDLY URL WHEN AVAILABLE
const CALENDLY_BASE_URL = "https://calendly.com/PLACEHOLDER_USER/evaluation";

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
        // Basic validation
        if (!formData.address || !formData.name || !formData.email) {
            // In a real app we'd show errors, for now just simplistic check
            return;
        }
        setStep(2);
    };

    const handleSchedule = () => {
        // Construct query params for Calendly pre-filling
        // Mapping standard fields. Custom fields (like a1, a2) might need adjustment based on specific Calendly setup
        const params = new URLSearchParams({
            name: formData.name,
            email: formData.email,
            // 'a1' is often the first custom question (Address)
            a1: formData.address,
            // 'a2' is often the second custom question (Phone)
            a2: formData.phone,
            // 'a3' or specific text area for Sale Date notes
            a3: `Délai de vente visé : ${formData.saleDate}`,
        });

        const finalUrl = `${CALENDLY_BASE_URL}?${params.toString()}`;
        window.open(finalUrl, "_blank");
    };

    return (
        <div className="w-full max-w-2xl mx-auto bg-brand-cream/50 rounded-3xl p-8 md:p-12 shadow-xl border border-brand-brown/10">
            <AnimatePresence mode="wait">
                {step === 1 ? (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-6"
                    >
                        <div className="text-center mb-8">
                            <h2 className="font-sans text-3xl md:text-4xl uppercase text-brand-brown mb-4">
                                Quelle est la valeur de ta propriété?
                            </h2>
                            <p className="text-brand-brown/80 text-lg leading-relaxed">
                                Reçois une estimation personnalisée basée sur ton adresse.<br />
                                <span className="text-base italic opacity-90">Simple, rapide, sans pression — juste une analyse partielle pour savoir où tu te situes.</span>
                            </p>
                        </div>

                        <div className="space-y-4 text-left">
                            <div className="space-y-2">
                                <Label htmlFor="address" className="text-brand-brown font-bold">Adresse civile *</Label>
                                <Input
                                    id="address"
                                    placeholder="123 rue Exemple, Ville, QC"
                                    className="bg-white border-brand-brown/20 focus:border-brand-brown h-12"
                                    value={formData.address}
                                    onChange={(e) => handleInputChange("address", e.target.value)}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-brand-brown font-bold">Nom complet *</Label>
                                    <Input
                                        id="name"
                                        placeholder="Votre nom"
                                        className="bg-white border-brand-brown/20 focus:border-brand-brown h-12"
                                        value={formData.name}
                                        onChange={(e) => handleInputChange("name", e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone" className="text-brand-brown font-bold">Téléphone</Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        placeholder="(514) 000-0000"
                                        className="bg-white border-brand-brown/20 focus:border-brand-brown h-12"
                                        value={formData.phone}
                                        onChange={(e) => handleInputChange("phone", e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-brand-brown font-bold">Courriel *</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="courriel@exemple.com"
                                    className="bg-white border-brand-brown/20 focus:border-brand-brown h-12"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange("email", e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-brand-brown font-bold">Quand souhaitez-vous vendre?</Label>
                                <div className="relative">
                                    <select
                                        className="w-full bg-white border border-brand-brown/20 focus:border-brand-brown h-12 px-3 rounded-md text-brand-brown appearance-none"
                                        value={formData.saleDate}
                                        onChange={(e) => handleInputChange("saleDate", e.target.value)}
                                    >
                                        <option value="" disabled selected>Sélectionnez une période</option>
                                        <option value="0-1 mois">Maintenant (0–1 mois)</option>
                                        <option value="1-3 mois">1–3 mois</option>
                                        <option value="3-6 mois">3–6 mois</option>
                                        <option value="6-12 mois">6–12 mois</option>
                                        <option value="12+ mois">12 mois et +</option>
                                        <option value="unsure">Je ne suis pas certain(e)</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-brand-brown">
                                        <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 flex justify-center">
                            <Button
                                onClick={handleNext}
                                disabled={!formData.address || !formData.name || !formData.email}
                                size="lg"
                                className="w-full md:w-auto px-12 py-6 text-xl shadow-lg hover:scale-105 transition-transform uppercase tracking-wider bg-brand-brown text-white"
                            >
                                SUIVANT
                            </Button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="text-center space-y-8 py-8"
                    >
                        <div className="flex justify-center mb-6">
                            <CheckCircle2 className="w-20 h-20 text-brand-brown" />
                        </div>

                        <h2 className="font-sans text-3xl md:text-4xl uppercase text-brand-brown">
                            Merci, ta demande a bien été reçue.
                        </h2>

                        <div className="space-y-4 text-lg text-brand-brown/90 leading-relaxed max-w-lg mx-auto">
                            <p>
                                Une analyse partielle de la valeur de ta propriété est en cours de préparation à partir des informations fournies.
                            </p>
                            <p className="font-medium">
                                Pour obtenir une évaluation complète, précise et personnalisée, je t’invite à planifier une rencontre selon tes disponibilités.
                            </p>
                            <p className="italic text-base opacity-80">
                                C’est gratuit et sans engagement.
                            </p>
                        </div>

                        <div className="pt-6">
                            <Button
                                onClick={handleSchedule}
                                size="lg"
                                className="w-full md:w-auto px-10 py-6 text-lg md:text-xl shadow-xl hover:scale-105 transition-transform uppercase tracking-wider bg-brand-brown text-white animate-in fade-in zoom-in duration-500 delay-200"
                            >
                                Planifie ton évaluation complète
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
