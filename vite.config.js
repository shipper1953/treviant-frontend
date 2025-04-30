import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Fix for CommonJS compatibility (react-redux)
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  optimizeDeps: {
    include: ['react-redux'],
  },
  build: {
    outDir: 'dist',
  },
})
