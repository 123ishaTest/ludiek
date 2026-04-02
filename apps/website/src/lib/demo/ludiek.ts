import type {
  AchievementPlugin,
  HasScalarStatisticEvaluator,
  CouponPlugin,
  CurrencyPlugin,
  GainCurrencyProducer,
  GainSkillExperienceProducer,
  SkillPlugin,
  StatisticPlugin,
  HasCurrencyEvaluator,
  TrueEvaluator,
  LoseCurrencyConsumer,
  EnterCouponController,
} from '@123ishatest/ludiek';
import type { SeedModifier } from '$lib/demo/features/SeedBonus';
import type { GlobalSeedModifier } from '$lib/demo/features/GlobalSeedBonus';
import type { SeedProducer } from '$lib/demo/features/SeedOutput';
import type { SowSeedController } from '$lib/demo/features/SowPlantController';

// 6. This is the big source of truth on the consumer side
declare module '@123ishatest/ludiek' {
  interface LudiekRegistry {
    plugins: [CurrencyPlugin, StatisticPlugin, AchievementPlugin, CouponPlugin, SkillPlugin];
    evaluators: [TrueEvaluator, HasCurrencyEvaluator, HasScalarStatisticEvaluator];
    consumers: [LoseCurrencyConsumer];
    producers: [SeedProducer, GainCurrencyProducer, GainSkillExperienceProducer];
    controllers: [EnterCouponController, SowSeedController];
    modifiers: [SeedModifier, GlobalSeedModifier];
  }
}
