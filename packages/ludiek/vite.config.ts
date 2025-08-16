import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';
import * as path from 'node:path';

export default defineConfig({
  plugins: [tsconfigPaths(), dts()],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'ludiek',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format}.js`,
    },
  },
  server: {
    fs: {
      allow: ['.'],
    },
  },

  test: {
    // TODO(@Isha): Figure out why this is needed if we use `vite-tsconfig-paths`
    alias: {
      '@ludiek': path.resolve(__dirname, 'src'),
    },
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
    },
    watch: false,
  },
});
