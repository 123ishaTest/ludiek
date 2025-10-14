import { PluginError } from '@ludiek/engine/LudiekError';

export class BuffPluginError extends PluginError {}

/**
 * Thrown when an unknown buff is accessed.
 */
export class UnknownBuffError extends BuffPluginError {}
