<script lang="ts">
  import {
    AchievementPlugin,
    CurrencyPlugin,
    HasStatisticCondition,
    LudiekEngine,
    StatisticPlugin,
  } from '@123ishatest/ludiek';
  import type { AchievementDetail } from '$lib/demo/model/AchievementDetail';

  const currency = new CurrencyPlugin();
  const statistic = new StatisticPlugin();
  const achievement = new AchievementPlugin();

  new LudiekEngine({
    plugins: [currency, statistic, achievement],
    conditions: [new HasStatisticCondition(statistic)],
  });
  currency.loadContent([{ id: 'money' }]);
  statistic.loadContent([{ id: 'total', type: 'scalar' }]);

  const achievements: AchievementDetail[] = [
    {
      id: 'gain-10-money',
      condition: {
        type: 'has-statistic',
        id: 'total',
        amount: 10,
      },
    },
    {
      id: 'gain-50-money',
      condition: {
        type: 'has-statistic',
        id: 'total',
        amount: 50,
      },
    },
    {
      id: 'manual-achievement',
    },
  ];
  achievement.loadContent(achievements);

  currency.onCurrencyGain.sub((currency) => {
    if (currency.id === 'money') {
      statistic.incrementStatistic('total', currency.amount);
    }
    achievement.checkAchievements();
  });

  // TODO(@Isha): Figure out reactivity!
  const reactive = $state(currency._balances);
  currency._balances = reactive;
  const reactiveRecord = $state(achievement._record);
  achievement._record = reactiveRecord;

  let hasGain10 = $derived(achievement.hasAchievement('gain-10-money'));
  let hasGain50 = $derived(achievement.hasAchievement('gain-50-money'));
  let hasManual = $derived(achievement.hasAchievement('manual-achievement'));

  interface Notification {
    type: 'alert-success' | 'alert-error';
    message: string;
  }

  let notifications: Notification[] = $state([]);

  let money = $derived(currency.getBalance('money'));

  const manualEarn = () => {
    achievement.earnAchievement('manual-achievement');
  };

  $effect(() => {
    achievement.onAchievementEarn.sub((achievement) => {
      notifications.push({
        type: 'alert-success',
        message: `You earned achievement ${achievement.id}`,
      });
    });
  });
</script>

<div class="card card-border bg-base-200 w-96">
  <div class="card-body">
    <span class="card-title">You have <span class="text-primary">{money}</span> money!</span>
    <div class="flex flex-row space-x-4">
      <button class="btn btn-primary" onclick={() => currency.gainCurrency({ id: 'money', amount: 4 })}>Gain 4</button>
      <button class="btn btn-info" onclick={() => manualEarn()}>Manual unlock</button>
    </div>
  </div>
</div>

<div class="card card-border bg-base-200 w-96">
  <div class="card-body">
    <div class="flex flex-row space-x-4">
      <div
        class="bg-base-100 flex h-24 w-24 flex-col items-center border-2 p-2 {hasGain10
          ? 'border-primary'
          : 'border-secondary'}"
      >
        <span class="text-center">Gain 10 money</span>
        <span class={hasGain10 ? 'text-primary' : 'text-secondary'}>{hasGain10 ? 'Earned' : 'Not earned'}</span>
      </div>
      <div
        class="bg-base-100 flex h-24 w-24 flex-col items-center border-2 p-2 {hasGain50
          ? 'border-primary'
          : 'border-secondary'}"
      >
        <span class="text-center">Gain 50 money</span>
        <span class={hasGain50 ? 'text-primary' : 'text-secondary'}>{hasGain50 ? 'Earned' : 'Not earned'}</span>
      </div>

      <div
        class="bg-base-100 flex h-24 w-24 flex-col items-center border-2 p-2 {hasManual
          ? 'border-primary'
          : 'border-secondary'}"
      >
        <span class="text-center">Manual Unlock</span>
        <span class={hasManual ? 'text-primary' : 'text-secondary'}>{hasManual ? 'Earned' : 'Not earned'}</span>
      </div>
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
