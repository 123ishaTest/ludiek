<script lang="ts">

  import type { EngineContribution } from '@123ishatest/ludiek';
  import EngineDefinitionOverview from './engine/EngineDefinitionOverview.svelte';
  import EngineContentOverview from './engine/EngineContentOverview.svelte';

  interface Props {
    title?: string;
    contribution: EngineContribution;
  }

  let { title, contribution }: Props = $props();
</script>

{#if title}
  <h2 class="card-title">{title}</h2>
{/if}

<div class="flex flex-col space-y-8">
  <EngineDefinitionOverview title="Effect" definitions={contribution.engine.effects} />
  <EngineDefinitionOverview title="Number" definitions={contribution.engine.numbers} />
  <EngineDefinitionOverview title="Requirement" definitions={contribution.engine.requirements} />
</div>

<EngineContentOverview definitions={contribution.content}/>
