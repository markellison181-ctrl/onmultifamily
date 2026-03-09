/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Colliers Primary Colors
        'colliers-blue-dark': '#002B49',
        'colliers-blue': '#0072CE',
        'colliers-gold': '#C9A84C',
        
        // Colliers Secondary Colors
        'colliers-gray-80': '#4B4B4B',
        'colliers-gray-40': '#AAAAAA',
        'colliers-gray-10': '#E6E6E6',
        'colliers-light-blue': '#6CBFE6',
        'colliers-pale-blue': '#DFEFF9',
        'colliers-red': '#B32317',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui'],
        serif: ['var(--font-playfair)', 'ui-serif', 'Georgia'],
      },
      fontSize: {
        'display': ['8rem', { lineHeight: '0.9' }],
        'hero': ['6rem', { lineHeight: '0.95' }],
      },
      spacing: {
        '18': '4.5rem',
        '28': '7rem',
        '32': '8rem',
        '36': '9rem',
        '40': '10rem',
        '44': '11rem',
        '48': '12rem',
        '52': '13rem',
        '56': '14rem',
        '64': '16rem',
        '72': '18rem',
        '80': '20rem',
        '96': '24rem',
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out',
        'fade-in-slow': 'fadeIn 1.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(2rem)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}