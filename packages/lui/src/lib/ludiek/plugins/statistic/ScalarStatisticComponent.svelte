<script lang="ts">
	import { type Snippet } from 'svelte';
	import ErrorBoundary from '$lib/util/ErrorBoundary.svelte';
	import { ScalarStatisticState } from '$lib/ludiek/plugins/statistic/ScalarStatisticState.js';

	interface Props {
		/**
		 * The id of the statistic
		 */
		id: string;

		render: Snippet<[ScalarStatisticState]>;
	}

	let { id, render }: Props = $props();

	const data: ScalarStatisticState = new ScalarStatisticState(id);
</script>

<ErrorBoundary>
	{@render render(data)}
</ErrorBoundary>
