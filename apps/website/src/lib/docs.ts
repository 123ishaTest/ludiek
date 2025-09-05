import type { DocsLayout } from '$lib/model/Docs';

export const docsLayout: DocsLayout = {
  categories: [
    {
      title: 'Introduction',
      pages: [
        { title: 'Welcome', slug: 'welcome' },
        { title: 'Getting started', slug: 'getting-started' },
      ],
    },
    {
      title: 'Engine',
      pages: [
        { title: 'Conditions', slug: 'engine/conditions' },
        { title: 'Transactions', slug: 'engine/transactions' },
        { title: 'Requests', slug: 'engine/requests' },
        { title: 'Persistence', slug: 'engine/persistence' },
      ],
    },
    {
      title: 'Plugins',
      pages: [
        { title: 'Currency', slug: 'plugins/currency' },
        { title: 'Statistic', slug: 'plugins/statistic' },
        { title: 'Achievement', slug: 'plugins/achievement' },
        { title: 'Coupon', slug: 'plugins/coupon' },
      ],
    },
  ],
};
