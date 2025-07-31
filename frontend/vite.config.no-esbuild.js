import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite config that completely avoids ESBuild
export default defineConfig({
  plugins: [
    react({
      // Use Babel instead of SWC/ESBuild
      jsxRuntime: 'automatic',
      babel: {
        plugins: [],
        presets: [
          ['@babel/preset-env', { targets: { node: 'current' } }],
          ['@babel/preset-react', { runtime: 'automatic' }]
        ]
      }
    })
  ],
  
  // COMPLETELY DISABLE ESBUILD
  esbuild: false,
  
  // Use alternative dependency optimization
  optimizeDeps: {
    disabled: true, // Disable dependency pre-bundling entirely
  },
  
  server: {
    host: true,
    port: 5174,
    hmr: {
      overlay: false // Disable error overlay that might trigger ESBuild
    },
    watch: {
      usePolling: true, // Use polling for file watching on Windows
      interval: 1000
    }
  },
  
  build: {
    // Use Terser for minification instead of ESBuild
    minify: 'terser',
    target: 'es2015',
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  }
})
