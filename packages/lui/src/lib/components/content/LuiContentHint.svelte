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

{#if isDebug()}
  <div class="indicator">
    {#if children}
      {@render children()}
    {/if}
    <div class="tooltip tooltip-right">
      <svelte:boundary>
        {#snippet failed(error)}
          <span class="indicator-item status status-error"></span>
          <div class="tooltip-content text-left">
            {error}
          </div>
        {/snippet}
        <span class="indicator-item status status-primary cursor-help"></span>
        <div class="tooltip-content text-left">
          <LuiContentCard {id} {kind} />
        </div>
      </svelte:boundary>
    </div>
  </div>


{:else}
  {@render children?.()}
{/if}

