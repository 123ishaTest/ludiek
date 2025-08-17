<script lang="ts">
  import type { Farming } from '$lib/demo/features/Farming.svelte';
  import FarmPlot from '$lib/components/farming/FarmPlot.svelte';
  import { plants } from '$lib/demo/content';
  import { asset } from '$app/paths';
  import { currency, type PlantId } from '$lib/demo/demo.svelte';

  interface Props {
    farming: Farming;
  }

  let { farming }: Props = $props();

  const plotClicked = (index: number) => {
    if (farming.isReady(index)) {
      farming.reap(index);
    } else {
      farming.sow(index, selectedSeed);
    }
  };

  let selectedSeed: PlantId = $state(plants[0].id);

  const selectSeed = (id: PlantId) => {
    selectedSeed = id;
  };
</script>

<div class="flex flex-col">
  <div class="flex flex-row justify-center">
    <div class="flex flex-row items-center space-x-8">
      <ul class="menu bg-base-200 rounded-box w-56">
        {#each plants as plant (plant.id)}
          <li class={currency.getBalance(plant.id) === 0 ? 'menu-disabled' : ''}>
            <button class={selectedSeed === plant.id ? 'menu-active' : ''} onclick={() => selectSeed(plant.id)}>
              <img class="pixelated h-4 w-4" src={asset(plant.stages[0])} alt={plant.name} />
              <span>{plant.name}</span>
              <span>{currency.getBalance(plant.id)}</span>
            </button>
          </li>
        {/each}
      </ul>

      <div class="grid grid-cols-5 gap-4">
        {#each farming.plots as plot, i (i)}
          <button
            class="cursor-pointer"
            onclick={() => {
              plotClicked(i);
            }}
          >
            <FarmPlot {plot} index={i}></FarmPlot>
          </button>
        {/each}
      </div>
    </div>
  </div>
</div>
