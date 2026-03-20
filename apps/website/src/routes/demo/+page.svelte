<script lang="ts">
  import { achievement, currency, engine, game, statistic } from '$lib/demo/demo.svelte';
  import { onMount } from 'svelte';

  import { page } from '$app/state';
  import { contentManager } from '$lib/demo/content';

  // TODO(@Isha): Subclass game to handle this nicer?
  //  game.load(page.data.content)
  contentManager.load(page.data.content);

  engine.plugins.currency.loadContent(contentManager.getList('currency'));
  engine.plugins.statistic.loadContent(contentManager.getList('statistic'));
  engine.plugins.achievement.loadContent(contentManager.getList('achievement'));
  engine.plugins.skill.loadContent(contentManager.getList('skill'));
  game.features.farming.loadContent(contentManager.getList('plant'));

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
</script>

<div class="p-4">
  <p>You have {money} money</p>
  <p>You have {gems} gems</p>
  <p>You have planted {planted} sunflowers</p>

  <button class="btn btn-primary" onclick={() => sow()}>Sow</button>
  <button class="btn btn-secondary" onclick={() => trade()}>Trade 100 money for 1 gem</button>
</div>
