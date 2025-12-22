'use client';

import { useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { SignIn } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import { Building2, Home, Key } from 'lucide-react';

export default function LandingPage() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push('/crm/dashboard');
    }
  }, [isLoaded, isSignedIn, router]);

  // Show nothing while checking auth state
  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-brand-gold border-t-transparent" />
      </div>
    );
  }

  // Don't render landing page for authenticated users
  if (isSignedIn) {
    return null;
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-white via-slate-50 to-brand-cream p-4 lg:p-8">
      {/* Real estate themed background pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        {/* Grid pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(#c5a059 1px, transparent 1px), linear-gradient(90deg, #c5a059 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />

        {/* Building icons scattered */}
        <div className="absolute left-[10%] top-[20%] text-brand-gold/20">
          <Building2 size={120} />
        </div>
        <div className="absolute right-[15%] top-[60%] text-brand-gold/20">
          <Home size={100} />
        </div>
        <div className="absolute left-[70%] top-[30%] text-brand-gold/20">
          <Key size={80} />
        </div>
      </div>

      {/* Subtle gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/4 top-0 h-96 w-96 animate-pulse rounded-full bg-brand-gold/5 blur-3xl" />
        <div className="absolute -right-1/4 top-1/3 h-96 w-96 animate-pulse rounded-full bg-blue-400/5 blur-3xl delay-700" />
        <div className="absolute bottom-0 left-1/3 h-96 w-96 animate-pulse rounded-full bg-slate-300/10 blur-3xl delay-1000" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex w-full max-w-7xl flex-col items-center gap-12 lg:flex-row lg:items-center lg:justify-between">
        {/* Left side: Logo and Branding */}
        <div className="flex flex-1 flex-col items-center space-y-8 lg:items-start">
          {/* Large Logo with entrance animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.23, 1, 0.32, 1],
              delay: 0.1,
            }}
            className="relative"
          >
            <div className="relative h-48 w-48 rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-slate-200 lg:h-56 lg:w-56">
              <img
                src="/sonia-rose-logo.png"
                alt="Sonia Rose CRM Logo"
                className="object-contain w-full h-full"
              />
            </div>
          </motion.div>

          {/* Title with staggered animation */}
          <div className="flex flex-col items-center space-y-3 lg:items-start">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.3,
              }}
              className="text-center font-serif text-6xl font-bold text-brand-navy lg:text-left lg:text-7xl"
            >
              Sonia Rose CRM
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.5,
              }}
              className="max-w-2xl text-center text-xl text-slate-600 lg:text-left"
            >
              CRM platform for real estate professionals. Streamline your workflow, manage relationships, and close more deals.
            </motion.p>

            {/* Decorative gold line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{
                duration: 0.8,
                delay: 0.7,
              }}
              className="h-1 max-w-md bg-gradient-to-r from-brand-gold via-brand-gold/50 to-transparent"
            />
          </div>
        </div>

        {/* Right side: Sign-in form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.6,
          }}
          className="w-full max-w-md lg:flex-shrink-0"
        >
          <SignIn
            appearance={{
              elements: {
                rootBox: 'w-full',
                card: 'bg-white shadow-2xl border border-slate-200 rounded-2xl',
                headerTitle: 'font-serif text-brand-navy text-2xl',
                headerSubtitle: 'text-slate-500',
                socialButtonsBlockButton: 'border-2 border-slate-200 hover:border-brand-gold hover:bg-brand-gold/5 transition-all',
                socialButtonsBlockButtonText: 'text-slate-700 font-medium',
                formButtonPrimary: 'bg-brand-gold hover:bg-brand-gold/90 text-white font-semibold shadow-lg shadow-brand-gold/30 transition-all',
                formFieldInput: 'border-2 border-slate-200 bg-white focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20',
                formFieldLabel: 'text-slate-700 font-medium',
                footerActionLink: 'text-brand-gold hover:text-brand-gold/80 font-semibold transition-colors',
                identityPreviewText: 'text-slate-700',
                identityPreviewEditButton: 'text-brand-gold hover:text-brand-gold/80',
                formFieldInputShowPasswordButton: 'text-slate-500 hover:text-brand-gold',
                otpCodeFieldInput: 'border-2 border-slate-200 focus:border-brand-gold',
                formResendCodeLink: 'text-brand-gold hover:text-brand-gold/80',
                dividerLine: 'bg-slate-200',
                dividerText: 'text-slate-400',
                footer: 'bg-slate-50 rounded-b-2xl',
              },
              layout: {
                socialButtonsPlacement: 'top',
                socialButtonsVariant: 'blockButton',
              },
            }}
            routing="hash"
            afterSignInUrl="/crm/dashboard"
            afterSignUpUrl="/crm/dashboard"
          />
        </motion.div>
      </div>

      {/* Footer note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        className="absolute bottom-8 text-center text-sm text-slate-500"
      >
        <p>© {new Date().getFullYear()} Sonia Rose. All rights reserved.</p>
      </motion.div>
    </div>
  );
}
