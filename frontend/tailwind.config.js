/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: '#1B5E20',
        river: '#0288D1',
        earth: '#6D4C41',
        sky: '#81D4FA',
        leaf: '#8BC34A',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"Poppins"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
