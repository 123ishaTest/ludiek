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
      title: 'Plugins',
      pages: [
        { title: 'Currency', slug: 'plugins/currency' },
        { title: 'Statistic', slug: 'plugins/statistic' },
      ],
    },
  ],
};
