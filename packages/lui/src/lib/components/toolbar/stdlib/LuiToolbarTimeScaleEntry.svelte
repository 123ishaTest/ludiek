<script lang="ts">
  import TimeScaleIcon from '@lucide/svelte/icons/gauge';
  import { getEngine } from '$lui/util/context';
  import LuiToolbarEntry from '$lui/components/toolbar/LuiToolbarEntry.svelte';

  const engine = getEngine()
  // Bind to timeScale. Does not work with external changes to it
  let timeScale = $state(engine.timeScale);
  $effect(() => {
    engine.timeScale = timeScale;
  })
</script>

<LuiToolbarEntry Icon={TimeScaleIcon}>
  {#snippet label()}
    <div>
      <select class="d-select d-select-ghost" bind:value={timeScale}>
        <option value={0.5}>0.5x</option>
        <option value={1}>1x</option>
        <option value={2}>2x</option>
        <option value={4}>4x</option>
      </select>
    </div>
  {/snippet}
</LuiToolbarEntry>

