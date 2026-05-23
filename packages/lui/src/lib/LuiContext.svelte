<script lang="ts">
  import LuiDebugger from '$lib/pages/LuiDebugger.svelte';
  import type { AnyEngine } from '@123ishatest/ludiek';
  import { onMount, type Snippet } from 'svelte';
  import { isDebug, setEngine } from '$lib/util/context.js';
  import LuiToolbar from '$lib/components/toolbar/LuiToolbar.svelte';

  interface Props {
    engine: AnyEngine;
    toggleKeys?: string[];
    openVisible?: boolean,
    withToolbar?: boolean
    children?: Snippet;
  }

  let { engine, children, openVisible = false, withToolbar = true, toggleKeys = ['§', '`'] }: Props = $props();

  // TODO(@Isha): Make reactive?
  setEngine(engine);

  let showOverlay = $state(openVisible);

  const toggleOverlay = () => {
    showOverlay = !showOverlay;
  };

  onMount(() => {
    document.addEventListener('keypress', (e) => {
      if (toggleKeys.includes(e.key)) {
        toggleOverlay();
      }
    });
  });

</script>


<!--<svelte:boundary>-->
{#if isDebug()}
  {#if children}
    {@render children()}
  {/if}

  <div class="inset-0 pb-16 absolute z-50 bg-base-200" class:hidden={!showOverlay}>
    <LuiDebugger />
  </div>

  {#if withToolbar}
    <LuiToolbar />
  {/if}

  <!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
  {#snippet failed(error: string)}
    <p>Lui error:{error}</p>
  {/snippet}


{:else}
  {#if children}
    {@render children()}
  {/if}
{/if}
<!--</svelte:boundary>-->
