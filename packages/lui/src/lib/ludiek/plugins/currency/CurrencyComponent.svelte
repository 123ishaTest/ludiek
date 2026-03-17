<script lang="ts">
	import { type Snippet } from 'svelte';
	import { type CurrencyChanged, type CurrencyGained } from '@123ishatest/ludiek';
	import { CurrencyState } from '$lib/ludiek/plugins/currency/CurrencyState.js';
	import ErrorBoundary from '$lib/util/ErrorBoundary.svelte';

	interface Props {
		/**
		 * The id of the currency
		 */
		id: string;

		/**
		 * @see CurrencyPlugin.onCurrencyGain
		 * @param event
		 */
		onGain?: (event: CurrencyGained) => void;

		/**
		 * @see CurrencyPlugin.onCurrencyChange
		 * @param event
		 */
		onChange?: (event: CurrencyChanged) => void;

		render: Snippet<[CurrencyState]>;
	}

	let { id, render, onGain, onChange }: Props = $props();

	const state: CurrencyState = new CurrencyState(id);

	$effect(() => {
		state.onCurrencyGain.sub((c) => {
			if (c.id === id) {
				onGain?.(c);
			}
		});

		state.onCurrencyChange.sub((c) => {
			if (c.id === id) {
				onChange?.(c);
			}
		});
	});
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
