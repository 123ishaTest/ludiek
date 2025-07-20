<script lang="ts">
  import { Farming } from '$lib/demo/Farming';
  import { LudiekGame } from '@123ishatest/ludiek';
  import { engine } from './demo';

  // Create your game
  const farming = new Farming();

  const game = new LudiekGame(engine, {
    farming: farming,
  });

  game.features.farming.plant();
  const gems = game.engine.api.currency.getBalance('/currency/gems');
  console.log(gems);
</script>

<p>You have {gems} gems</p>
