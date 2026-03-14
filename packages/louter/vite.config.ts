import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    dts({
      tsconfigPath: './tsconfig.build.json',
    }),
  ],
  build: {
    rollupOptions: {
      external: ['node:fs', 'node:path'],
    },
    lib: {
      entry: {
        index: 'src/index.ts',
        node: 'src/node.ts',
      },
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => `${entryName}.${format}.js`,
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
