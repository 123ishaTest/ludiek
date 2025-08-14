import {
  AchievementPlugin,
  AlwaysTrueCondition,
  type ConditionShape,
  CurrencyPlugin,
  HasCurrencyCondition,
  HasStatisticCondition,
  LudiekEngine,
  LudiekGame,
  StatisticPlugin,
} from '@123ishatest/ludiek';
import { Farming } from '$lib/demo/features/Farming';
import { achievements, currencies, plants, statistics } from '$lib/demo/content';

// Define plugins
const currency = new CurrencyPlugin();
const statistic = new StatisticPlugin();
const achievement = new AchievementPlugin();

// Create engine with plugins
const config = {
  plugins: [currency, statistic, achievement],
  conditions: [new AlwaysTrueCondition(), new HasCurrencyCondition(currency), new HasStatisticCondition(statistic)],
};

const engine = new LudiekEngine(config);

// Extract some neat utility types
export type EnginePlugins = typeof engine.plugins;
export type Condition = ConditionShape<typeof config.conditions>;
export type PlantId = (typeof plants)[number]['id'];

// Create your game
const farming = new Farming(plants);

export const game = new LudiekGame(engine, {
  farming: farming,
});

engine.plugins.currency.loadContent(currencies);
engine.plugins.statistic.loadContent(statistics);
engine.plugins.achievement.loadContent(achievements);
