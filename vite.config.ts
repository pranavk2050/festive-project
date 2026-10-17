import { defineConfig } from 'vite';

export default defineConfig({
  base: '/festive-project/',
  worker: { format: 'es' },
  server: { port: 5173 },
  build: { chunkSizeWarningLimit: 900 },
});
