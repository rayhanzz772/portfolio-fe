import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    proxy: {
      '/api/wakapi': {
        target: 'https://wakapi.dev',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/wakapi/, ''),
      },
    },
  },
  build: {
    target: 'es2019',
  },
})
