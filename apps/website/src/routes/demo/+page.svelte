<script lang="ts">
  import { game } from '$lib/demo/demo';

  let balance = $state(game.engine.plugins.currency._balances);
  game.engine.plugins.currency._balances = balance;

  let money = $state(game.engine.plugins.currency.getBalance('/currency/money'));
  let statistic = $state(
    game.engine.plugins.statistic.getMapStatistic('/statistic/plants-planted', '/plant/sunflower'),
  );

  game.engine.plugins.currency.onCurrencyGain.sub((c) => {
    if (c.id === '/currency/money') {
      game.engine.plugins.statistic.incrementStatistic('/statistic/total-money', c.amount);
    }
  });

  game.engine.plugins.achievement.onAchievementEarn.sub((a) => {
    console.log('Achievement gained:', a);
  });

  const sow = () => {
    game.features.farming.sow('/plant/sunflower');
    game.engine.plugins.achievement.checkAchievements();
  };
</script>

<div class="p-4">
  <p>You have {money} money</p>
  <p>You have planted {statistic} sunflowers</p>

  <button class="btn btn-primary" onclick={() => sow()}>Sow</button>
</div>
