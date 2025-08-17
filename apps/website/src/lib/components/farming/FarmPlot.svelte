<script lang="ts">
  import type { FarmPlotState } from '$lib/demo/features/FarmingState';
  import { getPlant } from '$lib/demo/content';
  import { farming } from '$lib/demo/demo.svelte';
  import { asset } from '$app/paths';
  import type { Asset } from '$app/types';

  interface Props {
    index: number;
    plot: FarmPlotState;
  }

  let { index, plot }: Props = $props();

  let plant = $derived(plot.plant ? getPlant(plot.plant) : null);
  let plantIcon = $derived(asset(farming.getGrowthStage(index) as Asset));
</script>

<div class="border-primary h-24 w-24 border">
  {#if plant}
    <div class="flex h-full flex-col items-center justify-between p-3">
      <img class="pixelated h-12 w-12" src={plantIcon} alt={plant.name} />
      {#if !farming.isReady(index)}
        <progress class="progress progress-info" value={plot.progress} max={plant.growthTime}></progress>
      {/if}
    </div>
  {/if}
</div>
