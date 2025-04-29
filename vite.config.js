import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import commonjs from 'vite-plugin-commonjs'; // ✅ NEW

export default defineConfig({
  plugins: [
    react(),
    commonjs(), // ✅ ADDED
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: 'dist',
  },
});
