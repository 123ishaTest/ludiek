import {
  AchievementPlugin,
  CouponPlugin,
  createAchievementState,
  createCouponState,
  createCurrencyState,
  createSkillState,
  createStatisticState,
  LoseCurrencyConsumer,
  CurrencyPlugin,
  GainCurrencyProducer,
  EnterCouponController,
  HasCurrencyEvaluator,
  HasScalarStatisticEvaluator,
  type LudiekBonusContribution,
  type LudiekCondition,
  LudiekEngine,
  LudiekGame,
  type LudiekInput,
  type LudiekOutput,
  GainSkillExperienceProducer,
  SkillPlugin,
  StatisticPlugin,
  TrueEvaluator,
} from '@123ishatest/ludiek';
import { Farming } from '$lib/demo/features/Farming';
import { achievements, currencies, plants, skills, statistics } from '$lib/demo/content';
import { SowSeedController } from '$lib/demo/features/SowPlantController';
import { SeedProducer } from '$lib/demo/features/SeedOutput';
import { GlobalSeedModifier } from '$lib/demo/features/GlobalSeedBonus';
import { SeedModifier } from '$lib/demo/features/SeedBonus';

// Define plugins with reactive state
const currencyState = $state(createCurrencyState());
const currencyPlugin = new CurrencyPlugin(currencyState);
const statisticState = $state(createStatisticState());
const statisticPlugin = new StatisticPlugin(statisticState);
const achievementState = $state(createAchievementState());
const achievementPlugin = new AchievementPlugin(achievementState);
const couponState = $state(createCouponState());
const couponPlugin = new CouponPlugin(couponState);
const skillState = $state(createSkillState());
const skillPlugin = new SkillPlugin(skillState);

// Create your game
const farming = new Farming(plants);

const engineState = $state({});

// Create engine with plugins
export const engine = new LudiekEngine(
  {
    plugins: [currencyPlugin, statisticPlugin, achievementPlugin, couponPlugin, skillPlugin],
    evaluators: [new TrueEvaluator(), new HasCurrencyEvaluator(), new HasScalarStatisticEvaluator()],
    consumers: [new LoseCurrencyConsumer()],
    producers: [new SeedProducer(), new GainCurrencyProducer(), new GainSkillExperienceProducer()],
    controllers: [new EnterCouponController(), new SowSeedController(farming)],
    modifiers: [new GlobalSeedModifier(), new SeedModifier()],
  },
  engineState,
);

// Extract some neat utility types
export type EnginePlugins = typeof engine.plugins;
export type Condition = LudiekCondition<typeof engine.evaluators>;
export type Input = LudiekInput<typeof engine.consumers>;
export type Output = LudiekOutput<typeof engine.producers>;
export type Bonus = LudiekBonusContribution<typeof engine.modifiers>;

export type PlantId = (typeof plants)[number]['id'];

export const game = new LudiekGame(engine, {
  features: [farming],
  saveKey: '@123ishatest/ludiek-demo',
  tickDuration: 0.1,
  saveInterval: 30,
});

engine.plugins.currency.loadContent(currencies);
engine.plugins.statistic.loadContent(statistics);
engine.plugins.achievement.loadContent(achievements);
engine.plugins.skill.loadContent(skills);

export const { currency, statistic, achievement, skill } = engine.plugins;
