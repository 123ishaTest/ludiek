import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    dts({
      tsconfigPath: './tsconfig.build.json',
    })],
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
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
    },
    watch: false,
  },
});
