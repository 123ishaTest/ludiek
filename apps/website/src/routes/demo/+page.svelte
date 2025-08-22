<script lang="ts">
  import { achievement, currency, game, statistic } from '$lib/demo/demo.svelte';
  import FarmDisplay from '$lib/components/farming/FarmDisplay.svelte';
  import { onMount } from 'svelte';

  let money = $derived(currency.getBalance('/currency/money'));
  let compost = $derived(currency.getBalance('/currency/compost'));
  let planted = $derived(statistic.getMapStatistic('/statistic/plants-planted', '/plant/sunflower'));

  currency.onCurrencyGain.sub((c) => {
    if (c.id === '/currency/money') {
      statistic.incrementStatistic('/statistic/total-money', c.amount);
    }
  });

  achievement.onAchievementEarn.sub((a) => {
    console.log('Achievement gained:', a);
  });


  const trade = () => {
    game.engine.handleTransaction({
      input: {
        type: 'currency',
        id: '/currency/money',
        amount: 100,
      },
      output: {
        type: 'currency',
        id: '/currency/compost',
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
  <p>You have {compost} compost</p>
  <p>You have planted {planted} sunflowers</p>

  <button class="btn btn-secondary" onclick={() => trade()}>Trade 100 money for 1 compost</button>
  <FarmDisplay farming={game.features.farming} />
</div>
