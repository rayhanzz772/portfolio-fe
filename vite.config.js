import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import prerender from 'vite-plugin-prerender'

const Renderer = prerender.PuppeteerRenderer

// All routes to prerender
const routes = [
  '/',
  '/portfolio',
  // Projects
  '/projects/hris',
  '/projects/rasionalisasi-snbp',
  '/projects/crypta',
  '/projects/cms',
  '/projects/whome',
  '/projects/kkp',
  '/projects/salary-allocator',
  '/projects/floodsenseai',
  '/projects/bumdesma',
  '/projects/sigasi',
  '/projects/wecare',
  '/projects/sitari',
  '/projects/soilai',
  '/projects/mentalcare',
  '/projects/pmi',
  '/projects/mevent',
  '/projects/desaged',
  // Certifications
  '/certifications/appliedml',
  '/certifications/mlandroid',
  '/certifications/jwdbnsp',
  '/certifications/sql',
  // Awards
  '/awards/goldmedal',
  '/awards/essay1st',
  '/awards/uiux2nd',
  '/awards/soilaipaper',
]

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    prerender({
      staticDir: resolve(__dirname, 'dist'),
      routes,
      renderer: new Renderer({
        headless: true,
        renderAfterTime: 5000,
      }),
    }),
  ],
})
