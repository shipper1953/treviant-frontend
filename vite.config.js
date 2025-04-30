import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['react-redux'],
    exclude: ['follow-redirects']
  },
  build: {
    rollupOptions: {
      external: ['follow-redirects']
    },
    commonjsOptions: {
      exclude: ['follow-redirects']
    }
  },
  server: {
    port: 3000
  }
});

