<script lang="ts">
  import { content } from '$lib/demo/content';
  import type { CurrencyGained } from '@123ishatest/ludiek';
  import { CurrencyComponent } from '@123ishatest/lui';
  import { Spring } from 'svelte/motion';

  interface Props {
    currencyId: string;
    showIcon?: boolean;
  }

  let { currencyId, showIcon = true }: Props = $props();

  // Grab your own content details
  let currencyDetail = $derived(content.getCurrency(currencyId));

  // Create a helper state using the Builder pattern
  // const currencyState = new CurrencyState(currencyId);

  // Add some sweet, sweet tweening
  const value = new Spring(0, {
    stiffness: 0.13,
    damping: 0.4,
  });

  // Subscribe to events
  const onChange = (event: CurrencyGained) => {
    value.set(event.balance);
    console.log(event);
  };
</script>

<!-- Or use the Component pattern -->
<CurrencyComponent id={currencyId} {onChange}>
  {#snippet render(currency)}
    <div class="flex flex-row items-center space-x-1">
      {#if showIcon}
        <img class="pixelated h-8 w-8" src={currencyDetail.icon} alt={currencyDetail.icon} />
      {/if}
      <span>{currency.amount}</span>
    </div>
  {/snippet}
</CurrencyComponent>
