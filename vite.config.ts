import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  worker: {
    format: 'es', // the worker imports the ES module emitted by Emscripten
  },
  server: {
    open: true,
  },
})