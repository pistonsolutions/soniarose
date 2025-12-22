import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-white via-slate-50 to-brand-beige-50 p-4">
      {/* Subtle background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/4 top-0 h-96 w-96 animate-pulse rounded-full bg-brand-gold/5 blur-3xl" />
        <div className="absolute -right-1/4 top-1/3 h-96 w-96 animate-pulse rounded-full bg-blue-400/5 blur-3xl delay-700" />
        <div className="absolute bottom-0 left-1/3 h-96 w-96 animate-pulse rounded-full bg-slate-300/10 blur-3xl delay-1000" />
      </div>

      {/* Sign-in card */}
      <div className="relative z-10">
        <SignIn
          appearance={{
            elements: {
              rootBox: 'mx-auto',
              card: 'bg-white shadow-2xl border border-slate-200 rounded-2xl',
              headerTitle: 'font-sans text-brand-brown text-2xl',
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
          routing="path"
          path="/sign-in"
          signUpUrl="/sign-up"
        />
      </div>
    </div>
  );
}
