/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue:  '#00AEEE',
          teal:  '#47BC87',
          green: '#97C93C',
          sep:   '#43BD94',
          dark:  '#1A1A1A',
          dark2: '#242424',
          dark3: '#383838',
        },
      },
      fontFamily: {
        heading: ['var(--font-sora)',    'Sora',    'sans-serif'],
        body:    ['var(--font-manrope)', 'Manrope', 'sans-serif'],
        sans:    ['var(--font-manrope)', 'Manrope', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(90deg, #00AEEE 0%, #47BC87 50.5%, #97C93C 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
