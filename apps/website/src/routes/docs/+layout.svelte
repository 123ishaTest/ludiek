<script lang="ts">
  import DocsSidebar from '$lib/components/DocsSidebar.svelte';
  import { docsLayout } from '$lib/docs/layout';

  let { children } = $props();
</script>

<div class="flex h-full w-full flex-row">
  <div class="bg-base-200 hidden h-full w-64 sm:inline">
    <DocsSidebar docs={docsLayout} />
  </div>

  <div class="flex-1 p-4 md:ml-24">
    {@render children()}
  </div>
</div>
