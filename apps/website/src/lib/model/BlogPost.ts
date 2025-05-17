import type { BlogCategory } from '$lib/model/BlogCategory';

export type BlogPost = {
  title: string;
  slug: string;
  date: string;
  categories: BlogCategory[];
  published: boolean;
};
