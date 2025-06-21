/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'supernova': '#FFCF00',
        'shadowforce': '#111111',
        'guardian': '#E7E7E7',
      },
      fontFamily: {
        'anton': ['Anton', 'sans-serif'],
        'jakarta': ['Plus Jakarta Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};