<script lang="ts">
  import { achievement, currency, game, statistic } from '$lib/demo/demo.svelte';
  import { onMount } from 'svelte';

  let money = $derived(currency.getBalance('/currency/money'));
  let planted = $derived(statistic.getMapStatistic('/statistic/plants-planted', '/plant/sunflower'));

  currency.onCurrencyGain.sub((c) => {
    if (c.id === '/currency/money') {
      statistic.incrementStatistic('/statistic/total-money', c.amount);
    }
  });

  achievement.onAchievementEarn.sub((a) => {
    console.log('Achievement gained:', a);
  });

  const sow = () => {
    game.features.farming.sow('/plant/sunflower');
    achievement.checkAchievements();
  };

  onMount(() => {
    game.loadFromStorage();
    game.start();
  });
</script>

<div class="p-4">
  <p>You have {money} money</p>
  <p>You have planted {planted} sunflowers</p>

  <button class="btn btn-primary" onclick={() => sow()}>Sow</button>
</div>
