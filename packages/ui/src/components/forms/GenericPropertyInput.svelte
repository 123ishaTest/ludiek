<script lang="ts">
  import FormNumberInput from './inputs/FormNumberInput.svelte';
  import FormStringInput from './inputs/FormStringInput.svelte';
  import FormConstInput from './inputs/FormConstInput.svelte';
  import FormBooleanInput from './inputs/FormBooleanInput.svelte';
  import FormObjectInput from './inputs/FormObjectInput.svelte';
  import { labelFormat } from '../../util/form';

  interface Props {
    property: any;
    key: string;
    required: boolean;
    example?: any;
  }

  let { property, key, example = {}, required }: Props = $props();
</script>


{#if property.const }
  <FormConstInput
    label={key}
    value={property.const}
  />
{:else if property.type === "object" }
  <div class="p-4">
    <h2 class="card-title">{labelFormat(key)}</h2>
    <FormObjectInput prefix={key} json={property} />
  </div>
{:else if property.type === "string" }
  <FormStringInput
    label={key}
    placeholder={example[key]}
    required={required}
  />
{:else if property.type === "boolean" }
  <FormBooleanInput
    label={key}
    required={required}
  />
{:else if property.type === "number"}
  <FormNumberInput
    label={key}
    placeholder={example[key]}
    required={required}
  />
{:else if property.type === "integer"}
  <FormNumberInput
    label={key}
    placeholder={example[key]}
    required={required}
  />
{:else if property.anyOf}
  <FormStringInput
    label={key}
    placeholder={example[key]}
    required={required}
  />
{:else}
  <span>UNKNOWN property for {key}: {JSON.stringify(property)}</span>
{/if}