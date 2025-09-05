import { PluginError } from '@ludiek/engine/LudiekError';

export class SkillPluginError extends PluginError {}

/**
 * Thrown when an unknown skill is accessed.
 */
export class UnknownSkillError extends SkillPluginError {}
