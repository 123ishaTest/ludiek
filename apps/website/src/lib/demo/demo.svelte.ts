import {
  AchievementPlugin,
  CouponPlugin,
  createAchievementState,
  createCouponState,
  createCurrencyState,
  createSkillState,
  createStatisticState,
  CurrencyPlugin,
  EnterCouponController,
  GainCurrencyProducer,
  GainSkillExperienceProducer,
  HasCurrencyEvaluator,
  HasScalarStatisticEvaluator,
  LoseCurrencyConsumer,
  LudiekEngine,
  LudiekGame,
  SkillPlugin,
  StatisticPlugin,
  TrueEvaluator,
} from '@123ishatest/ludiek';
import { Farming } from '$lib/demo/features/Farming';
import { SowSeedController } from '$lib/demo/features/SowPlantController';
import { SeedProducer } from '$lib/demo/features/SeedOutput';
import { GlobalSeedModifier } from '$lib/demo/features/GlobalSeedBonus';
import { SeedModifier } from '$lib/demo/features/SeedBonus';
import { AchievementSchema } from '$lib/demo/model/AchievementDetail';
import { CurrencyDetailSchema } from '$lib/demo/model/CurrencyDetail';
import { StatisticDetailSchema } from '$lib/demo/model/StatisticDetail';
import { SkillDetailSchema } from '$lib/demo/model/SkillDetail';
import { PlantSchema } from '$lib/demo/model/PlantDetail';

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
const farming = new Farming();

const engineState = $state({});

// Create engine with plugins
export const engine = new LudiekEngine(
  {
    plugins: [currencyPlugin, statisticPlugin, achievementPlugin, couponPlugin, skillPlugin],
    features: [farming],
    content: [
      { kind: 'achievement', schema: AchievementSchema },
      { kind: 'currency', schema: CurrencyDetailSchema },
      { kind: 'statistic', schema: StatisticDetailSchema },
      { kind: 'skill', schema: SkillDetailSchema },
      { kind: 'plant', schema: PlantSchema },
    ],
    evaluators: [new TrueEvaluator(), new HasCurrencyEvaluator(), new HasScalarStatisticEvaluator()],
    consumers: [new LoseCurrencyConsumer()],
    producers: [new SeedProducer(), new GainCurrencyProducer(), new GainSkillExperienceProducer()],
    controllers: [new EnterCouponController(), new SowSeedController()],
    modifiers: [new SeedModifier(), new GlobalSeedModifier()],
  },
  engineState,
);

export const game = new LudiekGame(engine, {
  saveKey: '@123ishatest/ludiek-demo',
  tickDuration: 1,
  saveInterval: 30,
});

export const { currency, statistic, achievement, skill } = engine.plugins;
