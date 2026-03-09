/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#002B49',
        'navy-light': '#003D66',
        blue: '#0072CE',
        gold: '#C9A84C',
        cream: '#FAF9F6',
        'warm-gray': '#F5F3EF',
        'soft-gray': '#E8E6E1',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      letterSpacing: {
        'wide-custom': '0.12em',
      },
    },
  },
  plugins: [],
}
