<script lang="ts">
  import { achievement, currency, game, statistic } from '$lib/demo/demo.svelte';
  import { onMount } from 'svelte';
  import { setEngine } from '@123ishatest/lui';
  import MyCurrencyDisplay from './MyCurrencyDisplay.svelte';
  import MySkillDisplay from './MySkillDisplay.svelte';
  import { CurrencyListComponent } from '@123ishatest/lui';

  let planted = $derived(statistic.getMapValue('/statistic/plants-planted', '/plant/sunflower'));

  let money = $derived(currency.getBalance('/currency/money'));
  let gems = $derived(currency.getBalance('/currency/gems'));

  currency.onCurrencyGain.sub((c) => {
    if (c.id === '/currency/money') {
      statistic.incrementStatistic('/statistic/total-money', c.amount);
    }
  });

  achievement.onAchievementEarn.sub((a) => {
    console.log('Achievement gained:', a);
  });

  const sow = () => {
    game.request({
      // TODO(@Isha): Move this into a game.request combined type
      type: '/farming/sow-seed',
      plant: '/plant/sunflower',
    });

    achievement.checkAchievements();

    game.engine.produce({
      type: '/skill/gain-experience',
      skill: '/skill/farming',
      amount: 1,
    });
  };

  const trade = () => {
    game.handleTransaction({
      input: {
        type: '/input/lose-currency',
        id: '/currency/money',
        amount: 100,
      },
      output: {
        type: '/output/gain-currency',
        id: '/currency/gems',
        amount: 1,
      },
    });
  };

  onMount(() => {
    game.loadFromStorage();
    game.start();
  });

  setEngine(game.engine);
</script>

<div class="p-4">
  <CurrencyListComponent>
    {#snippet render(currencies)}
      <div class="flex flex-col space-x-4">
        {#each currencies as currency (currency.id)}
          <MyCurrencyDisplay currencyId={currency.id} />
        {/each}
      </div>
    {/snippet}
  </CurrencyListComponent>

  <p>You have planted {planted} sunflowers</p>

  <!--  <MyStatisticDisplay statisticId="/statistic/total-money"/>-->
  <MySkillDisplay skillId="/skill/farming" />

  <button class="btn btn-primary" onclick={() => sow()}>Sow</button>
  <button class="btn btn-secondary" onclick={() => trade()}>Trade 100 money for 1 gem</button>
</div>
