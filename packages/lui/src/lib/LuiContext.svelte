<script lang="ts">
  import type { AnyEngine } from '@123ishatest/ludiek';
  import { onMount, type Snippet } from 'svelte';
  import LuiDebugger from '$lui/pages/LuiDebugger.svelte';
  import LuiToolbar from '$lui/components/toolbar/LuiToolbar.svelte';
  import type { LuiConfig } from '$lui/LuiConfig';
  import { isDebug, setConfigContext, setEngine } from '$lui/util/context';

  interface Props {
    engine: AnyEngine;
    config: LuiConfig;
    children?: Snippet;
  }

  let { engine, config, children }: Props = $props();

  setEngine(engine);
  setConfigContext(config);

  let showOverlay = $derived(config.startVisible);

  const toggleOverlay = () => {
    showOverlay = !showOverlay;
  };

  onMount(() => {
    const listener = (e: KeyboardEvent) => {
      if (config.toggleKeys.includes(e.key)) {
        toggleOverlay();
      }
    };
    document.addEventListener('keydown', listener);

    return () => {
      document.removeEventListener('keydown', listener);
    };
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

    {#if config.toolbar.isEnabled}
      <div class="w-full fixed bottom-0 left-0 z-60">
        <LuiToolbar config={config.toolbar} />
      </div>
    {/if}

  {/if}
</svelte:boundary>