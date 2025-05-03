import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// filepath: /Users/taylorgregg/treviant-shipping-app/frontend/vite.config.js
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['react-redux'], // Add this line
  },
  build: {
    rollupOptions: {
      external: [],
    },
  },
  server: {
    port: 3000,
  },
});
