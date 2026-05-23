<script lang="ts">
  import type { Snippet } from 'svelte';
  import { isDebug } from '../../util/context.js';
  import LuiContentCard from './LuiContentCard.svelte';

  interface Props {
    id: string;
    kind?: string;

    children?: Snippet;
  }

  let { id, kind, children }: Props = $props();
</script>

{#if isDebug()}
  <div class="d-indicator">
    {#if children}
      {@render children()}
    {/if}
    <div class="d-tooltip d-tooltip-right">
      <svelte:boundary>
        {#snippet failed(error)}
          <span class="d-indicator-item d-status d-status-error"></span>
          <div class="d-tooltip-content text-left">
            {error}
          </div>
        {/snippet}
        <span class="d-indicator-item d-status d-status-primary cursor-help"></span>
        <div class="d-tooltip-content text-left">
          <LuiContentCard {id} {kind} />
        </div>
      </svelte:boundary>
    </div>
  </div>
{:else}
  {@render children?.()}
{/if}

