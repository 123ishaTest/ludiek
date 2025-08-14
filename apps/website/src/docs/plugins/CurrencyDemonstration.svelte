<script lang="ts">
  import { createCurrencyState, CurrencyPlugin } from '@123ishatest/ludiek';

  const currencyState = $state(createCurrencyState());
  const currency = new CurrencyPlugin(currencyState);
  currency.loadContent([{ id: 'money' }]);

  interface Notification {
    type: 'alert-success' | 'alert-error';
    message: string;
  }

  let notifications: Notification[] = $state([]);

  const pay = () => {
    const success = currency.payCurrency({ id: 'money', amount: 5 });

    notifications.push({
      type: success ? 'alert-success' : 'alert-error',
      message: success ? 'You paid 5 money!' : "You don't have enough money!",
    });

    setTimeout(() => {
      notifications.shift();
    }, 2000);
  };

  let money = $derived(currency.getBalance('money'));

  $effect(() => {
    currency.onCurrencyGain.sub(({ id, amount }) => {
      console.log(`You gained ${amount} ${id}`);
    });
  });
</script>

<div class="card card-border bg-base-200 w-96">
  <div class="card-body">
    <span class="card-title">You have <span class="text-primary">{money}</span> money!</span>
    <div class="flex flex-row space-x-4">
      <button class="btn btn-primary" onclick={() => currency.gainCurrency({ id: 'money', amount: 3 })}>Gain 3</button>
      <button class="btn btn-error" onclick={() => currency.loseCurrency({ id: 'money', amount: 2 })}>Lose 2</button>
      <button class="btn btn-info" onclick={() => pay()}>Pay 5</button>
    </div>
  </div>
</div>

<div class="flex flex-col space-y-2">
  {#each notifications as notification, i (i)}
    <div role="alert" class="alert {notification.type}">
      <span>{notification.message}</span>
    </div>
  {/each}
</div>
