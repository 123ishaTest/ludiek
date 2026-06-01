<script lang="ts">
  import BonusIcon from '@lucide/svelte/icons/sparkles';
  import LuiToolbarEntry from '$lui/components/toolbar/LuiToolbarEntry.svelte';
  import LuiToolbarCommandList from '$lui/components/toolbar/LuiToolbarCommandList.svelte';

</script>

<LuiToolbarEntry Icon={BonusIcon}>
  {#snippet label(introspection)}
    <span>{introspection.bonus.commands.length}</span>
  {/snippet}

  {#snippet body(introspection)}
    <LuiToolbarCommandList commands={introspection.bonus.commands} kind="bonus" />
  {/snippet}
</LuiToolbarEntry>
