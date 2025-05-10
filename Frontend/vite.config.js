import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
   test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js' 
  },
  server: {
     historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://topglad-001-site9.anytempurl.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
  },
});
