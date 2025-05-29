<script lang="ts">
  import type { JSONSchema4 } from 'json-schema';
  import FormObjectInput from './inputs/FormObjectInput.svelte';
  import FormDecisionInput from './FormDecisionInput.svelte';

  interface Props {
    json: JSONSchema4;
    data: any;
    compact?: boolean
  }

  let { json, data, compact=false }: Props = $props();
</script>


{#if json.anyOf}
  <FormDecisionInput {json} {data} {compact} />

{:else if json.type === "object"}
  <FormObjectInput {json} {data} {compact} />
{:else}
  <p>Unknown object type '{json}'</p>
{/if}


