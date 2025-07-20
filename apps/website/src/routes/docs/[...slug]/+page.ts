import { error } from '@sveltejs/kit';

export async function load({ params }) {
  const parts = params.slug.split('/');
  try {
    // What even is web development at this point?
    let doc;
    if (parts.length == 1) {
      doc = await import(`../../../docs/${parts[0]}.svx`);
    } else {
      doc = await import(`../../../docs/${parts[0]}/${parts[1]}.svx`);
    }

    return {
      content: doc.default,
      meta: doc.metadata,
    };
  } catch {
    error(404, `Could not find ${params.slug}`);
  }
}
