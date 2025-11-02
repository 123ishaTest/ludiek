<script lang="ts">
  import {
    AchievementPlugin,
    createAchievementState,
    createCurrencyState,
    createStatisticState,
    CurrencyPlugin,
    HasScalarStatisticEvaluator,
    LudiekEngine,
    StatisticPlugin,
  } from '@123ishatest/ludiek';
  import type { AchievementDetail } from '$lib/demo/model/AchievementDetail';

  const currencyState = $state(createCurrencyState());
  const currency = new CurrencyPlugin(currencyState);
  const statisticState = $state(createStatisticState());
  const statistic = new StatisticPlugin(statisticState);
  const achievementState = $state(createAchievementState());
  const achievement = new AchievementPlugin(achievementState);

  new LudiekEngine({
    plugins: [currency, statistic, achievement],
    evaluators: [new HasScalarStatisticEvaluator()],
  });
  currency.loadContent([{ id: '/currency/money' }]);
  statistic.loadContent([{ id: '/statistic/total-currency', type: 'scalar' }]);

  const achievements: AchievementDetail[] = [
    {
      id: '/achievement/gain-10-money',
      condition: {
        type: '/condition/has-statistic',
        id: '/statistic/total-currency',
        amount: 10,
      },
    },
    {
      id: '/achievement/gain-50-money',
      condition: {
        type: '/condition/has-statistic',
        id: '/statistic/total-currency',
        amount: 50,
      },
    },
    {
      id: '/achievement/manual',
    },
  ];
  achievement.loadContent(achievements);

  currency.onCurrencyGain.sub((currency) => {
    if (currency.id === '/currency/money') {
      statistic.incrementStatistic('/statistic/total-currency', currency.amount);
    }
    achievement.checkAchievements();
  });

  let hasGain10 = $derived(achievement.hasAchievement('/achievement/gain-10-money'));
  let hasGain50 = $derived(achievement.hasAchievement('/achievement/gain-50-money'));
  let hasManual = $derived(achievement.hasAchievement('/achievement/manual'));

  interface Notification {
    type: 'alert-success' | 'alert-error';
    message: string;
  }

  let notifications: Notification[] = $state([]);

  let money = $derived(currency.getBalance('/currency/money'));

  const manualEarn = () => {
    achievement.earnAchievement('/achievement/manual');
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
      <button class="btn btn-primary" onclick={() => currency.gainCurrency({ id: '/currency/money', amount: 4 })}
        >Gain 4</button
      >
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
