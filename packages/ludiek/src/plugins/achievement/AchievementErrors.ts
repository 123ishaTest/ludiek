import { PluginError } from '@ludiek/engine/LudiekError';

export class AchievementPluginError extends PluginError {}

/**
 * Thrown when an unknown achievement is accessed.
 */
export class UnknownAchievementError extends AchievementPluginError {}
