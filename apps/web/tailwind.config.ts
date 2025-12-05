import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  darkMode: 'class',
  content: ['app/**/*.{ts,tsx}', 'components/**/*.{ts,tsx}', '../../packages/lib/src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-lato)', ...defaultTheme.fontFamily.sans],
        serif: ['var(--font-playfair)', ...defaultTheme.fontFamily.serif],
      },
      colors: {
        brand: {
          navy: '#0f172a', // Deep Navy
          gold: '#c5a059', // Gold/Bronze
          cream: '#F9F9F7', // Warm Cream
          beige: '#F2F0E9', // Warm Beige
        },
      },
    },
  },
  plugins: [],
};

export default config;
