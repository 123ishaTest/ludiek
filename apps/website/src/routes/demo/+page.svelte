<script lang="ts">
  import { game } from '$lib/demo/demo';

  let gems = $state(game.engine.plugins.currency.getBalance('/currency/gems'));
  let statistic = $state(
    game.engine.plugins.statistic.getMapStatistic('/statistic/plants-planted', '/plant/sunflower'),
  );

  const sow = () => {
    game.features.farming.sow('/plant/sunflower');
  };
</script>

<div class="p-4">
  <p>You have {gems} gems</p>
  <p>You have planted {statistic} sunflowers</p>

  <button class="btn btn-primary" onclick={() => sow()}>Sow</button>
</div>
