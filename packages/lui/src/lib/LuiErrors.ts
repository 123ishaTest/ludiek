import { LudiekError } from '@123ishatest/ludiek';

export abstract class LuiError extends LudiekError {}

/**
 * Thrown when the engine is not found in the Svelte context
 */
export class EngineNotFound extends LuiError {}
