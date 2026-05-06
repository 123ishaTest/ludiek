import { LudiekError } from '@ludiek/engine/LudiekError';

export abstract class RequestError extends LudiekError {}

/**
 * Thrown when a request is not found
 */
export class RequestNotFoundError extends RequestError {}
