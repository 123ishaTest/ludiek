import { LudiekError } from '@ludiek/engine/LudiekError';

export abstract class ModifierError extends LudiekError {}

/**
 * Thrown when a modifier processor is not found
 */
export class ModifierNotFoundError extends ModifierError {}
