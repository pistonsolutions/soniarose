import type { Metadata } from 'next';
import { Montserrat, Lora, Playfair_Display } from 'next/font/google';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: '%s | Sonia Rose',
    default: 'Sonia Rose | Courtier Immobilier',
  },
  description: 'Sonia Rose, courtière immobilière experte sur la Rive-Sud et Montréal. Accompagnement stratégique et humain pour vendeurs et acheteurs.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${montserrat.variable} ${lora.variable} ${playfair.variable} antialiased font-serif`}>
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
  );
}
