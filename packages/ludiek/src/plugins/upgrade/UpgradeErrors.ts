import { PluginError } from '@ludiek/engine/LudiekError';

export class UpgradePluginError extends PluginError {}

/**
 * Thrown when an unknown upgrade is accessed.
 */
export class UnknownUpgradeError extends UpgradePluginError {}

/**
 * Thrown when an upgrade has mismatching costs and bonuses.
 */
export class UnknownLevelMismatchError extends UpgradePluginError {}
