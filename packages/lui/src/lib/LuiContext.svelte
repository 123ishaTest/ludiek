<script lang="ts">
  import type { AnyEngine } from '@123ishatest/ludiek';
  import { onMount, type Snippet } from 'svelte';
  import { isDebug, setContentREnderRegistry, setEngine } from './util/context.js';
  import LuiDebugger from './pages/LuiDebugger.svelte';
  import LuiToolbar from './components/toolbar/LuiToolbar.svelte';
  import {
    defaultContentRenderRegistry,
    type LuiContentRenderRegistry,
  } from './components/content/render/LuiContentRenderRegistry';

  interface Props {
    engine: AnyEngine;
    toggleKeys?: string[];
    openVisible?: boolean,
    withToolbar?: boolean
    children?: Snippet;
    contentRenderRegistry?: LuiContentRenderRegistry
  }

  let { engine, children, openVisible = false, withToolbar = true, toggleKeys = ['§', '`'], contentRenderRegistry = defaultContentRenderRegistry }: Props = $props();

  setEngine(() => engine);
  setContentREnderRegistry(() => contentRenderRegistry)

  let showOverlay = $derived(openVisible);

  const toggleOverlay = () => {
    showOverlay = !showOverlay;
  };

  onMount(() => {
    const listener = (e: KeyboardEvent) => {
      if (toggleKeys.includes(e.key)) {
        toggleOverlay();
      }
    };
    document.addEventListener('keydown', listener);

    return () => {
      document.removeEventListener('keydown', listener)
    }
  });

</script>

<svelte:boundary>
  {#snippet failed(error)}
    <p>Lui error: {error}</p>
  {/snippet}

  {#if children}
    {@render children()}
  {/if}

  <!-- Debug-only overlays -->
  {#if isDebug()}

    <div
      data-theme="dark"
      class="lui fixed inset-0 z-50 bg-base-200 pb-18"
      class:hidden={!showOverlay}
    >
      <LuiDebugger />
    </div>

    {#if withToolbar}
      <div class="w-full fixed bottom-0 left-0 z-60">
        <LuiToolbar />
      </div>
    {/if}

  {/if}
</svelte:boundary>