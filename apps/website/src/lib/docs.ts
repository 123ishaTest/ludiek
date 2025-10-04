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
        { title: 'Input', slug: 'engine/input' },
        { title: 'Output', slug: 'engine/output' },
        { title: 'Requests', slug: 'engine/requests' },
        { title: 'Persistence', slug: 'engine/persistence' },
      ],
    },
    {
      title: 'Plugins',
      pages: [
        { title: 'Achievement', slug: 'plugins/achievement' },
        { title: 'Coupon', slug: 'plugins/coupon' },
        { title: 'Currency', slug: 'plugins/currency' },
        { title: 'Loot Table', slug: 'plugins/loot-table' },
        { title: 'Skill', slug: 'plugins/skill' },
        { title: 'Statistic', slug: 'plugins/statistic' },
      ],
    },
  ],
};
