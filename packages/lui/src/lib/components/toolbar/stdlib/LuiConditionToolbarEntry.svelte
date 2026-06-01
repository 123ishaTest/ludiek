<script lang="ts">
  import ConditionIcon from '@lucide/svelte/icons/equal';
  import LuiToolbarEntry from '$lui/components/toolbar/LuiToolbarEntry.svelte';
  import LuiToolbarCommandList from '$lui/components/toolbar/LuiToolbarCommandList.svelte';

</script>

<LuiToolbarEntry Icon={ConditionIcon}>
  {#snippet label(introspection)}
    <span>{introspection.condition.commands.length}</span>
  {/snippet}

  {#snippet body(introspection)}
    <LuiToolbarCommandList commands={introspection.condition.commands} kind="condition" />
  {/snippet}
</LuiToolbarEntry>
