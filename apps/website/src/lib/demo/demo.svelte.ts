import {
  AchievementPlugin,
  AlwaysTrueCondition,
  type ConditionShape,
  CouponPlugin,
  createAchievementState,
  createCouponState,
  createCurrencyState,
  createStatisticState,
  CurrencyPlugin,
  type InputShape,
  LudiekEngine,
  LudiekGame,
  type OutputShape,
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
const couponState = $state(createCouponState());
const couponPlugin = new CouponPlugin(couponState);

// Create engine with plugins
export const engine = new LudiekEngine({
  plugins: [currencyPlugin, statisticPlugin, achievementPlugin, couponPlugin],
  conditions: [new AlwaysTrueCondition()],
} as const);

// Extract some neat utility types
export type EnginePlugins = typeof engine.plugins;

export type Input = InputShape<typeof engine.inputs>;
export type Output = OutputShape<typeof engine.outputs>;
export type Condition = ConditionShape<typeof engine.conditions>;

export type PlantId = (typeof plants)[number]['id'];

// Create your game
const farming = new Farming(plants);

export const game = new LudiekGame(engine, {
  features: [farming],
  saveKey: '@123ishatest/ludiek-demo',
  tickDuration: 0.1,
  saveInterval: 30,
});

engine.plugins.currency.loadContent(currencies);
engine.plugins.statistic.loadContent(statistics);
engine.plugins.achievement.loadContent(achievements);

export const { currency, statistic, achievement } = engine.plugins;
