<script lang="ts">
  
  import GenericForm from './GenericForm.svelte';
  import type { JSONSchema4 } from 'json-schema';

  interface Props {
    json: JSONSchema4;
  }
  
  let { json }: Props = $props();

  let options = $derived(json.anyOf?.map(a => a.title ?? "UNKNOWN") ?? ["UNKNOWN"])

  let selectedKey: string = $derived(options[0])
  let selectedJson = $derived(json.anyOf?.find(a => a.title === selectedKey))

</script>

<select class="select w-full" bind:value={selectedKey}>
  {#each options as option}
    <option value={option}>
      {option}
    </option>
  {/each}
</select>

{#if selectedJson}
  <GenericForm json={selectedJson}/>
{/if}
