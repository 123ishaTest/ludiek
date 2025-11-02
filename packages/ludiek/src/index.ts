/**
 * Ludiek
 */
// Engine
export { LudiekEngine } from '@ludiek/engine/LudiekEngine';
export { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';
export { LudiekFeature } from '@ludiek/engine/LudiekFeature';
export { LudiekGame } from '@ludiek/engine/LudiekGame';

// Engine.Conditions
export { LudiekEvaluator, type BaseCondition, type LudiekCondition } from '@ludiek/engine/condition/LudiekEvaluator';

// Engine.Input
export { LudiekConsumer, type BaseInput, type LudiekInput } from '@ludiek/engine/input/LudiekConsumer';

// Engine.Output
export { LudiekProducer, type BaseOutput, type LudiekOutput } from '@ludiek/engine/output/LudiekProducer';

// Engine.Transactions
export type { LudiekTransaction } from '@ludiek/engine/transaction/LudiekTransaction';

// Engine.Requests
export { LudiekController, type BaseRequest, type LudiekRequest } from '@ludiek/engine/request/LudiekRequest';

// Engine.Modifiers
export {
  LudiekModifier,
  type BaseBonus,
  type LudiekBonus,
  type LudiekBonusContribution,
} from '@ludiek/engine/modifier/LudiekModifier';

// Engine.Types
export type { LudiekDependencies, DependencyEngine } from '@ludiek/engine/LudiekEngineConcept';

// Engine.Errors
export { LudiekError } from '@ludiek/engine/LudiekError';

/**
 * Plugins
 */
export * from '@ludiek/plugins/achievement';
export * from '@ludiek/plugins/buff';
export * from '@ludiek/plugins/coupon';
export * from '@ludiek/plugins/currency';
export * from '@ludiek/plugins/keyItem';
export * from '@ludiek/plugins/lootTable';
export * from '@ludiek/plugins/skill';
export * from '@ludiek/plugins/statistic/statistic';
export * from '@ludiek/plugins/upgrade';

/**
 * Stdlib
 */
export * from '@ludiek/stdlib/stdlib';

/**
 * Util
 */
export { hash } from '@ludiek/util/hash';
export { type Progress, progress } from '@ludiek/util/progress';
