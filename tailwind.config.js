/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        champagne: '#f7e7ce',
        ivory: '#fffff0',
        obsidian: '#0a0a0f',
        midnight: '#0d0d1a',
        deep: '#050508',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"Cormorant Garamond"', 'serif'],
        sans: ['"DM Sans"', 'sans-serif'],
        accent: ['"Cinzel"', 'serif'],
      },
      animation: {
        'shimmer': 'shimmer 2.5s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'marquee': 'marquee 30s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #f59e0b, 0 0 10px #f59e0b' },
          '100%': { boxShadow: '0 0 20px #f59e0b, 0 0 40px #f59e0b, 0 0 80px #f59e0b' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #f59e0b 0%, #fcd34d 50%, #d97706 100%)',
        'dark-gradient': 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%)',
      },
    },
  },
  plugins: [],
}
