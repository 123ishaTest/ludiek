<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<svelte:boundary onerror={(e) => console.error(e)}>
	{@render children()}

	{#snippet failed(e)}
		<span class="ludiek-error">
			{e}
		</span>
	{/snippet}
</svelte:boundary>
