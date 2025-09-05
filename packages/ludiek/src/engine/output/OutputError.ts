import { LudiekError } from '@ludiek/engine/LudiekError';

export abstract class OutputError extends LudiekError {}

/**
 * Thrown when an output processor is not found
 */
export class OutputNotFoundError extends OutputError {}
