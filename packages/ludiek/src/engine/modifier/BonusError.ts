import { LudiekError } from '@ludiek/engine/LudiekError';

export abstract class BonusError extends LudiekError {}

/**
 * Thrown when a bonus is not found
 */
export class BonusNotFoundError extends BonusError {}
