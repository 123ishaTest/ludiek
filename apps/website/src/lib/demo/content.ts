import { CurrencyDetailSchema } from '$lib/demo/model/CurrencyDetail';
import { AchievementSchema } from '$lib/demo/model/AchievementDetail';
import { StatisticDetailSchema } from '$lib/demo/model/StatisticDetail';
import { PlantSchema } from '$lib/demo/model/PlantDetail';
import { SkillDetailSchema } from '$lib/demo/model/SkillDetail';
import { ContentManager } from '@123ishatest/louter';

export const schemas = {
  achievement: AchievementSchema,
  currency: CurrencyDetailSchema,
  statistic: StatisticDetailSchema,
  skill: SkillDetailSchema,
  plant: PlantSchema,
};

export const contentManager = new ContentManager(schemas);
