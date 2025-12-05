'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';

export function PublicFooter() {
    // LOGO CONTROLS (FOOTER)
    // Sonia Rose Logo
    const soniaLogoX = '0%'; // 0% = Left, 50% = Center, 100% = Right
    const soniaLogoY = '50%'; // 0% = Top, 50% = Center, 100% = Bottom
    const soniaLogoZoom = 1.3; // 1 = 100%, 1.2 = 120%

    // RE/MAX Logo
    const remaxLogoX = '-60%';
    const remaxLogoY = '50%';
    const remaxLogoZoom = 2.75;

    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-white border-t border-slate-100 pt-16 pb-8">
            <div className="container mx-auto px-8">

                {/* 1. LOGO ROW */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-4">
                    {/* SONIA ROSE LOGO */}
                    <div className="relative w-64 h-16">
                        <Image
                            src="/images/sonia-rose-logo.png"
                            alt="Sonia Rose Courtier Immobilière"
                            fill
                            className="object-contain"
                            style={{
                                objectPosition: `${soniaLogoX} ${soniaLogoY}`,
                                transform: `scale(${soniaLogoZoom})`
                            }}
                        />
                    </div>

                    {/* REMAX LOGO */}
                    <div className="relative w-32 h-12">
                        <Image
                            src="/images/remax-logo.png"
                            alt="Remax Imagine & Privilège"
                            fill
                            className="object-contain"
                            style={{
                                objectPosition: `${remaxLogoX} ${remaxLogoY}`,
                                transform: `scale(${remaxLogoZoom})`
                            }}
                        />
                    </div>
                </div>

                {/* Disclaimer Text */}
                <p className="text-sm text-slate-400 mb-12 font-light">
                    Agence immobilière - Franchisé indépendant et autonome de Re/max Québec
                </p>

                {/* 2. INFO COLUMNS & SOCIALS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-slate-200 pb-12">

                    {/* COLUMN 1: SONIA INFO */}
                    <div className="space-y-4">
                        <h3 className="font-serif text-sm uppercase tracking-[0.2em] text-slate-400">
                            Sonia Rose
                        </h3>
                        <div className="space-y-1">
                            <p className="text-xl font-light text-slate-600">514 250-9297</p>
                            <a
                                href="mailto:sonia.rose@remax-quebec.com"
                                className="text-sm font-light text-slate-400 hover:text-brand-gold uppercase tracking-wide transition-colors"
                            >
                                sonia.rose@remax-quebec.com
                            </a>
                        </div>
                    </div>

                    {/* COLUMN 2: ADDRESS */}
                    <div className="space-y-4">
                        <h3 className="font-serif text-sm uppercase tracking-[0.2em] text-slate-400">
                            Adresse
                        </h3>
                        <div className="space-y-1 text-sm font-light text-slate-400 uppercase tracking-wide">
                            <p>61 Rue Saint-Charles O.</p>
                            <p>Longueuil, QC</p>
                            <p>J4H 1C5</p>
                        </div>
                    </div>

                    {/* COLUMN 3: SOCIAL ICONS (Aligned Right) */}
                    <div className="flex items-end md:justify-end gap-4">
                        {/* Instagram */}
                        <Link href="https://www.instagram.com/soniarose.remax" target="_blank">
                            <div className="rounded-lg p-1 transition-transform hover:-translate-y-1">
                                <Instagram size={32} className="text-[#E1306C]" />
                            </div>
                        </Link>

                        {/* Facebook */}
                        <Link href="https://www.facebook.com/SoniaRoseImmobilier/" target="_blank">
                            <div className="rounded-lg p-1 transition-transform hover:-translate-y-1">
                                <Facebook size={32} className="text-[#1877F2] fill-current" />
                            </div>
                        </Link>

                        {/* TikTok */}
                        <Link href="https://www.tiktok.com/@soniarose.remax" target="_blank">
                            <div className="rounded-lg p-1 transition-transform hover:-translate-y-1">
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-black">
                                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                                </svg>
                            </div>
                        </Link>

                        {/* LinkedIn */}
                        <Link href="https://www.linkedin.com/in/sonia-rose-969025127" target="_blank">
                            <div className="rounded-lg p-1 transition-transform hover:-translate-y-1">
                                <Linkedin size={32} className="text-[#0A66C2] fill-current" />
                            </div>
                        </Link>
                    </div>
                </div>

                {/* 3. COPYRIGHT */}
                <div className="pt-8 text-xs text-slate-300">
                    Copyright © {currentYear} Sonia Rose. Tous droits réservés.
                </div>
            </div>
        </footer>
    );
}
