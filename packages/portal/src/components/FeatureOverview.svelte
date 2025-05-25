<script lang="ts">

  import { EngineConceptDefinition, type EngineContribution } from '@123ishatest/ludiek';
  import { z } from 'zod';

  interface Props {
    title?: string;
    contribution: EngineContribution;
  }

  let { title, contribution }: Props = $props();


  // TODO(@Isha): Move towards engine somewhere
  type ConceptType = 'effect' | 'number' | 'requirement' | 'content'

  const getConceptStyle = (concept: ConceptType): string => {
    return {
      'effect': 'badge-success',
      'number': 'badge-info',
      'requirement': 'badge-error',
      'content': 'badge-warning',
    }[concept];
  };
</script>

{#snippet concept(name: ConceptType, contributions: EngineConceptDefinition[])}
  {#each contributions as definition}
    {@const json = z.toJSONSchema(definition.schema, { io: 'input' })}
    <tr>
      <td>
        <span class="badge {getConceptStyle(name)}">{name}</span>
      </td>
      <td>{json.title}</td>

      <td>{json.description}</td>
      <td>{Object.keys(json.properties).join(", ")}</td>
    </tr>
  {/each}
{/snippet}

{#if title}
  <h2 class="card-title">{title}</h2>
{/if}

<table class="table mt-0">
  <thead>
  <tr>
    <th>Type</th>
    <th>Name</th>
    <th>Description</th>
    <th>Arguments</th>
  </tr>
  </thead>
  <tbody>

  {@render concept('effect', contribution.engine.effects)}
  {@render concept('number', contribution.engine.numbers)}
  {@render concept('requirement', contribution.engine.requirements)}
  {@render concept('content', contribution.content)}

  </tbody>
</table>
