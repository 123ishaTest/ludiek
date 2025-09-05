import { LudiekError } from '@ludiek/engine/LudiekError';

export abstract class ConditionError extends LudiekError {}

/**
 * Thrown when a condition evaluator is not found
 */
export class ConditionNotFoundError extends ConditionError {}
