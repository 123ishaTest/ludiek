import { z } from 'zod';
import { LudiekDependencies, LudiekEngineContribution } from '@ludiek/engine/LudiekEngineContribution';
import { IsNonEmpty } from '@ludiek/util/types';

/**
 * Base shape for all requests.
 */
export const BaseRequestSchema = z.strictObject({
  type: z.string(),
});

export type BaseRequest = z.infer<typeof BaseRequestSchema>;

export abstract class LudiekController<
  Request extends BaseRequest = BaseRequest,
  Dependencies extends LudiekDependencies = object,
> extends LudiekEngineContribution<Dependencies> {
  declare readonly __request: Request;

  public abstract readonly schema: z.ZodObject<{
    type: z.ZodLiteral<Request['type']>;
  }>;

  get type(): Request['type'] {
    return this.schema.shape.type.value;
  }

  // TODO(@Isha): LudiekResponse object?
  abstract resolve(request: Request): unknown;
}

/**
 * Given a tuple of LudiekControllers, produce a union of their Requests.
 */
export type LudiekRequest<Controllers extends readonly LudiekController[] = []> =
  IsNonEmpty<Controllers> extends false ? never : NonNullable<Controllers[number]['__request']>;
