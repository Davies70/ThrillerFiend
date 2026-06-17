import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;

          if (id.includes('firebase')) return 'vendor-firebase';
          if (id.includes('@mui') || id.includes('@emotion')) return 'vendor-mui';
          if (id.includes('@tanstack')) return 'vendor-query';
          if (id.includes('react')) return 'vendor-react';

          return 'vendor';
        },
      },
    },
  },
});
