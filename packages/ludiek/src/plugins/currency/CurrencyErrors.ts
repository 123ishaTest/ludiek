import { PluginError } from '@ludiek/engine/LudiekError';

export class CurrencyPluginError extends PluginError {}

/**
 * Thrown when an invalid currency is used.
 */
export class InvalidCurrencyError extends CurrencyPluginError {}

/**
 * Thrown when a negative amount is used.
 */
export class NegativeAmountError extends CurrencyPluginError {}
