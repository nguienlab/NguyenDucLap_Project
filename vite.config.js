import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Tách các thư viện lớn ra thành chunk riêng
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor-react';
            }
            if (id.includes('framer-motion')) {
              return 'vendor-framer';
            }
            if (id.includes('bootstrap') || id.includes('react-bootstrap')) {
              return 'vendor-ui';
            }
            return 'vendor-utils'; // Các thư viện còn lại (axios, etc.)
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Tăng giới hạn cảnh báo size lên 1MB
  },
})