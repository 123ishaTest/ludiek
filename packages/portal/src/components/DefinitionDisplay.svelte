<script lang="ts">
  import { EngineConceptDefinition } from '@123ishatest/ludiek';
  import { z } from 'zod';
  import type { EngineConceptType } from '@123ishatest/ludiek/src/engine/concepts/EngineConceptType.js';
  import JsonSchemaObjectDisplay from './JsonSchemaObjectDisplay.svelte';
  import JsonSchemaUnionDisplay from './JsonSchemaUnionDisplay.svelte';

  interface Props {
    concept: EngineConceptType;
    definition: EngineConceptDefinition;
  }

  let { concept, definition }: Props = $props();

  let json = $derived(z.toJSONSchema(definition.schema, { io: 'input' }));

  let style = $derived.by(() => {
    return {
      'effect': 'bg-success-content/40  border-success',
      'number': 'bg-info-content/40  border-info',
      'requirement': 'bg-error-content/40  border-error',
      'content': 'bg-warning-content/40  border-warning',
    }[concept];
  });

  let badgeStyle = $derived.by(() => {
    return {
      'effect': 'badge-success',
      'number': 'badge-info',
      'requirement': 'badge-error',
      'content': 'badge-warning',
    }[concept];
  });


</script>

<div class="collapse {style}">
  <input type="checkbox" class="peer" />
  <div class="collapse-title border peer-checked:border-b-0 peer-checked:rounded-b-none rounded-lg {style}">

    <div class="flex flex-row items-center space-x-4">
      <span class="w-24 font-bold badge {badgeStyle}">{concept}</span>
      <span>{json.title}</span>
      <span class="text-xs">{json.description}</span>
    </div>
  </div>
  <div class="collapse-content text-sm border rounded-xl {style} peer-checked:rounded-t-none">

    {#if json.anyOf}
      <JsonSchemaUnionDisplay union={json}></JsonSchemaUnionDisplay>
    {:else}
      <JsonSchemaObjectDisplay schema={json} />
    {/if}
  </div>
</div>

