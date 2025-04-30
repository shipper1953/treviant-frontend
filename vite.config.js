import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

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
    commonjsOptions: {
      include: [/node_modules/, /react-redux/],
      transformMixedEsModules: true,
    },
    rollupOptions: {
      external: [],
    },
  },
})
