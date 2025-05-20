<script lang="ts">
  let { data } = $props();
</script>

<svelte:head>
  <title>{data.meta.title}</title>
  <meta property="og:type" content="article" />
  <meta property="og:title" content={data.meta.title} />
</svelte:head>

<article class="prose">
  <h1 class="text-primary">{data.meta.title}</h1>

  <data.content />
</article>
