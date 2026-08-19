import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  server: {
    port: 5173,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      input: {
        bundle: resolve(import.meta.dirname, 'src/js/main.js'),
        style: resolve(import.meta.dirname, 'src/scss/main.scss'),
      },
      output: {
        entryFileNames: 'custom.js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'custom.css';
          }
          return '[name].[ext]';
        },
      },
    },
  },
});