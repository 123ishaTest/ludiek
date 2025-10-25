<script lang="ts">
  import {
    BuffPlugin,
    createBuffState,
    createCurrencyState,
    CurrencyPlugin,
    LudiekEngine,
    progress,
  } from '@123ishatest/ludiek';
  import type { BuffDetail } from '$lib/demo/model/BuffDetail';
  import { type SeedOutput, SeedProducer } from '$lib/demo/features/SeedOutput';
  import { GlobalSeedModifier } from '$lib/demo/features/GlobalSeedBonus';
  import { SeedModifier } from '$lib/demo/features/SeedBonus';
  import LudiekProgress from '$lib/components/atoms/LudiekProgress.svelte';

  const currencyState = $state(createCurrencyState());
  const currency = new CurrencyPlugin(currencyState);
  const buffState = $state(createBuffState());
  const buff = new BuffPlugin(buffState);

  const engineState = $state({});
  const engine = new LudiekEngine(
    {
      plugins: [currency, buff],
      producers: [new SeedProducer()],
      modifiers: [new SeedModifier(), new GlobalSeedModifier()],
    },
    engineState,
  );
  currency.loadContent([{ id: '/plant/sunflower' }]);

  const buffs: BuffDetail[] = [
    {
      id: '/buff/green-thumb',
      name: 'Green Thumb',
      description: '+10% seed gain',
      durationPerUse: 10,
      effects: [{ type: '/bonus/seed-global', amount: +0.1 }],
    },
    {
      id: '/buff/force-of-nature',
      name: 'Force of Nature',
      description: '+20% seed gain',
      durationPerUse: 5,
      effects: [{ type: '/bonus/seed-global', amount: +0.2 }],
    },
  ];
  buff.loadContent(buffs);

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
    engine.plugins.buff.activeBuffs.forEach((b) => buff.decreaseBuff(b.id, 0.1));
    engine.preTick();
  }, 100);
</script>

<div class="flex flex-col space-y-4">
  <div class="card card-border bg-base-200 w-96">
    <div class="card-body">
      <span class="card-title">You have <span class="text-primary">{money.toFixed(2)}</span> seeds!</span>
      <div class="flex flex-row space-x-4">
        <button class="btn btn-primary" onclick={() => produceOutput()}>Gain {transformedOutput.amount}</button>
      </div>
    </div>
  </div>

  <div class="card card-border bg-base-200 w-96">
    <div class="card-body">
      <div class="flex flex-row space-x-4">
        {#each buffs as b (b.id)}
          {@const isUnlocked = buff.isBuffActive(b.id)}

          <div class="flex flex-col items-center">
            <div class="p-4">
              <button class="btn btn-primary" onclick={() => buff.setBuff(b.id, b.durationPerUse)}>Buff!</button>
            </div>

            <div
              class="bg-base-100 flex h-36 w-36 flex-col items-center justify-around border-2 p-2 {isUnlocked
                ? 'border-primary'
                : 'border-secondary'}"
            >
              <span class="text-center">{b.name}</span>
              <span class="text-center">{b.description}</span>
              <div class="w-full p-1">
                <LudiekProgress showText={false} progress={progress(buff.getDuration(b.id), b.durationPerUse)} />
              </div>
              <span class={isUnlocked ? 'text-primary' : 'text-secondary'}>{isUnlocked ? 'Active' : 'Not active'}</span>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>
