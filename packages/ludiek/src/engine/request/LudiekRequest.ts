import { LudiekDependencies, LudiekEngineConcept } from '@ludiek/engine/LudiekEngineConcept';

export interface BaseRequest {
  type: string;
}

export abstract class LudiekController<
  Request extends BaseRequest = BaseRequest,
  Dependencies extends LudiekDependencies = object,
> extends LudiekEngineConcept<Dependencies> {
  public abstract readonly type: Request['type'];

  // TODO(@Isha): LudiekResponse object?
  abstract resolve(request: Request): void;
}

/**
 * Given a tuple of LudiekControllers, produce a union of their requests.
 */
export type Request<Controllers extends readonly LudiekController[]> =
  Controllers[number] extends LudiekController<infer Request> ? Request : never;
