import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        coral:         '#FD6C4F',
        durazno:       '#F9DBAE',
        teal:          '#6CD7BF',
        rosa:          '#FEABAB',
        'coral-hover': '#E8522E',
        'coral-light': '#FEF0EC',
        'teal-dark':   '#3BA897',
        'rosa-dark':   '#C97070',
        'bg-alt':      '#F5F4F1',
        'border-base': '#E8E6E1',
        'text-muted':  '#888580',
        'text-base':   '#1A1A18',
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body:    ['var(--font-body)', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['72px', { lineHeight: '1.1',  letterSpacing: '-0.02em' }],
        'display-lg': ['48px', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'display-md': ['32px', { lineHeight: '1.2',  letterSpacing: '-0.01em' }],
      },
      maxWidth: {
        container: '1200px',
        prose:     '680px',
      },
    },
  },
  plugins: [],
};
export default config;
