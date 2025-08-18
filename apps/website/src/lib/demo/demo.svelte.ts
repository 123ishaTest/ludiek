import {
  AchievementPlugin,
  AlwaysTrueCondition,
  type ConditionShape,
  createAchievementState,
  createCurrencyState,
  createStatisticState,
  CurrencyInput,
  CurrencyOutput,
  CurrencyPlugin,
  HasCurrencyCondition,
  HasStatisticCondition,
  LudiekEngine,
  LudiekGame,
  StatisticPlugin,
} from '@123ishatest/ludiek';
import { Farming } from '$lib/demo/features/Farming';
import { achievements, currencies, plants, statistics } from '$lib/demo/content';

// Define plugins with reactive state
const currencyState = $state(createCurrencyState());
const currencyPlugin = new CurrencyPlugin(currencyState);
const statisticState = $state(createStatisticState());
const statisticPlugin = new StatisticPlugin(statisticState);
const achievementState = $state(createAchievementState());
const achievementPlugin = new AchievementPlugin(achievementState);

// Create engine with plugins
const config = {
  plugins: [currencyPlugin, statisticPlugin, achievementPlugin],
  conditions: [
    new AlwaysTrueCondition(),
    new HasCurrencyCondition(currencyPlugin),
    new HasStatisticCondition(statisticPlugin),
  ],
  inputs: [new CurrencyInput(currencyPlugin)],
  outputs: [new CurrencyOutput(currencyPlugin)],
};

const engine = new LudiekEngine(config);

// Extract some neat utility types
export type EnginePlugins = typeof engine.plugins;
export type Condition = ConditionShape<typeof config.conditions>;
export type PlantId = (typeof plants)[number]['id'];

// Create your game
const farming = new Farming(plants);

export const game = new LudiekGame(
  engine,
  {
    farming: farming,
  },
  {
    saveKey: '@123ishatest/ludiek-demo',
    tickDuration: 0.1,
    saveInterval: 30,
  },
);

engine.plugins.currency.loadContent(currencies);
engine.plugins.statistic.loadContent(statistics);
engine.plugins.achievement.loadContent(achievements);

export const { currency, statistic, achievement } = engine.plugins;
