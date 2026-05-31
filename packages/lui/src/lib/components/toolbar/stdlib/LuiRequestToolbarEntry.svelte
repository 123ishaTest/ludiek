<script lang="ts">
  import RequestIcon from '@lucide/svelte/icons/mail-question-mark';
  import LuiToolbarEntry from '$lui/components/toolbar/LuiToolbarEntry.svelte';
  import LuiToolbarCommandList from '$lui/components/toolbar/LuiToolbarCommandList.svelte';

</script>

<LuiToolbarEntry Icon={RequestIcon}>
  {#snippet label(introspection)}
    <span>{introspection.request.commands.length}</span>
  {/snippet}

  {#snippet body(introspection)}
    <LuiToolbarCommandList commands={introspection.request.commands} kind="request" />
  {/snippet}
</LuiToolbarEntry>
