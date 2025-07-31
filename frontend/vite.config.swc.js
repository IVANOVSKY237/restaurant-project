import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc' // Use SWC instead of ESBuild

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Disable ESBuild entirely and use SWC
  esbuild: false,
  optimizeDeps: {
    // Force pre-bundling to avoid runtime issues
    force: true,
  },
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
    // Use Terser instead of ESBuild for minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          redux: ['@reduxjs/toolkit', 'react-redux'],
          icons: ['react-icons']
        }
      }
    }
  }
})
