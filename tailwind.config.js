/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f4f7ec',
          100: '#e7eed8',
          200: '#d3e0b5',
          300: '#bfd291',
          400: '#a9c276',
          500: '#9eb270',
          600: '#7b9f52',
          700: '#637f42',
          800: '#4b6133',
          900: '#354325',
          950: '#212b17',
        },
        secondary: {
          50: '#f3eeee',
          100: '#e6dbdc',
          200: '#ceb7b9',
          300: '#b69498',
          400: '#8c666f',
          500: '#674d51',
          600: '#513b40',
          700: '#372535',
          800: '#281b26',
          900: '#1b1219',
          950: '#0f0e11',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
