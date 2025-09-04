/**
 * Ludiek
 */
// Engine
export { LudiekEngine } from '@ludiek/engine/LudiekEngine';
export { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';
export { LudiekFeature } from '@ludiek/engine/LudiekFeature';
export { LudiekGame } from '@ludiek/engine/LudiekGame';

// Engine.Conditions
export type { LudiekCondition } from '@ludiek/engine/conditions/LudiekCondition';
export type { BaseConditionShape } from '@ludiek/engine/conditions/LudiekCondition';
export type { ConditionShape } from '@ludiek/engine/conditions/LudiekCondition';
export { AlwaysTrueCondition } from '@ludiek/engine/conditions/AlwaysTrueCondition';
export { AlwaysFalseCondition } from '@ludiek/engine/conditions/AlwaysFalseCondition';

// Engine.Requests
export type { BaseRequestShape, LudiekController, RequestShape } from '@ludiek/engine/requests/LudiekRequest';
export { type RequestEvent } from '@ludiek/engine/requests/LudiekRequest';

// Engine.Transactions
export type { LudiekTransaction } from '@ludiek/engine/transactions/LudiekTransaction';
export type { InputShape, LudiekInput } from '@ludiek/engine/transactions/LudiekInput';
export type { LudiekOutput, OutputShape } from '@ludiek/engine/transactions/LudiekOutput';

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
export { HasAchievementCondition } from '@ludiek/plugins/achievement/evaluators/HasAchievementCondition';

// Achievement.Transactions
export { AchievementOutput } from '@ludiek/plugins/achievement/transactions/AchievementOutput';

// Currency
export { CurrencyPlugin } from '@ludiek/plugins/currency/CurrencyPlugin';
export { type CurrencyPluginState, createCurrencyState } from '@ludiek/plugins/currency/CurrencyPluginState';

// Currency.Conditions
export { HasCurrencyCondition } from '@ludiek/plugins/currency/evaluators/HasCurrencyCondition';

// Currency.Transactions
export { CurrencyInput } from '@ludiek/plugins/currency/transactions/CurrencyInput';
export { CurrencyOutput } from '@ludiek/plugins/currency/transactions/CurrencyOutput';

// CouponDetail
export { CouponPlugin } from '@ludiek/plugins/coupon/CouponPlugin';
export { type CouponPluginState, createCouponState } from '@ludiek/plugins/coupon/CouponPluginState';

// Statistic
export { StatisticPlugin, type StatisticDefinition } from '@ludiek/plugins/statistic/StatisticPlugin';
export { type StatisticPluginState, createStatisticState } from '@ludiek/plugins/statistic/StatisticPluginState';
export { HasStatisticCondition } from '@ludiek/plugins/statistic/evaluators/HasStatisticCondition';

// Statistic.Conditions
export { HasMapStatisticCondition } from '@ludiek/plugins/statistic/evaluators/HasMapStatisticCondition';

/**
 * Util
 */
export { hash } from '@ludiek/util/hash';
