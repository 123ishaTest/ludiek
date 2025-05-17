import { redirect } from '@sveltejs/kit';
import { base } from '$app/paths';

export async function load({ fetch }) {
  const latest = await fetch(base + '/api/latest-post');
  const slug = await latest.json();
  redirect(301, `${base}/blog/${slug}`);
}
