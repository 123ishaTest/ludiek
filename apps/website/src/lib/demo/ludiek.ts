import {
  type AchievementPlugin,
  type HasScalarStatisticEvaluator,
  type CouponPlugin,
  type CurrencyPlugin,
  type GainCurrencyProducer,
  type GainSkillExperienceProducer,
  type SkillPlugin,
  type StatisticPlugin,
  type HasCurrencyEvaluator,
  type TrueEvaluator,
  type LoseCurrencyConsumer,
  type EnterCouponController,
  createLudiek,
} from '@123ishatest/ludiek';
import type { SeedModifier } from '$lib/demo/features/SeedBonus';
import type { GlobalSeedModifier } from '$lib/demo/features/GlobalSeedBonus';
import type { SeedProducer } from '$lib/demo/features/SeedOutput';
import type { SowSeedController } from '$lib/demo/features/SowPlantController';
import type { Farming } from '$lib/demo/features/Farming';

type DemoConfig = {
  plugins: [CurrencyPlugin, StatisticPlugin, AchievementPlugin, CouponPlugin, SkillPlugin];
  features: [Farming];
  evaluators: [TrueEvaluator, HasCurrencyEvaluator, HasScalarStatisticEvaluator];
  consumers: [LoseCurrencyConsumer];
  producers: [SeedProducer, GainCurrencyProducer, GainSkillExperienceProducer];
  controllers: [EnterCouponController, SowSeedController];
  modifiers: [SeedModifier, GlobalSeedModifier];
};

export const Ludiek = createLudiek<DemoConfig>();
