/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#002B49',
        'navy-deep': '#001A2E',
        'navy-light': '#003D66',
        blue: '#0072CE',
        'blue-light': '#3D9BE0',
        gold: '#C9A84C',
        'gold-light': '#E4C97A',
        'gold-dark': '#A8873A',
        cream: '#FAF9F6',
        'warm-gray': '#F5F3EF',
        'soft-gray': '#E8E6E1',
        charcoal: '#1C1C1E',
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
