<script lang="ts">
  import { z } from 'zod';
  import JsonSchemaObjectDisplay from './JsonSchemaObjectDisplay.svelte';

  interface Props {
    union: z.core.JSONSchema.Schema;
  }

  let { union }: Props = $props();

  let schemas = $derived(union.anyOf as z.core.JSONSchema.ObjectSchema[]);
</script>

<div class="flex flex-col space-y-2">
  {#each schemas as schema}
    <JsonSchemaObjectDisplay {schema} />
    <div class="divider"></div>
  {/each}
</div>
