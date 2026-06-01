<script lang="ts">
  import { achievement, currency, engine, game, statistic } from '$lib/demo/demo.svelte';
  import { onMount } from 'svelte';

  import { page } from '$app/state';
  import { LuiContentHint, LuiContext } from '@123ishatest/lui';
  import { LuiConfigBuilder } from '@123ishatest/lui';

  // TODO(@Isha): Subclass game to handle this nicer?
  //  game.load(page.data.content)
  engine.contentManager.load(page.data.content);

  engine.plugins.currency.loadContent(engine.contentManager.getList('currency'));
  engine.plugins.statistic.loadContent(engine.contentManager.getList('statistic'));
  engine.plugins.achievement.loadContent(engine.contentManager.getList('achievement'));
  engine.plugins.skill.loadContent(engine.contentManager.getList('skill'));
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
    game.engine.resolveRequest({
      type: '/request/farming/sow-seed',
      plant: '/plant/sunflower',
    });

    achievement.checkAchievements();
  };

  const trade = () => {
    game.engine.handleTransaction({
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

  const config = new LuiConfigBuilder().build();
</script>

<LuiContext engine={game.engine} {config}>
  <div class="h-full w-full">
    <div class="flex flex-col space-y-4 p-4">
      <LuiContentHint id="/currency/money">
        <span>You have {money} money</span>
      </LuiContentHint>

      <LuiContentHint id="/currency/gems">
        <p>You have {gems} gems</p>
      </LuiContentHint>

      <LuiContentHint id="/statistic/plants-planted" kind="statistic">
        <p>You have planted {planted} sunflowers</p>
      </LuiContentHint>

      <div class="flex flex-row space-x-2">
        <button class="btn btn-primary" onclick={() => sow()}>Sow</button>
        <button class="btn btn-secondary" onclick={() => trade()}>Trade 100 money for 1 gem</button>
      </div>
    </div>
  </div>
</LuiContext>
