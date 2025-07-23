import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [tsconfigPaths(), dts()],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'ludiek',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: [], // mark peer deps here
    },
  },
  server: {
    fs: {
      allow: ['.'], // allow serving files from workspace
    },
  },
});
