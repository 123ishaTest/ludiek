export interface DocsLayout {
  categories: DocsCategory[];
}

export interface DocsCategory {
  title: string;
  pages: DocsPage[];
}

export interface DocsPage {
  title: string;
  slug: string;
}
