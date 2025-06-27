/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      colors: {
        primary: {
          main: 'rgb(139, 92, 246)',
          light: 'rgb(167, 139, 250)',
          dark: 'rgb(109, 40, 217)',
        },
        secondary: {
          main: 'rgb(34, 197, 94)',
          accent: 'rgb(249, 115, 22)',
        },
        background: {
          primary: 'rgb(9, 9, 11)',
          secondary: 'rgb(24, 24, 27)',
          tertiary: 'rgb(39, 39, 42)',
          card: 'rgba(24, 24, 27, 0.8)',
          glassmorphism: 'rgba(255, 255, 255, 0.05)',
        },
        text: {
          primary: 'rgb(250, 250, 250)',
          secondary: 'rgb(161, 161, 170)',
          muted: 'rgb(113, 113, 122)',
          accent: 'rgb(139, 92, 246)',
        },
        border: {
          primary: 'rgba(255, 255, 255, 0.1)',
          secondary: 'rgba(255, 255, 255, 0.05)',
          accent: 'rgba(139, 92, 246, 0.3)',
        },
        purple: {
          600: '#9333ea',
          700: '#7c3aed',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, rgb(139, 92, 246) 0%, rgb(109, 40, 217) 100%)',
        'gradient-accent': 'linear-gradient(135deg, rgb(139, 92, 246) 0%, rgb(34, 197, 94) 100%)',
        'gradient-radial': 'radial-gradient(ellipse at top, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
        'gradient-mesh': 'conic-gradient(from 0deg at 50% 50%, rgba(139, 92, 246, 0.1) 0deg, transparent 60deg, rgba(34, 197, 94, 0.1) 120deg, transparent 180deg)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'fade-in-up-delay': 'fadeInUp 0.8s ease-out 0.3s forwards',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        pulseSoft: {
          '0%, 100%': {
            opacity: '0.5',
          },
          '50%': {
            opacity: '0.8',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
        twinkle: {
          '0%, 100%': {
            opacity: '0.3',
          },
          '50%': {
            opacity: '0.8',
          },
        },
      },
    },
  },
  plugins: [],
} 