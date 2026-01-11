<script lang="ts">
	import { type Snippet } from 'svelte';
	import { type CurrencyPlugin } from '@123ishatest/ludiek';
	import ErrorBoundary from '$lib/util/ErrorBoundary.svelte';
	import { CurrencyState } from '$lib/ludiek/plugins/currency/CurrencyState.js';
	import { getEngine } from '$lib/util/getEngine.js';

	interface Props {
		render: Snippet<[CurrencyState[]]>;
	}
	let { render }: Props = $props();

	const engine = getEngine<{ plugins: [CurrencyPlugin] }>();
	const state: CurrencyState[] = engine.plugins.currency.currencies.map(
		(c) => new CurrencyState(c.id)
	);
</script>

<!--
@component
`CurrencyComponent` is a component used for displaying currencies
sss
- Usage:
  ```svelte
  <script lang="ts">
    const onGain = (c: CurrencyGained) => {
      console.log("gained", c);
    }
  </script>

  <CurrencyComponent id={currencyId} {onGain}>
    {#snippet render(currency)}
      <div class="flex flex-row items-center space-x-1">
        {#if showIcon}
          <img class="h-8 w-8 pixelated" src={currencyDetail.icon} alt={currencyDetail.icon} />
        {/if}
        <span>You have {currency.amount} {currencyDetail.name}</span>
      </div>
    {/snippet}
  </CurrencyComponent>
  ```
-->
<ErrorBoundary>
	{@render render(state)}
</ErrorBoundary>
