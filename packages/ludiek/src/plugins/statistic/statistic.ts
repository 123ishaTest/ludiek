// Plugin
export { StatisticPlugin } from '@ludiek/plugins/statistic/StatisticPlugin';
export type {
  StatisticDefinition,
  ScalarStatisticDefinition,
  MapStatisticDefinition,
} from '@ludiek/plugins/statistic/StatisticDefinition';
export { type StatisticPluginState, createStatisticState } from '@ludiek/plugins/statistic/StatisticPluginState';

// Conditions
export { HasScalarStatisticEvaluator } from '@ludiek/plugins/statistic/contributions/HasScalarStatisticCondition';
export { HasMapStatisticEvaluator } from '@ludiek/plugins/statistic/contributions/HasMapStatisticCondition';
