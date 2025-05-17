import { json } from '@sveltejs/kit';
import type { BlogPost } from '$lib/model/BlogPost';

export async function GET({ fetch }) {
  const posts = await fetch('/api/posts');
  const postsData: BlogPost[] = await posts.json();
  return json(postsData[0].slug);
}
