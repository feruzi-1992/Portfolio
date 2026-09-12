import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, rootDir, '');
  // XAMPP: http://localhost/Portfolio/  → use /Portfolio/
  // GitHub Pages: set VITE_BASE_PATH=/repo-name/
  const base = env.VITE_BASE_PATH || '/Portfolio/dist/';

  return {
    base,
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(rootDir, './src'),
      },
    },
    server: {
      open: '/Portfolio/dist/',
      proxy: {
        '/Portfolio/api': {
          target: 'http://127.0.0.1',
          changeOrigin: true,
        },
      },
    },
    preview: {
      open: '/Portfolio/dist/',
    },
  };
});
