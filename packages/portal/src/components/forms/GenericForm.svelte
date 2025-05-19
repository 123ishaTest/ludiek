<script lang="ts">
  import type { JSONSchema4 } from 'json-schema';
  import FormObjectInput from './inputs/FormObjectInput.svelte';
  import FormDecisionInput from './FormDecisionInput.svelte';

  interface Props {
    json: JSONSchema4;
  }

  let { json }: Props = $props();
</script>


{#if json.anyOf}
  <FormDecisionInput {json} />

{:else if json.type === "object"}
  <FormObjectInput {json} />
{:else}
  <p>Unknown object type '{json}'</p>
{/if}


