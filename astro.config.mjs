import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [
    react(),
    tailwind()
  ],
  build: {
    // Enable CSS and JS minification
    assets: 'assets',
    // Split chunks for better caching
    split: true,
  },
  output: 'static',
  compressHTML: true,
  // Performance optimizations
  vite: {
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
    // Enable server-side compression
    server: {
      headers: {
        'Cache-Control': 'public, max-age=3600',
      },
    },
  },
  // Prefetch optimization
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
}); 