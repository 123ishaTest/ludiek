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
      pages: [{ title: 'Conditions', slug: 'engine/conditions' }],
    },
    {
      title: 'Plugins',
      pages: [
        { title: 'Currency', slug: 'plugins/currency' },
        { title: 'Statistic', slug: 'plugins/statistic' },
        { title: 'Achievement', slug: 'plugins/achievement' },
      ],
    },
  ],
};
