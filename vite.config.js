import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import commonjs from 'vite-plugin-commonjs'; // 🆕

export default defineConfig({
  plugins: [
    react(),
    commonjs(), // 🆕 ADD THIS
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
