/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
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
        harvest: {
          DEFAULT: '#C5A059',
          light: '#d4b47a',
          dark: '#a8862f',
        },
        charcoal: '#212529',
        sand: '#F4F1EA',
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, rgba(27,67,50,0.92) 0%, rgba(27,67,50,0.70) 60%, rgba(197,160,89,0.30) 100%)',
      },
    },
  },
  plugins: [],
}
