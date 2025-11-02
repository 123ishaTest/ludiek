<script lang="ts">
  import {
    CurrencyPlugin,
    StatisticPlugin,
    type StatisticDefinition,
    createStatisticState,
    createCurrencyState,
  } from '@123ishatest/ludiek';

  // Define plugins with reactive state
  const currencyState = $state(createCurrencyState());
  const currency = new CurrencyPlugin(currencyState);
  const statisticState = $state(createStatisticState());
  const statistic = new StatisticPlugin(statisticState);

  const currencies = [{ id: '/currency/money' }, { id: '/currency/gems' }];
  currency.loadContent(currencies);

  const statistics: StatisticDefinition[] = [
    { id: '/statistic/currencies', type: 'map' },
    { id: '/statistic/total-currency', type: 'scalar' },
  ];
  statistic.loadContent(statistics);

  let allStatistic = $derived(statistic.getScalarValue('/statistic/total-currency'));
  let currenciesStatistic = $state(statistic.getMap('/statistic/currencies'));

  $effect(() => {
    currency.onCurrencyGain.sub(({ id, amount }) => {
      statistic.incrementStatistic('/statistic/total-currency', amount);
      statistic.incrementMapStatistic('/statistic/currencies', id, amount);
    });
  });
</script>

<div class="card card-border bg-base-200 my-8 w-full sm:w-96">
  <div class="card-body">
    <div class="flex flex-row justify-center">
      <span class="card-title">Statistic Plugin</span>
    </div>
    <span>[scalar] Total of all currencies: <span class="text-primary">{allStatistic}</span></span>
    <span>[map] Total per currency</span>
    <pre class="mt-0 mb-0">{JSON.stringify(currenciesStatistic, null, 2)}</pre>
  </div>
</div>

<div class="card card-border bg-base-200 w-full sm:w-96">
  <div class="card-body text-center">
    <div class="flex flex-row justify-center">
      <span class="card-title">Currency Plugin</span>
    </div>

    <div class="flex flex-row justify-between">
      <button class="btn btn-primary" onclick={() => currency.gainCurrency({ id: '/currency/money', amount: 3 })}
        >Gain 3 money
      </button>
      <button class="btn btn-secondary" onclick={() => currency.gainCurrency({ id: '/currency/gems', amount: 10 })}
        >Gain 10 gems
      </button>
    </div>
  </div>
</div>
