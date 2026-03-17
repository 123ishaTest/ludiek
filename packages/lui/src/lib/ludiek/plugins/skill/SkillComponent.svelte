<script lang="ts">
	import { type Snippet } from 'svelte';
	import ErrorBoundary from '$lib/util/ErrorBoundary.svelte';
	import { SkillState } from '$lib/ludiek/plugins/skill/SkillState.js';
	import type { ExperienceGained } from '@123ishatest/ludiek';

	interface Props {
		/**
		 * The id of the skill
		 */
		id: string;

		/**
		 * @see SkillPlugin.onExperienceGain
		 * @param event
		 */
		onExperienceGain?: (event: ExperienceGained) => void;

		render: Snippet<[SkillState]>;
	}

	let { id, render, onExperienceGain }: Props = $props();

	const state: SkillState = new SkillState(id);

	$effect(() => {
		return state.onExperienceGained.sub((c) => {
			if (c.id === id) {
				onExperienceGain?.(c);
			}
		});
	});
</script>

<ErrorBoundary>
	{@render render(state)}
</ErrorBoundary>
