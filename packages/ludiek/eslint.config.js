import { config } from '@123ishatest/ludiek-eslint-config/index.js';

export default [
  ...config,
  {
    ignores: ['.svelte-kit/*', 'dist/**'],
  },
];
