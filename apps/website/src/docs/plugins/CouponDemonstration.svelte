<script lang="ts">
  import {
    createCurrencyState,
    createCouponState,
    CurrencyPlugin,
    GainCurrencyProducer,
    LudiekEngine,
    CouponPlugin,
    hash,
  } from '@123ishatest/ludiek';
  import type { CouponDetail } from '$lib/demo/model/CouponDetail';
  import { onMount } from 'svelte';

  const currencyState = $state(createCurrencyState());
  const currency = new CurrencyPlugin(currencyState);
  const couponState = $state(createCouponState());
  const coupon = new CouponPlugin(couponState);

  new LudiekEngine({
    plugins: [currency, coupon],
    producers: [new GainCurrencyProducer()],
  });
  currency.loadContent([{ id: '/currency/money' }]);

  const coupons: CouponDetail[] = [
    {
      id: '/coupon/gain-10-money',
      hash: '-1232159358',
      output: {
        type: '/output/gain-currency',
        id: '/currency/money',
        amount: 10,
      },
    },
    {
      id: '/coupon/gain-100-money',
      hash: '-374288946',
      output: {
        type: '/output/gain-currency',
        id: '/currency/money',
        amount: 100,
      },
    },
  ];
  coupon.loadContent(coupons);

  let unlockedGain10 = $derived(coupon.hasRedeemedCoupon('/coupon/gain-10-money'));
  let unlockedGain100 = $derived(coupon.hasRedeemedCoupon('/coupon/gain-100-money'));

  interface Notification {
    type: 'alert-success' | 'alert-error';
    message: string;
  }

  let notifications: Notification[] = $state([]);

  let money = $derived(currency.getBalance('/currency/money'));

  onMount(() => {
    return coupon.onCouponRedeemed.sub((coupon) => {
      notifications.push({
        message: `Coupon redeemed ${coupon.id}`,
        type: 'alert-success',
      });
    });
  });

  let couponGuess = $state('');

  const guess = () => {
    const success = coupon.enterCoupon(couponGuess);

    if (!success) {
      notifications.push({
        message: `Invalid coupon`,
        type: 'alert-error',
      });
    }
    couponGuess = '';
  };

  let exampleInput = $state('');
  let exampleHash = $derived(hash(exampleInput));
</script>

<div class="flex flex-col space-y-4">
  <div class="card card-border bg-base-200 w-96">
    <div class="card-body">
      <span class="card-title">You have <span class="text-primary">{money}</span> money!</span>
    </div>
  </div>

  <div class="card card-border bg-base-200 w-96">
    <div class="card-body space-y-4">
      <div class="flex flex-row space-x-4">
        <input class="input" placeholder="Enter coupon..." bind:value={couponGuess} />
        <button class="btn btn-primary" onclick={() => guess()}>Submit</button>
      </div>
      <div class="flex flex-row justify-center space-x-4">
        <div
          class="bg-base-100 flex h-24 w-24 flex-col items-center justify-center border-2 p-2 {unlockedGain10
            ? 'border-secondary'
            : 'border-primary'}"
        >
          <span class="text-center text-xs">GAIN10MONEY</span>
          <span class={unlockedGain10 ? 'text-secondary' : 'text-primary'}
            >{unlockedGain10 ? 'Consumed' : 'Available'}</span
          >
        </div>
        <div
          class="bg-base-100 flex h-24 w-24 flex-col items-center justify-center border-2 p-2 {unlockedGain100
            ? 'border-secondary'
            : 'border-primary'}"
        >
          <span class="text-center text-xs">GAIN100MONEY</span>
          <span class={unlockedGain100 ? 'text-secondary' : 'text-primary'}
            >{unlockedGain100 ? 'Consumed' : 'Available'}</span
          >
        </div>
      </div>
    </div>
  </div>

  <div class="card card-border bg-base-200 w-96">
    <div class="card-body">
      <input class="input" placeholder="Enter value..." bind:value={exampleInput} />
      <span class="card-title">Hash: {exampleHash}</span>
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
