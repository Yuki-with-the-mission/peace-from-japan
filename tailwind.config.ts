import type { Config } from 'tailwindcss';

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        fact: '#0ea5e9',
        opinion: '#f97316'
      }
    }
  },
  plugins: []
} satisfies Config;
