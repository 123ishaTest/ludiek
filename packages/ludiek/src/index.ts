/**
 * Ludiek
 */
// Engine
export { LudiekEngine } from '@ludiek/engine/LudiekEngine';
export { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';
export { LudiekFeature } from '@ludiek/engine/LudiekFeature';
export { LudiekGame } from '@ludiek/engine/LudiekGame';

// Engine.Conditions
export type { LudiekCondition, BaseConditionShape } from '@ludiek/engine/condition/LudiekCondition';
export type { ExtractCondition, ConditionShape } from '@ludiek/engine/condition/LudiekConditionType';

// Engine.Requests
export type { BaseRequestShape, LudiekController } from '@ludiek/engine/request/LudiekRequest';
export type { ExtractRequest, RequestShape } from '@ludiek/engine/request/LudiekRequestType';
export { type RequestEvent } from '@ludiek/engine/request/LudiekRequest';

// Engine.Transactions
export type { LudiekTransaction } from '@ludiek/engine/transaction/LudiekTransaction';
export type { LudiekInput, BaseInputShape } from '@ludiek/engine/input/LudiekInput';
export type { ExtractInput, InputShape } from '@ludiek/engine/input/LudiekInputType';
export type { ExtractOutput, OutputShape } from '@ludiek/engine/output/LudiekOutputType';

/**
 * Plugins
 */
// Achievement
export { AchievementPlugin, type AchievementDefinition } from '@ludiek/plugins/achievement/AchievementPlugin';
export {
  type AchievementPluginState,
  createAchievementState,
} from '@ludiek/plugins/achievement/AchievementPluginState';

// Achievement.Conditions
export { HasAchievementCondition } from '@ludiek/plugins/achievement/HasAchievementCondition';

// Achievement.Transactions
export { AchievementOutput } from '@ludiek/plugins/achievement/AchievementOutput';

// Currency
export { CurrencyPlugin } from '@ludiek/plugins/currency/CurrencyPlugin';
export { type CurrencyPluginState, createCurrencyState } from '@ludiek/plugins/currency/CurrencyPluginState';

// Currency.Conditions
export { HasCurrencyCondition } from '@ludiek/plugins/currency/HasCurrencyCondition';
export { NotHasCurrencyCondition } from '@ludiek/plugins/currency/NotHasCurrencyCondition';

// Currency.Transactions
export { CurrencyInput } from '@ludiek/plugins/currency/CurrencyInput';
export { CurrencyOutput } from '@ludiek/plugins/currency/CurrencyOutput';

// Coupon
export { CouponPlugin } from '@ludiek/plugins/coupon/CouponPlugin';
export { type CouponPluginState, createCouponState } from '@ludiek/plugins/coupon/CouponPluginState';

// Loot
export { LootTablePlugin } from '@ludiek/plugins/lootTable/LootTablePlugin';

// Loot.Transactions
export { LootTableOutput } from '@ludiek/plugins/lootTable/LootTableOutput';

// Skill
export { SkillPlugin } from '@ludiek/plugins/skill/SkillPlugin';
export { type SkillPluginState, createSkillState } from '@ludiek/plugins/skill/SkillPluginState';

// Skill.Conditions
export { HasSkillExperienceCondition } from '@ludiek/plugins/skill/HasSkillExperienceCondition';
export { HasSkillLevelCondition } from '@ludiek/plugins/skill/HasSkillLevelCondition';

// Skill.Output
export { SkillExperienceOutput } from '@ludiek/plugins/skill/SkillExperienceOutput';

// Statistic
export { StatisticPlugin, type StatisticDefinition } from '@ludiek/plugins/statistic/StatisticPlugin';
export { type StatisticPluginState, createStatisticState } from '@ludiek/plugins/statistic/StatisticPluginState';
export { HasStatisticCondition } from '@ludiek/plugins/statistic/HasStatisticCondition';

// Statistic.Conditions
export { HasMapStatisticCondition } from '@ludiek/plugins/statistic/HasMapStatisticCondition';

/**
 * Standard lib
 */
export { TrueCondition } from '@ludiek/engine/condition/TrueCondition';
export { FalseCondition } from '@ludiek/engine/condition/FalseCondition';

/**
 * Util
 */
export { hash } from '@ludiek/util/hash';
