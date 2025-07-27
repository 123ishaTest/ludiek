import { PluginError } from '@ludiek/engine/LudiekError';

export class StatisticPluginError extends PluginError {}

/**
 * Thrown when an invalid statistic type is passed
 */
export class InvalidStatisticTypeError extends StatisticPluginError {}
