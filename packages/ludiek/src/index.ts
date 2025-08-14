/**
 * Ludiek
 */
// Engine
export { LudiekEngine } from '@ludiek/engine/LudiekEngine';
export { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';
export { LudiekFeature } from '@ludiek/engine/LudiekFeature';
export { LudiekGame } from '@ludiek/engine/LudiekGame';

// Conditions
export type { LudiekCondition } from '@ludiek/engine/LudiekCondition';
export type { BaseConditionShape } from '@ludiek/engine/LudiekCondition';
export type { ConditionShape } from '@ludiek/engine/LudiekCondition';
export { AlwaysTrueCondition } from '@ludiek/engine/evaluators/AlwaysTrueCondition';
export { AlwaysFalseCondition } from '@ludiek/engine/evaluators/AlwaysFalseCondition';

/**
 * Plugins
 */
// Achievement
export { AchievementPlugin, type AchievementDefinition } from '@ludiek/plugins/achievement/AchievementPlugin';
export { HasAchievementCondition } from '@ludiek/plugins/achievement/evaluators/HasAchievementCondition';

// Currency
export { CurrencyPlugin } from '@ludiek/plugins/currency/CurrencyPlugin';
export { HasCurrencyCondition } from '@ludiek/plugins/currency/evaluators/HasCurrencyCondition';

// Statistic
export { StatisticPlugin, type StatisticDefinition } from '@ludiek/plugins/statistic/StatisticPlugin';
export { HasStatisticCondition } from '@ludiek/plugins/statistic/evaluators/HasStatisticCondition';
export { HasMapStatisticCondition } from '@ludiek/plugins/statistic/evaluators/HasMapStatisticCondition';
