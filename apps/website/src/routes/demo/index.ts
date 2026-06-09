export const contentFiles = import.meta.glob('/src/lib/demo/content/**/*.yaml', {
  query: '?raw',
  import: 'default',
  eager: true,
});
