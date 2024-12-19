/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'graffiti': ['Street Wars Demo', 'sans-serif'],
        'header': ['main', 'sans-serif'],
        'tag': ['main', 'sans-serif'],
        'main': ['header', 'sans-serif'],
        'logo': ['logo', 'sans-serif'],
        'neutralStreet': ['paradize', 'sans-serif'],
        'neutralHeaderTag': ['TrashHand', 'sans-serif'],
      },
      animation: {
        'text-slide': 'text-slide 12s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'text-slide': {
          '0%, 100%': { transform: 'translateX(0%)' },
          '50%': { transform: 'translateX(-50%)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}
