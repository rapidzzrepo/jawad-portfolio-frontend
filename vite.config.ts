import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: true,
    proxy: {
      '/ask': 'https://jawad.nexteksol.com',
      '/health': 'https://jawad.nexteksol.com',
    },
  },
  appType: 'spa',
})
