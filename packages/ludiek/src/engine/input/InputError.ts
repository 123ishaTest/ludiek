import { LudiekError } from '@ludiek/engine/LudiekError';

export abstract class InputError extends LudiekError {}

/**
 * Thrown when an input processor is not found
 */
export class InputNotFoundError extends InputError {}
