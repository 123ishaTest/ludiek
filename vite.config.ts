import tailwindcss from '@tailwindcss/vite';
import { svelteTesting } from '@testing-library/svelte/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit(), tailwindcss()],

  test: {
    workspace: [
      {
        extends: './vite.config.ts',
        plugins: [svelteTesting()],

        test: {
          name: 'client',
          environment: 'jsdom',
          clearMocks: true,
          include: ['tests/**/*.svelte.{test,spec}.{js,ts}'],
          exclude: ['tests/lib/server/**'],
          setupFiles: ['./vitest-setup-client.ts'],
        },
      },
      {
        extends: './vite.config.ts',

        test: {
          name: 'server',
          environment: 'node',
          include: ['tests/**/*.{test,spec}.{js,ts}'],
          exclude: ['tests/**/*.svelte.{test,spec}.{js,ts}'],
        },
      },
    ],
  },
});
