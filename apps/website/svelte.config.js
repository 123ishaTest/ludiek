import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
  preprocess: [vitePreprocess(), mdsvex()],
  kit: {
    adapter: adapter(),
    paths: {
      base: process.argv.includes('dev') ? '' : process.env.BASE_PATH,
    },
  },
  extensions: ['.svelte', '.svx'],
};

export default config;
