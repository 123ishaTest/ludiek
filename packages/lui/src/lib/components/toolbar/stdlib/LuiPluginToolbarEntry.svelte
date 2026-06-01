<script lang="ts">
  import PluginIcon from '@lucide/svelte/icons/plug';
  import LuiToolbarEntry from '$lui/components/toolbar/LuiToolbarEntry.svelte';

</script>

<LuiToolbarEntry Icon={PluginIcon}>
  {#snippet label(introspection)}
    <span>{introspection.plugins.plugins.length}</span>
  {/snippet}

  {#snippet body(introspection)}
    <ul class="d-list shadow-md">
      {#each introspection.plugins.plugins as plugin (plugin.type)}
        <li class="d-list-row">
          <div class="text-left capitalize">{plugin.type}</div>
        </li>
      {:else}
        <li class="d-list-row">No plugins registered</li>
      {/each}
    </ul>
  {/snippet}
</LuiToolbarEntry>
