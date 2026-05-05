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
import { AchievementSchema } from '$lib/demo/model/AchievementDetail';
import type { SkillDetailSchema } from '$lib/demo/model/SkillDetail';
import type { PlantSchema } from '$lib/demo/model/PlantDetail';
import type { CurrencyDetailSchema } from '$lib/demo/model/CurrencyDetail';
import type { StatisticDetailSchema } from '$lib/demo/model/StatisticDetail';

type DemoConfig = {
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

export const Ludiek = createLudiek<DemoConfig>();
