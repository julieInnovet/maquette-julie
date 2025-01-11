/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f3f8',
          100: '#d9e1ed',
          200: '#b3c3db',
          300: '#8da5c9',
          400: '#6687b7',
          500: '#4069a5',
          600: '#1b2e4d',
          700: '#263e63',
          800: '#1a2942',
          900: '#0d1421',
        },
        turquoise: {
          50: '#f0fdfb',
          100: '#ccfbf5',
          200: '#99f6ea',
          300: '#66f1df',
          400: '#33ecd4',
          500: '#61beae',
          600: '#00b9a1',
          700: '#008b79',
          800: '#005c50',
          900: '#002e28',
        },
      },
    },
  },
  plugins: [],
};