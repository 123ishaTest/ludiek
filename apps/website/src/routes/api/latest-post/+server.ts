import { json } from '@sveltejs/kit';
import type { BlogPost } from '$lib/model/BlogPost';
import { base } from '$app/paths';

export async function GET({ fetch }) {
  const posts = await fetch(base + '/api/posts');
  const postsData: BlogPost[] = await posts.json();
  return json(postsData[0].slug);
}
