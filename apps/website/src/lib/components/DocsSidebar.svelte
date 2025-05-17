<script lang="ts">
  import { base } from '$app/paths';
  import { page } from '$app/state';
  import type { DocsLayout } from '$lib/model/Docs';

  interface Props {
    docs: DocsLayout;
  }

  let { docs }: Props = $props();

  let currentPostSlug = $derived(page.url.pathname.split('/').at(-1));
</script>

<ul class="menu bg-base-200 rounded-box hidden w-64 sm:inline">
  {#each docs.categories as category}
    <li>
      <details open>
        <summary>{category.title}</summary>
        <ul>
          {#each category.pages as page}
            <li>
              <a href="{base}/docs/{page.slug}" class={currentPostSlug === page.slug ? 'menu-active' : ''}>
                {page.title}
              </a>
            </li>
          {/each}
        </ul>
      </details>
    </li>
  {/each}
</ul>
