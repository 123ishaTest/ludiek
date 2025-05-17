import type { BlogPost } from '$lib/model/BlogPost';

export interface PostsPerMonth {
  month: string;
  posts: BlogPost[];
}
