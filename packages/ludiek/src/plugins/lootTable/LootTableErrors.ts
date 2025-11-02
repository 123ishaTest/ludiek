import { PluginError } from '@ludiek/engine/LudiekError';

export class LootTablePluginError extends PluginError {}

/**
 * Thrown when an unknown key item is accessed.
 */
export class UnknownLootTableError extends LootTablePluginError {}
