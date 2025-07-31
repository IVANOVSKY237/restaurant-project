import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Minimal Vite config to avoid ESBuild issues
export default defineConfig({
  plugins: [react()],
  
  // Completely disable ESBuild
  esbuild: false,
  
  server: {
    host: true,
    port: 5174,
    hmr: {
      overlay: false // Disable error overlay that might use ESBuild
    }
  },
  
  build: {
    // Use Terser instead of ESBuild for minification
    minify: 'terser'
  }
})
