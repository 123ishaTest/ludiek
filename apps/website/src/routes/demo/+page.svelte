<script lang="ts">
  import { game } from '$lib/demo/demo';

  const gems = game.engine.api.currency.getBalance('/currency/gems');
</script>

<div class="p-4">
  <p>You have {gems} gems</p>
</div>
