import { base } from '$app/paths';
import { redirect } from '@sveltejs/kit';

export async function load() {
  redirect(301, `${base}/docs/welcome`);
}
