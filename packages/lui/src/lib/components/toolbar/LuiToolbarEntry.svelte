<script lang="ts">
  import type { LucideProps } from '@lucide/svelte';
  import type { Component, Snippet } from 'svelte';

  interface Props {
    BadgeIcon: Component<LucideProps>;
    value?: number;
    children?: Snippet;
  }

  let { BadgeIcon, value, children }: Props = $props();
</script>

<div class="d-tooltip">
  <div class="d-tooltip-content absolute max-w-100">
    {#if children}
      {@render children()}
    {/if}
  </div>
  <div class="d-btn flex flex-row items-center d-text-primary">
    <BadgeIcon size={16} />
    <span class="d-text-base-content/50">{value}</span>
  </div>
</div>
