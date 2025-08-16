import { resolve } from '$app/paths';
import { redirect } from '@sveltejs/kit';

export async function load() {
  redirect(301, resolve('/docs/welcome'));
}
