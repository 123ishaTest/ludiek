import { AchievementSchema } from '$lib/demo/model/AchievementDetail';
import { CurrencyDetailSchema } from '$lib/demo/model/CurrencyDetail';
import { StatisticDetailSchema } from '$lib/demo/model/StatisticDetail';
import { SkillDetailSchema } from '$lib/demo/model/SkillDetail';
import { PlantSchema } from '$lib/demo/model/PlantDetail';
import { SeedProducer } from '$lib/demo/features/SeedOutput';
import { SowSeedController } from '$lib/demo/features/SowPlantController';
import { SeedModifier } from '$lib/demo/features/SeedBonus';
import { GlobalSeedModifier } from '$lib/demo/features/GlobalSeedBonus';
import type { Farming } from '$lib/demo/features/Farming';
import {
  LudiekFeature,
  type AchievementPlugin,
  type CouponPlugin,
  type CurrencyPlugin,
  type EnterCouponController,
  type GainCurrencyProducer,
  type GainSkillExperienceProducer,
  type HasCurrencyEvaluator,
  type HasScalarStatisticEvaluator,
  type LoseCurrencyConsumer,
  type SkillPlugin,
  type StatisticPlugin,
  type TrueEvaluator,
} from '@123ishatest/ludiek';

export type GlobalDependencies = {
  plugins: [CurrencyPlugin, StatisticPlugin, AchievementPlugin, CouponPlugin, SkillPlugin];
  features: [Farming];
  content: [
    { kind: 'achievement'; schema: typeof AchievementSchema },
    { kind: 'currency'; schema: typeof CurrencyDetailSchema },
    { kind: 'statistic'; schema: typeof StatisticDetailSchema },
    { kind: 'skill'; schema: typeof SkillDetailSchema },
    { kind: 'plant'; schema: typeof PlantSchema },
  ];
  evaluators: [TrueEvaluator, HasCurrencyEvaluator, HasScalarStatisticEvaluator];
  consumers: [LoseCurrencyConsumer];
  producers: [SeedProducer, GainCurrencyProducer, GainSkillExperienceProducer];
  controllers: [EnterCouponController, SowSeedController];
  modifiers: [SeedModifier, GlobalSeedModifier];
};
