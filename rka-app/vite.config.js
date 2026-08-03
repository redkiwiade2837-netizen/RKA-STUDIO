import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { mediaSyncPlugin } from './vite-plugins/mediaSync.js'

export default defineConfig({
  plugins: [react(), tailwindcss(), mediaSyncPlugin()],
})
