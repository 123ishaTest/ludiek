<script lang="ts">
  import CloseIcon from '@lucide/svelte/icons/x';
  import type { LuiToolbarConfig } from '$lui/LuiConfig';
  import LuiVersion from '$lui/components/LuiVersion.svelte';

  interface Props {
    config: LuiToolbarConfig;
  }

  let { config }: Props = $props();

  let isVisible = $state(true);

  const closeToolbar = () => {
    isVisible = false;
  };
  const openToolbar = () => {
    isVisible = true;
  };

</script>

{#if isVisible}
  <div class="lui w-full h-12 flex flex-row items-center z-60 px-2">

    <div class="flex flex-row items-center space-x-4">

      <div class="flex flex-row">
        <a class="d-btn d-btn-primary" href="https://ludiek.123ishatest.com/docs" target="_blank">
          <span>Ludiek</span>
          <LuiVersion />
        </a>
      </div>

      {#each config.items as item (item.key)}
        {@const Component = item.component}
        <Component />
      {/each}
    </div>

    <div class="grow"></div>

    <button class="d-btn" onclick={()=> closeToolbar()}>
      <CloseIcon />
    </button>
  </div>
{:else}
  <div class="lui absolute bottom-0 right-0 p-2 z-60">
    <button class="d-btn d-btn-primary" onclick={() => openToolbar()}>Ludiek</button>
  </div>
{/if}
