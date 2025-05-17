<script lang="ts">
  import DocsSidebar from '$lib/components/DocsSidebar.svelte';
  import { docsLayout } from '$lib/docs/docs';

  let { children } = $props();
</script>

<div class="flex flex-row">
  <DocsSidebar docs={docsLayout} />

  <div class="w-full p-4 md:ml-24">
    {@render children()}
  </div>
</div>
