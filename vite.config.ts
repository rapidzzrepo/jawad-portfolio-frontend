import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: true,
    proxy: {
      '/ask': 'http://localhost:8001',
      '/health': 'http://localhost:8001',
    },
  },
  appType: 'spa',
})
