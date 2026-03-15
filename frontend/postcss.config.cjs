const tailwindcss = require('tailwindcss');
const tailwindPostcss = require('@tailwindcss/postcss');

module.exports = {
  plugins: [tailwindPostcss(tailwindcss), require('autoprefixer')],
};
