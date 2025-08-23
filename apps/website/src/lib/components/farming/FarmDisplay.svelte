<script lang="ts">
  import type { Farming } from '$lib/demo/features/Farming.svelte';
  import FarmPlot from '$lib/components/farming/FarmPlot.svelte';
  import { getCurrency, getPlant, type PlantId, plants } from '$lib/demo/content';
  import { asset } from '$app/paths';
  import { currency, game } from '$lib/demo/demo.svelte';
  import CurrencyDisplay from '$lib/components/CurrencyDisplay.svelte';

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

  const buySeed = (id: PlantId) => {
    const plant = getPlant(id);
    game.engine.handleTransaction({
      input: {
        type: 'currency',
        id: '/currency/money',
        amount: plant.seedCost,
      },
      output: {
        type: 'currency',
        id: plant.id,
        amount: 1,
      },
    });
  };

  const harvestAll = (): void => {
    for (let i = 0; i < farming.FARM_PLOTS; i++) {
      farming.reap(i);
    }
  };

  const plantAll = (): void => {
    for (let i = 0; i < farming.FARM_PLOTS; i++) {
      farming.sow(i, selectedSeed);
    }
  };
</script>


<br>
<br>
<div class="flex flex-col">

  <div class="flex flex-row justify-center">



      <div class="flex flex-row space-x-8">

        <div class="flex flex-col">
          <div class="flex flex-row justify-center space-x-4 mb-4">

            <button class="btn btn-success" onclick={() => plantAll()}>Toggle amounts</button>
            <button class="btn btn-success" onclick={() => harvestAll()}>Or something</button>
          </div>

        <table class="table w-min h-min">
          <tbody>
          {#each plants as plant (plant.id)}

            <tr onclick="{() => selectSeed(plant.id)}"
                class="cursor-pointer {selectedSeed === plant.id ? 'bg-base-200' : ''}"
            >
              <td>
                <div class="flex flex-row items-center space-x-2">
                  <img class="pixelated h-4 w-4" src={asset(plant.stages[0])} alt={plant.name} />
                  <span>{plant.name}</span>
                </div>
              </td>
              <td><span>{currency.getBalance(plant.id)}</span>
              </td>
              <td>
                <button class="btn btn-success w-28" onclick={() => buySeed(plant.id)}>
                  Buy
                  <CurrencyDisplay amount={plant.seedCost} currency={getCurrency('/currency/money')} />
                </button>
              </td>
            </tr>
          {/each}
          </tbody>
        </table>

        </div>
        <div class="flex flex-col">

          <div class="flex flex-row justify-center space-x-4 mb-4">

            <button class="btn btn-success" onclick={() => plantAll()}>Plant All</button>
            <button class="btn btn-success" onclick={() => harvestAll()}>Harvest All</button>
          </div>

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
</div>
