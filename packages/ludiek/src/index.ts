/**
 * Ludiek
 */
// Engine
export { LudiekEngine } from '@ludiek/engine/LudiekEngine';
export { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';
export { LudiekFeature } from '@ludiek/engine/LudiekFeature';
export { LudiekGame } from '@ludiek/engine/LudiekGame';

// Engine.Conditions
export type { LudiekEvaluator, BaseCondition } from '@ludiek/engine/condition/LudiekEvaluator';

// Engine.Requests
export type { BaseRequest, LudiekController } from '@ludiek/engine/request/LudiekRequest';

// Engine.Transactions
export type { LudiekTransaction } from '@ludiek/engine/transaction/LudiekTransaction';
export type { LudiekConsumer, BaseInput } from '@ludiek/engine/input/LudiekConsumer';

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
export { HasAchievementEvaluator } from '@ludiek/plugins/achievement/HasAchievementCondition';

// Achievement.Transactions
export { AchievementProducer } from '@ludiek/plugins/achievement/AchievementOutput';

// Currency
export { CurrencyPlugin } from '@ludiek/plugins/currency/CurrencyPlugin';
export { type CurrencyPluginState, createCurrencyState } from '@ludiek/plugins/currency/CurrencyPluginState';

// Currency.Conditions
export { HasCurrencyEvaluator } from '@ludiek/plugins/currency/HasCurrencyCondition';
export { NotHasCurrencyEvaluator } from '@ludiek/plugins/currency/NotHasCurrencyCondition';

// Currency.Transactions
export { CurrencyConsumer } from '@ludiek/plugins/currency/CurrencyInput';
export { CurrencyProducer } from '@ludiek/plugins/currency/CurrencyOutput';

// Coupon
export { CouponPlugin } from '@ludiek/plugins/coupon/CouponPlugin';
export { type CouponPluginState, createCouponState } from '@ludiek/plugins/coupon/CouponPluginState';

// Loot
export { LootTablePlugin } from '@ludiek/plugins/lootTable/LootTablePlugin';

// Loot.Transactions
export { LootTableProducer } from '@ludiek/plugins/lootTable/LootTableOutput';

// Skill
export { SkillPlugin } from '@ludiek/plugins/skill/SkillPlugin';
export { type SkillPluginState, createSkillState } from '@ludiek/plugins/skill/SkillPluginState';

// Skill.Conditions
export { HasSkillExperienceCondition } from '@ludiek/plugins/skill/HasSkillExperienceCondition';
export { HasSkillLevelEvaluator } from '@ludiek/plugins/skill/HasSkillLevelCondition';

// Skill.Output
export { SkillExperienceProducer } from '@ludiek/plugins/skill/SkillExperienceOutput';

// Statistic
export { StatisticPlugin, type StatisticDefinition } from '@ludiek/plugins/statistic/StatisticPlugin';
export { type StatisticPluginState, createStatisticState } from '@ludiek/plugins/statistic/StatisticPluginState';
export { HasStatisticEvaluator } from '@ludiek/plugins/statistic/HasStatisticCondition';

// Statistic.Conditions
export { HasMapStatisticEvaluator } from '@ludiek/plugins/statistic/HasMapStatisticCondition';

/**
 * Standard lib
 */
export { TrueEvaluator } from '@ludiek/stdlib/condition/TrueCondition';
export { FalseEvaluator } from '@ludiek/stdlib/condition/FalseCondition';

/**
 * Util
 */
export { hash } from '@ludiek/util/hash';
