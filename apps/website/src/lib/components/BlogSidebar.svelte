<script lang="ts">
  import { base } from '$app/paths';
  import { page } from '$app/state';
  import type { PostsPerMonth } from '$lib/model/PostsPerMonth';

  interface Props {
    posts: PostsPerMonth[];
  }

  let { posts }: Props = $props();

  let currentPostSlug = $derived(page.url.pathname.split('/').at(-1));
</script>

<ul class="menu bg-base-200 rounded-box w-64">
  {#each posts as category}
    <li>
      <details open>
        <summary>{category.month}</summary>
        <ul>
          {#each category.posts as post}
            <li>
              <a href="{base}/blog/{post.slug}" class={currentPostSlug === post.slug ? 'menu-active' : ''}>
                {post.title}
              </a>
            </li>
          {/each}
        </ul>
      </details>
    </li>
  {/each}
</ul>
