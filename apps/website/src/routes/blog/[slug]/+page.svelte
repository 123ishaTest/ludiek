<script lang="ts">
  import type { BlogCategory } from '$lib/model/BlogCategory';

  let { data } = $props();

  const categoryStyles: Record<BlogCategory, string> = {
    technical: '',
    ludology: 'badge-warning',
    release: 'badge-info',
  };

  const getStyle = (category: BlogCategory): string => {
    return categoryStyles[category];
  };
</script>

<svelte:head>
  <meta property="og:type" content="article" />
  <meta property="og:title" content={data.meta.title} />
</svelte:head>

<article class="prose">
  <div class="space-x-2">
    {#each data.meta.categories as category}
      <span class="badge badge-outline badge-xs {getStyle(category)}">&num;{category}</span>
    {/each}
  </div>

  <h1 class="text-primary">{data.meta.title}</h1>

  <data.content />
</article>
