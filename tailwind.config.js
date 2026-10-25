/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#00483C',
          50: '#E6F2EF',
          100: '#CCE6E0',
          200: '#99CDBF',
          300: '#66B5A0',
          400: '#339C80',
          500: '#00483C',
          600: '#003A30',
          700: '#002B24',
          800: '#001D18',
          900: '#000F0C',
        },
        lime: {
          DEFAULT: '#E5FD4F',
          50: '#FAFFE8',
          100: '#F4FFCC',
          200: '#EEFEB0',
          300: '#E8FD93',
          400: '#E5FD4F',
          500: '#CCDF2F',
          600: '#B3C020',
          700: '#99A316',
          800: '#80850F',
          900: '#666809',
        },
        ink: '#000000',
        paper: '#FFFFFF',
      },
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', '"DM Sans"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.02em',
        wide: '0.08em',
        wider: '0.18em',
        widest: '0.32em',
      },
      fontSize: {
        hero: ['clamp(2.75rem, 9vw, 8.5rem)', { lineHeight: '0.9', letterSpacing: '-0.04em' }],
        display: ['clamp(2.25rem, 6vw, 5rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        section: ['clamp(1.75rem, 4.5vw, 3.5rem)', { lineHeight: '1.0', letterSpacing: '-0.02em' }],
      },
      maxWidth: {
        edge: '84rem',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in': 'fadeIn 0.6s ease-out both',
        'marquee': 'marquee 32s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
