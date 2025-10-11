import { PluginError } from '@ludiek/engine/LudiekError';

export class KeyItemPluginError extends PluginError {}

/**
 * Thrown when an unknown key item is accessed.
 */
export class UnknownKeyItemError extends KeyItemPluginError {}
