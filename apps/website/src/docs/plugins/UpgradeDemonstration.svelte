<script lang="ts">
  import {
    createCurrencyState,
    createUpgradeState,
    LoseCurrencyConsumer,
    CurrencyPlugin,
    LudiekEngine,
    UpgradePlugin,
  } from '@123ishatest/ludiek';
  import { type SeedOutput, SeedProducer } from '$lib/demo/features/SeedOutput';
  import { GlobalSeedModifier } from '$lib/demo/features/GlobalSeedBonus';
  import { SeedModifier } from '$lib/demo/features/SeedBonus';

  const currencyState = $state(createCurrencyState());
  const currency = new CurrencyPlugin(currencyState);
  const upgradeState = $state(createUpgradeState());
  const upgrade = new UpgradePlugin(upgradeState);

  const engineState = $state({});
  const engine = new LudiekEngine(
    {
      plugins: [currency, upgrade],
      consumers: [new LoseCurrencyConsumer()],
      producers: [new SeedProducer()],
      modifiers: [new SeedModifier(), new GlobalSeedModifier()],
    },
    engineState,
  );
  currency.loadContent([{ id: '/plant/sunflower' }]);

  const upgrades = [
    {
      id: '/upgrade/shovel',
      name: 'Shovel',
      description: '+10% money',
      bonusPerLevel: [
        { type: '/bonus/seed-global', amount: +0.1 },
        { type: '/bonus/seed-global', amount: +0.1 },
        { type: '/bonus/seed-global', amount: +0.1 },
      ],
      costPerLevel: [
        { type: '/input/lose-currency', id: '/plant/sunflower', amount: 10 },
        { type: '/input/lose-currency', id: '/plant/sunflower', amount: 20 },
        { type: '/input/lose-currency', id: '/plant/sunflower', amount: 30 },
      ],
      accumulateBonuses: true,
    },
    {
      id: '/upgrade/watering-can',
      name: 'Watering Can',
      description: '+20% money',
      bonusPerLevel: [
        { type: '/bonus/seed-global', amount: +0.2 },
        { type: '/bonus/seed-global', amount: +0.4 },
        { type: '/bonus/seed-global', amount: +0.6 },
      ],
      costPerLevel: [
        { type: '/input/lose-currency', id: '/plant/sunflower', amount: 20 },
        { type: '/input/lose-currency', id: '/plant/sunflower', amount: 40 },
        { type: '/input/lose-currency', id: '/plant/sunflower', amount: 60 },
      ],
      accumulateBonuses: false,
    },
  ];
  upgrade.loadContent(upgrades);

  const output: SeedOutput = $state({
    type: '/output/seed',
    plant: '/plant/sunflower',
    amount: 1,
  });

  let transformedOutput = $derived(engine.modifyOutput(output));

  const produceOutput = () => {
    engine.produce(output);
  };

  let money = $derived(currency.getBalance('/plant/sunflower'));

  setInterval(() => {
    engine.preTick();
  }, 100);
</script>

<div class="flex flex-col space-y-4">
  <div class="card card-border bg-base-200 w-96">
    <div class="card-body">
      <span class="card-title">You have <span class="text-primary">{money.toFixed(2)}</span> money!</span>
      <div class="flex flex-row space-x-4">
        <button class="btn btn-primary" onclick={() => produceOutput()}
          >Gain {transformedOutput.amount.toFixed(2)}</button
        >
      </div>
    </div>
  </div>

  <div class="card card-border bg-base-200 w-96">
    <div class="card-body">
      <div class="flex flex-col space-y-4">
        {#each upgrades as u (u.id)}
          {@const isMax = upgrade.isMaxLevel(u.id)}
          {@const canBuy = upgrade.canBuyUpgrade(u.id)}
          {@const btnStyle = canBuy ? 'btn-primary' : 'btn-secondary'}

          <div class="flex flex-col items-center">
            <div class="flex flex-row items-center space-x-4 p-2">
              <button class="btn {btnStyle}" onclick={() => upgrade.buyUpgrade(u.id)}>
                {u.description}
              </button>
              <span class={isMax ? 'text-secondary' : 'text-primary'}>{isMax ? 'Max' : upgrade.getLevel(u.id)}</span>
            </div>
            {#if !isMax}
              <span class="text-center">Cost: -{upgrade.getCost(u.id).amount.toFixed(2)}</span>
            {/if}
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>
