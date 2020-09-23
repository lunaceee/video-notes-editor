const autoprefixer = require('autoprefixer');
const tailwindcss = require('tailwindcss');
const presetEnv = require('postcss-preset-env');

module.exports = {
  plugins: [
    tailwindcss,
    autoprefixer,
    presetEnv,
  ],
};