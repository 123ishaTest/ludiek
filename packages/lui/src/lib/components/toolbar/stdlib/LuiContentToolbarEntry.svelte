<script lang="ts">
  import ContentIcon from '@lucide/svelte/icons/book-open-text';
  import LuiToolbarEntry from '$lui/components/toolbar/LuiToolbarEntry.svelte';

</script>

<LuiToolbarEntry Icon={ContentIcon}>
  {#snippet label(introspection)}
    <span>{introspection.content.kinds.length}</span>
  {/snippet}

  {#snippet body(introspection)}
    <ul class="d-list d-rounded-box shadow-md">
      {#each introspection.content.kinds as kind (kind.kind)}
        <li class="d-list-row">
          <div class="text-left capitalize">{kind.kind}</div>
        </li>
      {:else}
        <li class="d-list-row">No content registered</li>
      {/each}
    </ul>
    {/snippet}
</LuiToolbarEntry>
