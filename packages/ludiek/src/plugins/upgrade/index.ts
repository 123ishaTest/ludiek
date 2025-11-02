// Plugin
export { UpgradePlugin } from '@ludiek/plugins/upgrade/UpgradePlugin';
export type { UpgradeDefinition } from '@ludiek/plugins/upgrade/UpgradeDefinition';

export { type UpgradePluginState, createUpgradeState } from '@ludiek/plugins/upgrade/UpgradePluginState';

// Conditions
export { CanBuyUpgradeEvaluator } from '@ludiek/plugins/upgrade/contributions/CanBuyUpgradeCondition';
export { IsUpgradeAtLevelEvaluator } from '@ludiek/plugins/upgrade/contributions/IsUpgradeAtLevelCondition.js';
export { IsUpgradeMaxedEvaluator } from '@ludiek/plugins/upgrade/contributions/IsUpgradeMaxedCondition';
