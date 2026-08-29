import { LudiekError } from '@ludiek/engine/LudiekError';

export abstract class MutationError extends LudiekError {}

/**
 * Thrown when a mutator is not found
 */
export class MutationNotFoundError extends MutationError {}
