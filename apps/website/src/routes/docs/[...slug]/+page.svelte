<script lang="ts">
  import { getNext, getPrevious } from '$lib/docs';

  let { data } = $props();
  console.log(data);

  let slug = $derived(data.slug);
  let previous = $derived(getPrevious(slug));
  let next = $derived(getNext(slug));
</script>

<svelte:head>
  <title>{data.meta.title}</title>
  <meta property="og:type" content="article" />
  <meta property="og:title" content={data.meta.title} />
</svelte:head>

<article class="prose">
  <h1 class="text-primary">{data.meta.title}</h1>

  <data.content />

  <div class="mt-8 flex flex-row justify-between space-x-8">
    {#if previous}
      <a
        href="/docs/{previous.slug}"
        class="border-base-content/20 hover:border-base-content/30 flex grow flex-col rounded-xl border p-4 no-underline"
      >
        <span class="text-xs">Previous page</span>
        <span class="text-primary">{previous.title}</span>
      </a>
    {:else}
      <div class="grow"></div>
    {/if}

    {#if next}
      <a
        href="/docs/{next.slug}"
        class="border-base-content/20 hover:border-base-content/30 flex grow flex-col items-end rounded-xl border p-4 no-underline"
      >
        <span class="text-xs">Next page</span>
        <span class="text-primary">{next.title}</span>
      </a>
    {:else}
      <div class="grow"></div>
    {/if}
  </div>
</article>
