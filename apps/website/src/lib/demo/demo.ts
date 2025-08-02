import {
  CurrencyChecker,
  CurrencyPlugin,
  LudiekEngine,
  LudiekGame,
  ShopPlugin,
  StatisticChecker,
  StatisticPlugin,
} from '@123ishatest/ludiek';
import { Farming } from '$lib/demo/Farming';

// First we define the shapes of our content
export interface CurrencyDetail {
  id: string;
  name: string;
  icon: string;
}

export interface StatisticDetail {
  id: string;
  type: 'scalar' | 'map';
}

export interface PlantDetail {
  id: string;
  name: string;
  growthTime: number;
  moneyReward: number;
}

// First we declare our fully static content
const plants = [
  { id: '/plant/sunflower', name: 'Sunflower', growthTime: 10, moneyReward: 10 },
  { id: '/plant/cauliflower', name: 'Cauliflower', growthTime: 15, moneyReward: 20 },
] as const satisfies PlantDetail[];

const currencies = [
  { id: '/currency/money', name: 'Money', icon: '/icon/coin' },
  { id: '/currency/gems', name: 'Gems', icon: '/icon/gem-blue' },
] as const satisfies CurrencyDetail[];

const statistics = [
  { id: '/statistic/total-money', type: 'scalar' },
  { id: '/statistic/plants-planted', type: 'map' },
] as const satisfies StatisticDetail[];

// Define plugins
const currency = new CurrencyPlugin(currencies);
const statistic = new StatisticPlugin(statistics);

// Create engine
const engine = new LudiekEngine(
  {
    currency: currency,
    statistic: statistic,
    shop: new ShopPlugin(),
  },
  [new CurrencyChecker(currency), new StatisticChecker(statistic)],
);

// Extract some neat utility types
export type EngineAPI = typeof engine.api;
export type PlantId = (typeof plants)[number]['id'];

// Create your game
const farming = new Farming(plants);

export const game = new LudiekGame(engine, {
  farming: farming,
});

engine.api.currency.onCurrencyGain.sub((currency) => {
  if (currency.id === '/currency/money') {
    engine.api.statistic.incrementStatistic('/statistic/total-money', currency.amount);
  }
});

currency.gainCurrency({ id: '/currency/money', amount: 4 });

console.log(
  engine.hasRequirement({
    type: 'statistic',
    id: '/statistic/total-money',
    value: 0,
  }),
);

engine.api.shop.buy({
  name: 'Test item',
  amount: 1,
  req: {
    type: 'statistic',
    id: '/statistic/total-money',
    value: 5,
  },
});
