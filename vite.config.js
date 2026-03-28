import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    base: '/',
    plugins: [react()],
    server: {
      proxy: {
        '/api/wakapi': {
          target: 'https://wakapi.dev',
          changeOrigin: true,
          headers: env.WAKAPI_API_KEY
            ? {
                Authorization: env.WAKAPI_API_KEY,
              }
            : undefined,
          rewrite: (path) => path.replace(/^\/api\/wakapi/, ''),
        },
      },
    },
    build: {
      target: 'es2019',
      rollupOptions: {
        output: {
          manualChunks: {
            'react-core': ['react', 'react-dom'],
            'router': ['react-router-dom'],
            'motion': ['framer-motion', 'motion'],
            'charts': ['recharts'],
            'github-calendar': ['react-github-calendar'],
            'three': ['three', '@react-three/fiber', '@react-three/drei'],
          },
        },
      },
    },
  }
})
