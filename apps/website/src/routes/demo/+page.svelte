<script lang="ts">
  import { achievement, currency, farming, game, statistic } from '$lib/demo/demo.svelte';
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

  onMount(() => {
    game.loadFromStorage();
    game.start();
  });
</script>

<div class="p-4">
  <p>You have {money} money</p>
  <p>You have {compost} compost</p>
  <p>You have planted {planted} sunflowers</p>

  <FarmDisplay {farming} />
</div>
