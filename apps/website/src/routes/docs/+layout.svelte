<script lang="ts">
  import DocsSidebar from '$lib/components/DocsSidebar.svelte';
  import { docsLayout } from '$lib/docs';

  let { children } = $props();
</script>

<div class="drawer lg:drawer-open">
  <input id="sidebar-drawer" type="checkbox" class="drawer-toggle" />

  <div class="drawer-content">
    <div class="my-12 flex-1 p-4 md:ml-24 md:p-0">
      {@render children()}
    </div>
  </div>

  <div class="drawer-side">
    <label for="sidebar-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
    <div class="bg-base-200 h-full w-64">
      <DocsSidebar docs={docsLayout}></DocsSidebar>
    </div>
  </div>
</div>
