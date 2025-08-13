import {
  AchievementPlugin,
  CurrencyPlugin,
  HasCurrencyCondition,
  LudiekEngine,
  LudiekGame,
  StatisticPlugin,
} from '@123ishatest/ludiek';
import { Farming } from '$lib/demo/Farming';
import type { ConditionShape } from '@123ishatest/ludiek/dist/engine/LudiekCondition';

// First we define the shapes of our content
export interface CurrencyDetail {
  id: string;
  name: string;
  icon: string;
}

export interface AchievementDetail {
  id: string;
  condition: ConditionShape<never>[];
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
  { id: '/plant/sunflower', name: 'Sunflower', growthTime: 1, moneyReward: 10 },
  { id: '/plant/cauliflower', name: 'Cauliflower', growthTime: 1.5, moneyReward: 20 },
] as const satisfies PlantDetail[];

const currencies = [
  { id: '/currency/money', name: 'Money', icon: '/icon/coin' },
  { id: '/currency/gems', name: 'Gems', icon: '/icon/gem-blue' },
] as const satisfies CurrencyDetail[];

const statistics = [
  { id: '/statistic/total-money', type: 'scalar' },
  { id: '/statistic/plants-planted', type: 'map' },
] as const satisfies StatisticDetail[];

const achievements = [
  {
    id: '/achievement/total-money',
    condition: [
      {
        type: 'has-currency',
        id: '/currency/money',
        amount: 30,
      },
    ],
  },
] as const satisfies AchievementDetail[];

// Define plugins
const currency = new CurrencyPlugin(currencies);
const statistic = new StatisticPlugin(statistics);
const achievement = new AchievementPlugin(achievements);

// Create engine
const engine = new LudiekEngine({
  plugins: [currency, statistic, achievement],
  conditions: [new HasCurrencyCondition(currency)],
});

// Extract some neat utility types
export type EnginePlugins = typeof engine.plugins;
export type PlantId = (typeof plants)[number]['id'];

// Create your game
const farming = new Farming(plants);

export const game = new LudiekGame(engine, {
  farming: farming,
});
