<script lang="ts">
  import { type Component } from 'svelte';
  import type { PageType } from '../types/PageType.js';
  import LuiContentPage from '../components/content/LuiContentPage.svelte';
  import LuiPersistencePage from '../components/persistence/LuiPersistencePage.svelte';
  import LuiSidebar from '../components/LuiSidebar.svelte';
  import LuiPageNotFound from '../components/LuiPageNotFound.svelte';


  let selectedPage: PageType = $state('content');

  let pageRepository: Partial<Record<PageType, Component>> = $state({
    content: LuiContentPage,
    persistence: LuiPersistencePage,
  });

  let SelectedPage = $derived(pageRepository[selectedPage]);
</script>


<div class="lui w-full h-full overflow-x-auto overflow-y-auto flex flex-row">
  <LuiSidebar bind:selectedPage={selectedPage} />

  <div class="grow p-4">
    {#if SelectedPage}
      <SelectedPage />
    {:else}
      <LuiPageNotFound page={selectedPage} />
    {/if}
  </div>

</div>
