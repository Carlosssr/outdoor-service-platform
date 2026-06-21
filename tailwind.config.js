/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Deep green base, kept as the brand anchor.
        forest: {
          DEFAULT: '#1B4332',
          50: '#e8f4ee',
          100: '#c5e0d1',
          200: '#9fcbb2',
          300: '#73b28e',
          400: '#4d9e72',
          500: '#2d8a59',
          600: '#1B4332',
          700: '#163828',
          800: '#0f271c',
          900: '#08160f',
        },
        // Accent: rust / clay. (Token name kept as `harvest` so existing
        // utility classes cascade; the value is now a burnt-clay rust, not gold.)
        harvest: {
          DEFAULT: '#B5542B',
          light: '#CE7A50',
          dark: '#8A3F1E',
        },
        // Cool steel/slate neutrals for a modern, clean feel.
        charcoal: '#1E293B',
        sand: '#F5F6F4',
        steel: {
          DEFAULT: '#475569',
          light: '#94A3B8',
          dark: '#334155',
        },
      },
      fontFamily: {
        // Headers: bold condensed sans. (`serif` token repurposed so existing
        // `font-serif` header classes pick up the new display face automatically.)
        serif: ['Oswald', 'Archivo Narrow', 'system-ui', 'sans-serif'],
        display: ['Oswald', 'Archivo Narrow', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, rgba(15,39,28,0.95) 0%, rgba(27,67,50,0.85) 55%, rgba(51,65,85,0.55) 100%)',
      },
    },
  },
  plugins: [],
}
