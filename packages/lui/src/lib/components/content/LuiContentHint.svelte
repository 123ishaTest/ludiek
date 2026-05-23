<script lang="ts">
  import LuiContentCard from '$lib/components/content/LuiContentCard.svelte';
  import type { Snippet } from 'svelte';
  import { isDebug } from '$lib/util/context.js';

  interface Props {
    id: string;
    kind?: string;

    children?: Snippet;
  }

  let { id, kind, children }: Props = $props();

</script>

<svelte:boundary>

  {#if isDebug()}
    <div class="indicator">
      {#if children}
        {@render children()}
      {/if}
      <div class="tooltip tooltip-right">

        <span class="indicator-item status status-primary cursor-help"></span>
        <div class="tooltip-content text-left">
          <LuiContentCard {id} {kind} />
        </div>
      </div>
    </div>


    <!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
    {#snippet failed()}
      <p>Could not find content with id '{id}' for kind '{kind}'</p>
    {/snippet}

  {:else}
    {@render children?.()}
  {/if}

</svelte:boundary>
