import type { Metadata } from 'next';
import { Montserrat, Lato } from 'next/font/google';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

const lato = Lato({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  variable: '--font-lato',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SoniaRose CRM',
  description: 'Operational console for SoniaRose relationship workflows.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="fr" suppressHydrationWarning>
        <body className={`${montserrat.variable} ${lato.variable} antialiased font-sans`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
