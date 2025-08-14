<script lang="ts">
  import { CurrencyPlugin, StatisticPlugin, type StatisticDefinition } from '@123ishatest/ludiek';

  const currency = new CurrencyPlugin();
  const currencies = [{ id: 'money' }, { id: 'gems' }];
  currency.loadContent(currencies);

  const statistic = new StatisticPlugin();
  const statistics: StatisticDefinition[] = [
    { id: 'currency', type: 'map' },
    { id: 'total', type: 'scalar' },
  ];
  statistic.loadContent(statistics);

  // TODO(@Isha): Figure out reactivity!
  const reactive = $state(currency._balances);
  currency._balances = reactive;

  const reactiveScalar = $state(statistic._scalarStatistics);
  statistic._scalarStatistics = reactiveScalar;

  const reactiveMap = $state(statistic._mapStatistics);
  statistic._mapStatistics = reactiveMap;

  let allStatistic = $derived(statistic.getStatistic('total'));
  let currenciesStatistic = $state(statistic.getMapStatisticObject('currency'));

  $effect(() => {
    currency.onCurrencyGain.sub(({ id, amount }) => {
      statistic.incrementStatistic('total', amount);
      statistic.incrementMapStatistic('currency', id, amount);
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
      <button class="btn btn-primary" onclick={() => currency.gainCurrency({ id: 'money', amount: 3 })}
        >Gain 3 money
      </button>
      <button class="btn btn-secondary" onclick={() => currency.gainCurrency({ id: 'gems', amount: 10 })}
        >Gain 10 gems
      </button>
    </div>
  </div>
</div>
