import type { DocsLayout, DocsPage } from '$lib/model/Docs';

export const docsLayout: DocsLayout = {
  categories: [
    {
      title: 'Introduction',
      pages: [{ title: 'Welcome', slug: 'introduction/welcome' }],
    },
    {
      title: 'Getting Started',
      pages: [
        { title: 'Overview', slug: 'getting-started/overview' },
        { title: 'Setting Up', slug: 'getting-started/setting-up' },
        { title: 'Adding a Plugin', slug: 'getting-started/adding-a-plugin' },
        { title: 'Content', slug: 'getting-started/content' },
        { title: 'Engine Concepts', slug: 'getting-started/engine-concepts' },
        { title: 'Our first feature', slug: 'getting-started/our-first-feature' },
        { title: 'Putting it all together', slug: 'getting-started/putting-it-all-together' },
        { title: "What's next?", slug: 'getting-started/whats-next' },
      ],
    },
    {
      title: 'Plugins',
      pages: [
        { title: 'Achievement', slug: 'plugins/achievement' },
        { title: 'Buff', slug: 'plugins/buff' },
        { title: 'Coupon', slug: 'plugins/coupon' },
        { title: 'Currency', slug: 'plugins/currency' },
        { title: 'Key Item', slug: 'plugins/key-item' },
        { title: 'Loot Table', slug: 'plugins/loot-table' },
        { title: 'Skill', slug: 'plugins/skill' },
        { title: 'Statistic', slug: 'plugins/statistic' },
        { title: 'Upgrade', slug: 'plugins/upgrade' },
      ],
    },
    {
      title: 'Engine',
      pages: [
        { title: 'Conditions', slug: 'engine/conditions' },
        { title: 'Input', slug: 'engine/input' },
        { title: 'Output', slug: 'engine/output' },
        { title: 'Requests', slug: 'engine/requests' },
        { title: 'Bonuses', slug: 'engine/bonuses' },
        { title: 'Persistence', slug: 'engine/persistence' },
      ],
    },
    {
      title: 'Complementaries',
      pages: [
        { title: 'Lui', slug: 'complementaries/lui' },
        { title: 'Lyrisch', slug: 'complementaries/lyrisch' },
      ],
    },
    {
      title: 'Other',
      pages: [{ title: 'Roadmap', slug: 'other/roadmap' }],
    },
  ],
};

export const getNext = (slug: string): DocsPage | undefined => {
  for (const category of docsLayout.categories) {
    const index = category.pages.findIndex((page) => page.slug === slug);
    if (index != -1) {
      return category.pages.length - 1 === index ? undefined : category.pages[index + 1];
    }
  }
};

export const getPrevious = (slug: string): DocsPage | undefined => {
  for (const category of docsLayout.categories) {
    const index = category.pages.findIndex((page) => page.slug === slug);
    if (index != -1) {
      return 0 === index ? undefined : category.pages[index - 1];
    }
  }
};
