<script lang="ts">
  import OutputIcon from '@lucide/svelte/icons/square-arrow-right-exit';
  import LuiToolbarEntry from '$lui/components/toolbar/LuiToolbarEntry.svelte';
  import LuiToolbarCommandList from '$lui/components/toolbar/LuiToolbarCommandList.svelte';

</script>

<LuiToolbarEntry Icon={OutputIcon}>
  {#snippet label(introspection)}
    <span>{introspection.output.commands.length}</span>
  {/snippet}

  {#snippet body(introspection)}
    <LuiToolbarCommandList commands={introspection.output.commands} kind="output" />
  {/snippet}
</LuiToolbarEntry>
