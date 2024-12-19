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
        'sans': ['borela', 'sans-serif'],
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
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: theme('colors.primary-color'),
              '&:hover': {
                color: theme('colors.accent-color'),
              },
            },
            h1: {
              color: 'white',
              fontFamily: theme('fontFamily.street'),
            },
            h2: {
              color: 'white',
              fontFamily: theme('fontFamily.street'),
            },
            h3: {
              color: 'white',
              fontFamily: theme('fontFamily.street'),
            },
            h4: {
              color: 'white',
              fontFamily: theme('fontFamily.street'),
            },
            strong: {
              color: 'white',
            },
            code: {
              color: theme('colors.primary-color'),
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem',
              fontWeight: '400',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              code: {
                backgroundColor: 'transparent',
                padding: '0',
              },
            },
            blockquote: {
              color: 'white',
              borderLeftColor: theme('colors.primary-color'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
