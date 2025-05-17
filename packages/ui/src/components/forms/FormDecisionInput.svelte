<script lang="ts">
  
  import { z } from 'zod';
  import GenericForm from './GenericForm.svelte';

  interface Props {
    json: z.core.JSONSchema.Schema;
  }
  
  let { json }: Props = $props();
  console.log("decision", json)

  let options = $derived(json.anyOf.map(a => a.title))
  console.log("options", options)
  let selectedKey: string = $derived(options[0])
  let selectedJson = $derived(json.anyOf.find(a => a.title === selectedKey))

</script>

<select class="select w-full" bind:value={selectedKey}>
  {#each options as option}
    <option value={option}>
      {option}
    </option>
  {/each}
</select>

<GenericForm json={selectedJson}/>