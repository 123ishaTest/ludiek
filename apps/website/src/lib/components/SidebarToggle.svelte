<script lang="ts">
  import { base } from '$app/paths';
  import { page } from '$app/state';

  // TODO: Cleanup by letting subroutes setting a flag to check against
  let showSidebar = $derived(page.url.pathname.includes('/docs'));
</script>

{#if showSidebar}
  <label for="sidebar-drawer" class="btn drawer-button lg:hidden">
    <img class="w-6" src="{base}/icons/hamburger.svg" alt="Menu" />
  </label>
{/if}
