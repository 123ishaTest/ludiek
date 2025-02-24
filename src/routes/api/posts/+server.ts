import { json } from '@sveltejs/kit'
import type { Post } from '$lib/types'

async function getPosts() {
  const paths = import.meta.glob('/src/posts/*.svx', { eager: true })

  const posts: Post[] = Object.entries(paths).map(([path, file]) => {
    const slug = path.split('/').at(-1)?.replace('.svx', '');

    if (!(file && typeof file === 'object' && 'metadata' in file && slug)) {
      throw Error();
    }
    const metadata = file.metadata as Omit<Post, 'slug'>;
    return {
      ...metadata,
      slug,
    };

  }).filter(p => p.published)

  posts.sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return posts
}

export async function GET() {
  const posts = await getPosts()
  return json(posts)
}