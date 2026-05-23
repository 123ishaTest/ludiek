<script lang="ts">
  import type { AnyEngine } from '@123ishatest/ludiek';
  import { onMount, type Snippet } from 'svelte';
  import { isDebug, setEngine } from './util/context.js';
  import LuiDebugger from './pages/LuiDebugger.svelte';
  import LuiToolbar from './components/toolbar/LuiToolbar.svelte';

  interface Props {
    engine: AnyEngine;
    toggleKeys?: string[];
    openVisible?: boolean,
    withToolbar?: boolean
    children?: Snippet;
  }

  let { engine, children, openVisible = false, withToolbar = true, toggleKeys = ['§', '`'] }: Props = $props();

  setEngine(() => engine);

  let showOverlay = $derived(openVisible);

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


<svelte:boundary>
  {#snippet failed(error)}
    <p>Lui error: {error}</p>
  {/snippet}

  {#if isDebug()}
    {#if children}
      {@render children()}
    {/if}

    <div data-theme="dark" class="lui inset-0 pb-18 absolute z-50 bg-base-200" class:hidden={!showOverlay}>
      <LuiDebugger />
    </div>

    {#if withToolbar}
      <LuiToolbar />
    {/if}

  {:else}
    {#if children}
      {@render children()}
    {/if}
  {/if}
</svelte:boundary>
