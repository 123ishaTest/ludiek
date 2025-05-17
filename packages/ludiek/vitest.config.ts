/// <reference types="vitest" />
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],

  test: {
    watch: false,
    alias: {
      // @ts-expect-error Ignore import not being available
      '@ludiek/': new URL('./src/', import.meta.url).pathname,
    },
  },
});
