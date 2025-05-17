<script lang="ts">
  import { demoGame } from '@123ishatest/ludiek';
  import { LudiekPortal } from '@123ishatest/ludiek-portal';

  let money = $derived(demoGame.features.wallet.getCurrency('/currency/money'));

  const gainMoney = () => {
    demoGame.features.wallet.gainCurrency({ amount: 1, type: '/currency/money' });
  };
</script>

<p>Ludiek</p>
