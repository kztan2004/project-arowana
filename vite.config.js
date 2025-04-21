import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // For local dev (optional)
    open: true
  },
  build: {
    outDir: 'dist',
  },
  // 👇 This part is key
  resolve: {
    alias: {
      // optional, if using @ path aliases
    }
  },
  // 👇 Enable SPA fallback
  preview: {
    // For `vite preview`
    fallback: '/index.html',
  }
});
