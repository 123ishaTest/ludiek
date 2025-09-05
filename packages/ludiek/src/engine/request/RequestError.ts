import { LudiekError } from '@ludiek/engine/LudiekError';

export abstract class RequestError extends LudiekError {}

/**
 * Thrown when a controller is not found
 */
export class ControllerNotFoundError extends RequestError {}
