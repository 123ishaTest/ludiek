import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'node:path';

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  resolve: {
    alias: {
      // Import Lui directly from source
      '@123ishatest/lui': path.resolve(__dirname, '../../packages/lui/src/lib'),
      $lui: path.resolve(__dirname, '../../packages/lui/src/lib'),
    },
  },
});
