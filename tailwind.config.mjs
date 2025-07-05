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
        // Primary color system - Amber theme colors
        primary: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a', 
          300: '#fcd34d',
          400: '#FFA400',  // Main primary color
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
          main: '#FFA400',
          light: '#fcd34d',
          dark: '#d97706',
        },
        // Secondary color system - Light blue theme colors
        secondary: {
          50: '#EAF6FF',   // Main secondary color
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
          main: '#EAF6FF',
          accent: '#3b82f6',
        },
        // Map old color names to new semantic ones for backwards compatibility
        pink: {
          400: '#FFA400', // Map to primary amber
          500: '#f59e0b', // Slightly darker amber
        },
        coral: {
          400: '#f59e0b', // Darker amber for hover states
        },
        blue: {
          50: '#EAF6FF',  // Secondary light blue
          500: '#EAF6FF', // Use same light blue for blue-500
          600: '#2563eb',
          700: '#1d4ed8',
        },
        // Background color system
        background: {
          primary: '#232528',
          secondary: '#1a1c1e',
          tertiary: '#2a2d30',
          card: 'rgba(37, 42, 45, 0.8)',
          glassmorphism: 'rgba(255, 164, 0, 0.05)',
        },
        // Text color system
        text: {
          primary: '#ffffff',
          secondary: '#d1d5db',
          muted: '#9ca3af',
          accent: '#FFA400',
        },
        // Border color system
        border: {
          primary: 'rgba(42, 45, 48, 0.5)',
          secondary: 'rgba(35, 37, 40, 0.3)',
          accent: 'rgba(255, 164, 0, 0.3)',
        },
        // Gray scale - Theme-based grays
        gray: {
          400: '#9ca3af',   // Keep for text
          500: '#6b7280',   // Keep for text
          700: '#2a2d30',   // Background tertiary
          800: '#232528',   // Background primary
          900: '#1a1c1e',   // Background secondary
        },
        // Amber scale for consistency
        amber: {
          400: '#FFA400',
          500: '#f59e0b',
          600: '#d97706',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #FFA400 0%, #EAF6FF 100%)',
        'gradient-accent': 'linear-gradient(135deg, #EAF6FF 0%, #FFA400 100%)',
        'gradient-radial': 'radial-gradient(ellipse at top, rgba(255, 164, 0, 0.1) 0%, transparent 50%)',
        'gradient-mesh': 'conic-gradient(from 0deg at 50% 50%, rgba(255, 164, 0, 0.1) 0deg, transparent 60deg, rgba(234, 246, 255, 0.1) 120deg, transparent 180deg)',
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