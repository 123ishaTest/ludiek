import { error } from '@sveltejs/kit';

export async function load({ params }) {
  try {
    const doc = await import(`../../../docs/${params.slug}.svx`);

    return {
      content: doc.default,
      meta: doc.metadata,
    };
  } catch {
    error(404, `Could not find ${params.slug}`);
  }
}
