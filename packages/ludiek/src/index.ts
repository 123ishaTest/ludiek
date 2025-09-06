/**
 * Ludiek
 */
// Engine
export { LudiekEngine } from '@ludiek/engine/LudiekEngine';
export { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';
export { LudiekFeature } from '@ludiek/engine/LudiekFeature';
export { LudiekGame } from '@ludiek/engine/LudiekGame';

// Engine.Conditions
export type {
  LudiekCondition,
  ConditionShape,
  BaseConditionShape,
  EngineConditions,
  EngineConditionShape,
} from '@ludiek/engine/condition/LudiekCondition';
export { AlwaysTrueCondition } from '@ludiek/engine/condition/AlwaysTrueCondition';
export { AlwaysFalseCondition } from '@ludiek/engine/condition/AlwaysFalseCondition';

// Engine.Requests
export type { BaseRequestShape, LudiekController, RequestShape } from '@ludiek/engine/request/LudiekRequest';
export { type RequestEvent } from '@ludiek/engine/request/LudiekRequest';

// Engine.Transactions
export type { LudiekTransaction } from '@ludiek/engine/transaction/LudiekTransaction';
export type {
  LudiekInput,
  InputShape,
  BaseInputShape,
  EngineInputs,
  EngineInputShape,
} from '@ludiek/engine/input/LudiekInput';
export type {
  LudiekOutput,
  OutputShape,
  BaseOutputShape,
  EngineOutputs,
  EngineOutputShape,
} from '@ludiek/engine/output/LudiekOutput';

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

// CouponDetail
export { CouponPlugin } from '@ludiek/plugins/coupon/CouponPlugin';
export { type CouponPluginState, createCouponState } from '@ludiek/plugins/coupon/CouponPluginState';

// Statistic
export { StatisticPlugin, type StatisticDefinition } from '@ludiek/plugins/statistic/StatisticPlugin';
export { type StatisticPluginState, createStatisticState } from '@ludiek/plugins/statistic/StatisticPluginState';
export { HasStatisticCondition } from '@ludiek/plugins/statistic/HasStatisticCondition';

// Statistic.Conditions
export { HasMapStatisticCondition } from '@ludiek/plugins/statistic/HasMapStatisticCondition';

/**
 * Util
 */
export { hash } from '@ludiek/util/hash';
