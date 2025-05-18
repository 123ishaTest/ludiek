import type { DocsLayout } from '$lib/model/Docs';

export const docsLayout: DocsLayout = {
  categories: [
    {
      title: 'Introduction',
      pages: [
        {
          title: 'Hello World',
          slug: 'hello-world',
        },
      ],
    },
    {
      title: 'Features',
      pages: [
        {
          title: 'Wallet',
          slug: 'features/wallet',
        },
      ],
    },
  ],
};
