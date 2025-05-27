import type { DocsLayout } from '$lib/model/Docs';

export const docsLayout: DocsLayout = {
  categories: [
    {
      title: 'Introduction',
      pages: [
        { title: 'Welcome', slug: 'welcome' },
        { title: 'Overview', slug: 'introduction/overview' },
      ],
    },
    // TODO(@Isha): More docs
    // {
    //   title: 'Ludiek',
    //   pages: [
    //     { title: 'Engine', slug: 'ludiek/engine' },
    //     { title: 'Features', slug: 'ludiek/features' },
    //     { title: 'Content', slug: 'ludiek/content' },
    //   ],
    // },
    {
      title: 'Features',
      pages: [
        { title: 'Wallet', slug: 'features/wallet' },
        { title: 'Statistics', slug: 'features/statistics' },
        { title: 'Settings', slug: 'features/settings' },
      ],
    },
    {
      title: 'Other',
      pages: [{ title: 'Roadmap', slug: 'other/roadmap' }],
    },
  ],
};
