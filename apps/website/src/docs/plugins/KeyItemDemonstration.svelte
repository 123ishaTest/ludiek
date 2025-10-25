<script lang="ts">
  import {
    createCurrencyState,
    createKeyItemState,
    CurrencyPlugin,
    KeyItemPlugin,
    LudiekEngine,
  } from '@123ishatest/ludiek';
  import type { KeyItemDetail } from '$lib/demo/model/KeyItemDetail';
  import { type SeedOutput, SeedProducer } from '$lib/demo/features/SeedOutput';
  import { GlobalSeedModifier } from '$lib/demo/features/GlobalSeedBonus';
  import { SeedModifier } from '$lib/demo/features/SeedBonus';

  const currencyState = $state(createCurrencyState());
  const currency = new CurrencyPlugin(currencyState);
  const keyItemState = $state(createKeyItemState());
  const keyItem = new KeyItemPlugin(keyItemState);

  const engineState = $state({});
  const engine = new LudiekEngine(
    {
      plugins: [currency, keyItem],
      producers: [new SeedProducer()],
      modifiers: [new SeedModifier(), new GlobalSeedModifier()],
    },
    engineState,
  );
  currency.loadContent([{ id: '/plant/sunflower' }]);

  const keyItems: KeyItemDetail[] = [
    {
      id: '/key-item/silver-coin',
      name: 'Silver coin',
      description: '+10% coins gain',
      rewards: [{ type: '/bonus/seed-global', amount: +0.1 }],
    },
    {
      id: '/key-item/gold-coin',
      name: 'Gold coin',
      description: '+20% money gain',
      rewards: [{ type: '/bonus/seed-global', amount: +0.2 }],
    },
  ];
  keyItem.loadContent(keyItems);

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
        <button class="btn btn-primary" onclick={() => produceOutput()}>Gain {transformedOutput.amount}</button>
      </div>
    </div>
  </div>

  <div class="card card-border bg-base-200 w-96">
    <div class="card-body">
      <div class="flex flex-row space-x-4">
        {#each keyItems as item (item.id)}
          {@const isUnlocked = keyItem.hasKeyItem(item.id)}

          <div class="flex flex-col items-center">
            <div class="p-4">
              <button class="btn btn-primary" onclick={() => keyItem.gainKeyItem(item.id)}>Unlock!</button>
            </div>

            <div
              class="bg-base-100 flex h-36 w-36 flex-col items-center justify-around border-2 p-2 {isUnlocked
                ? 'border-primary'
                : 'border-secondary'}"
            >
              <span class="text-center">{item.name}</span>
              <span class="text-center">{item.description}</span>
              <span class={isUnlocked ? 'text-primary' : 'text-secondary'}>{isUnlocked ? 'Earned' : 'Not earned'}</span>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>
