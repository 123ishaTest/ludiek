import { PluginError } from '@ludiek/engine/LudiekError';

export class StatisticPluginError extends PluginError {}

/**
 * Thrown when an unknown statistic is accessed.
 */
export class UnknownStatisticError extends StatisticPluginError {}

/**
 * Thrown when an unknown map statistic is accessed.
 */
export class UnknownMapStatisticError extends StatisticPluginError {}

/**
 * Thrown when an invalid statistic type is passed
 */
export class InvalidStatisticTypeError extends StatisticPluginError {}
