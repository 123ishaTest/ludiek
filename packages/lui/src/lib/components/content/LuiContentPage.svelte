<script lang="ts">
  import { getIntrospection } from '$lui/util/context';
  import LuiContentSelector from '$lui/components/content/LuiContentSelector.svelte';
  import LuiContentTable from '$lui/components/content/LuiContentTable.svelte';

  const introspection = $derived(getIntrospection().content);
  let hasContent = $derived(introspection?.kinds?.length > 0);

  let selectedKind = $derived(introspection?.kinds[0]?.kind);
  let selectedIntrospection = $derived(introspection.kinds.find(k => k.kind === selectedKind));

</script>

{#if !hasContent}
  <p>No content found</p>
{:else}
  <div class="flex flex-col space-x-4">
    <LuiContentSelector {introspection} bind:selectedKind={selectedKind} />
    {#if selectedIntrospection}
      <LuiContentTable introspection={selectedIntrospection} />
    {:else}
      <p>No kind selected</p>
    {/if}
  </div>
{/if}
