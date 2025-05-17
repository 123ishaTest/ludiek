<script lang="ts">
  import GenericPropertyInput from '../GenericPropertyInput.svelte';
  import { NESTING_SEPARATOR } from '../../../util/form';

  interface Props {
    json: any;
    prefix?: string;
  }

  let { json, prefix = '' }: Props = $props();

  let properties = $derived(json.properties);
  let example = $derived(json.examples?.[0] ?? {});

  let isRequired = (key: string) => {
    return json.required.includes(key);
  };

  console.log('object', json);
</script>

{#each Object.entries(properties) as [key, property]}
  <GenericPropertyInput
    key={prefix ? prefix + NESTING_SEPARATOR + key : key}
    {property}
    required={isRequired(key)}
    {example}
  />

{/each}