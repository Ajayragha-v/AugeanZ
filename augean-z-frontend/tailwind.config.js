/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        graphite: '#09090f',
        charcoal: '#12121b',
        gunmetal: '#1b1b26',
        purple: {
          950: '#20083b',
          900: '#3c096c',
          800: '#5a189a',
          700: '#7b2cbf',
          600: '#9d4edd',
          500: '#a855f7',
          400: '#c77dff',
          300: '#e0aaff',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}
