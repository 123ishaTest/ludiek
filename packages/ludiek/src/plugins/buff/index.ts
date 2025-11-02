// Plugin
export { BuffPlugin } from '@ludiek/plugins/buff/BuffPlugin';
export type { BuffDefinition } from '@ludiek/plugins/buff/BuffDefinition';

export { type BuffPluginState, createBuffState } from '@ludiek/plugins/buff/BuffPluginState';

// Conditions
export { IsBuffActiveEvaluator } from '@ludiek/plugins/buff/contributions/IsBuffActiveCondition';

// Output
export { IncreaseBuffDurationProducer } from '@ludiek/plugins/buff/contributions/IncreaseBuffDurationOutput';
export { SetBuffDurationProducer } from '@ludiek/plugins/buff/contributions/SetBuffDurationOutput';
