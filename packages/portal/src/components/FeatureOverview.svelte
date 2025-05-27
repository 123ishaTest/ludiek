<script lang="ts">

  import { type EngineContribution } from '@123ishatest/ludiek';
  import DefinitionDisplay from './DefinitionDisplay.svelte';

  interface Props {
    title?: string;
    contribution: EngineContribution;
  }

  let { title, contribution }: Props = $props();


</script>


{#if title}
  <h2 class="card-title">{title}</h2>
{/if}

<div class="flex flex-col space-y-3">
  {#each contribution.engine.effects as effect}
    <DefinitionDisplay concept="effect" definition={effect} />
  {/each}
  {#each contribution.engine.numbers as number}
    <DefinitionDisplay concept="number" definition={number} />
  {/each}
  {#each contribution.engine.requirements as requirement}
    <DefinitionDisplay concept="requirement" definition={requirement} />
  {/each}
  {#each contribution.content as content}
    <DefinitionDisplay concept="content" definition={content} />
  {/each}
</div>
