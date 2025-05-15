<script lang="ts">
  import { demoGame } from '@123ishatest/ludiek';

  let money = $derived(demoGame.features.wallet.getCurrency('/currency/money'));

  const gainMoney = () => {
    demoGame.features.wallet.gainCurrency({ amount: 1, type: '/currency/money' });
  };
</script>

<div class="flex flex-row flex-wrap space-x-8">
  <div class="card bg-base-300 w-96 shadow-sm">
    <div class="card-body">
      <h2 class="card-title">Money: {money.get()}</h2>
      <button class="btn" onclick={() => gainMoney()}>Gain money</button>
    </div>
  </div>
</div>
