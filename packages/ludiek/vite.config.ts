import { defineConfig } from 'vitest/config';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    dts({
      tsconfigPath: './tsconfig.build.json',
    }),
  ],
  resolve: {
    tsconfigPaths: true,
  },
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
      include: ['./src/**/*.ts'],
    },
    watch: false,
  },
});
