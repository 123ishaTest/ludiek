import type { LayoutServerLoad } from './$types';
import type { BlogPost } from '$lib/model/BlogPost';
import type { PostsPerMonth } from '$lib/model/PostsPerMonth';
import { base } from '$app/paths';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const load: LayoutServerLoad = async ({ fetch }) => {
  const response = await fetch(base + '/api/posts');
  const posts: BlogPost[] = await response.json();

  const groupedPosts: PostsPerMonth[] = [];

  posts.forEach((post) => {
    const year = new Date(post.date).getFullYear();
    const month = months[new Date(post.date).getMonth()];
    const id = `${month} ${year}`;

    const group = groupedPosts.find((g) => g.month === id);
    if (!group) {
      groupedPosts.push({
        month: id,
        posts: [post],
      });
    } else {
      group.posts.push(post);
    }
  });
  return {
    posts: groupedPosts,
  };
};
