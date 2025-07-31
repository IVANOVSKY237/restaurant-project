import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Disable fast refresh to avoid ESBuild issues
      fastRefresh: false,
      // Use Babel instead of SWC/ESBuild
      babel: {
        plugins: []
      }
    })
  ],

  // COMPLETELY DISABLE ESBUILD
  esbuild: false,

  server: {
    host: true,
    port: 5174,
    // Enable HMR with overlay for better debugging
    hmr: {
      overlay: true,
      port: 5175
    },
    // Increase timeout for slow connections
    hmrTimeout: 5000,
    // Watch for file changes - optimized for Windows
    watch: {
      usePolling: false, // Try without polling first
      ignored: ['**/node_modules/**', '**/.git/**']
    },
    // Handle process termination better
    middlewareMode: false,
    // Improve Windows compatibility
    fs: {
      strict: false
    }
  },

  build: {
    // Enable minification for production builds
    minify: 'terser',
    // Enable source maps for debugging
    sourcemap: true,
    // Configure rollup options
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['react-icons']
        }
      }
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000
  }
})
