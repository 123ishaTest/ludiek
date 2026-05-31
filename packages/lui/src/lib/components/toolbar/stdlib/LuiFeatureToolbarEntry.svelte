<script lang="ts">
  import FeatureIcon from '@lucide/svelte/icons/joystick';
  import LuiToolbarEntry from '$lui/components/toolbar/LuiToolbarEntry.svelte';

</script>

<LuiToolbarEntry Icon={FeatureIcon}>
  {#snippet label(introspection)}
    <span>{introspection.features.features.length}</span>
  {/snippet}

  {#snippet body(introspection)}
    <ul class="d-list shadow-md">
      {#each introspection.features.features as feature (feature.type)}
        <li class="d-list-row">
          <div class="text-left capitalize">{feature.type}</div>
        </li>
      {:else}
        <li class="d-list-row">No features registered</li>
      {/each}
    </ul>
  {/snippet}
</LuiToolbarEntry>
