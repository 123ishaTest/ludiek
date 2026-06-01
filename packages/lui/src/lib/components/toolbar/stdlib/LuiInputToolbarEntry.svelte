<script lang="ts">
  import InputIcon from '@lucide/svelte/icons/square-arrow-right-enter';
  import LuiToolbarEntry from '$lui/components/toolbar/LuiToolbarEntry.svelte';
  import LuiToolbarCommandList from '$lui/components/toolbar/LuiToolbarCommandList.svelte';

</script>

<LuiToolbarEntry Icon={InputIcon}>
  {#snippet label(introspection)}
    <span>{introspection.input.commands.length}</span>
  {/snippet}

  {#snippet body(introspection)}
    <LuiToolbarCommandList commands={introspection.input.commands} kind="input" />
  {/snippet}
</LuiToolbarEntry>
