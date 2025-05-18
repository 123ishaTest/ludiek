import type { DocsLayout } from '$lib/model/Docs';

export const docsLayout: DocsLayout = {
  categories: [
    {
      title: 'Introduction',
      pages: [
        {
          title: 'Welcome',
          slug: 'welcome',
        },
      ],
    },
    {
      title: 'Ludiek',
      pages: [
        { title: 'Engine', slug: 'ludiek/engine' },
        { title: 'Features', slug: 'ludiek/features' },
        { title: 'Content', slug: 'ludiek/content' },
      ],
    },
    {
      title: 'Features',
      pages: [{ title: 'Wallet', slug: 'features/wallet' }],
    },
    {
      title: 'Other',
      pages: [{ title: 'Roadmap', slug: 'other/roadmap' }],
    },
  ],
};
