<script lang="ts">
  import LuiSidebar from '$lib/components/LuiSidebar.svelte';
  import type { PageType } from '$lib/types/PageType.js';
  import { type Component } from 'svelte';
  import LuiPageNotFound from '$lib/components/LuiPageNotFound.svelte';
  import LuiContentPage from '$lib/components/content/LuiContentPage.svelte';
  import LuiPersistencePage from '$lib/components/persistence/LuiPersistencePage.svelte';


  let selectedPage: PageType = $state('content');

  let pageRepository: Partial<Record<PageType, Component>> = $state({
    content: LuiContentPage,
    persistence: LuiPersistencePage,
  });

  let SelectedPage = $derived(pageRepository[selectedPage]);
</script>


<div class="w-full h-full overflow-x-auto overflow-y-auto flex flex-row">
  <LuiSidebar bind:selectedPage={selectedPage} />

  <div class="grow p-4">
    {#if SelectedPage}
      <SelectedPage />
    {:else}
      <LuiPageNotFound page={selectedPage} />
    {/if}
  </div>


</div>