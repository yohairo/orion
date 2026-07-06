import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://orion.dev',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    react(),
  ],
  output: 'static',
  compressHTML: true,
  // Performance optimizations
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ['react-dom/client'],
    },
    build: {
      // Enable CSS code splitting
      cssCodeSplit: true,
      // Optimize chunk size
      rollupOptions: {
        output: {
          // Split large chunks
          manualChunks: (id) => {
            if (id.includes('framer-motion')) {
              return 'framer-motion';
            }
            if (id.includes('lucide-react')) {
              return 'icons';
            }
            if (id.includes('react')) {
              return 'react-vendor';
            }
          },
        },
      },
      // Enable minification
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
    server: {
      headers: {
        'Cache-Control': 'no-cache',
      },
    },
  },
  // Prefetch optimization
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
}); 