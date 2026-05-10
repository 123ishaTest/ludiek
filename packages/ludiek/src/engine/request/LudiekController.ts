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

export type BaseResponse<Data> = SuccessResponse<Data> | FailureResponse;

export interface SuccessResponse<Data> {
  success: true;
  data?: Data;
}

export interface FailureResponse {
  success: false;
  error?: string;
}

export abstract class LudiekController<
  Request extends BaseRequest = BaseRequest,
  Response = unknown,
  Dependencies extends LudiekDependencies = object,
> extends LudiekEngineContribution<Dependencies> {
  declare readonly __request: Request;
  declare readonly __response: Response;

  public abstract readonly schema: z.ZodObject<{
    type: z.ZodLiteral<Request['type']>;
  }>;

  get type(): Request['type'] {
    return this.schema.shape.type.value;
  }

  /**
   * Resolve a request by providing a response
   * @param request
   */
  abstract resolve(request: Request): BaseResponse<Response>;

  /**
   * Create a success response including typed data
   * @param data
   * @protected
   */
  protected success(data?: Response): SuccessResponse<Response> {
    return {
      success: true,
      data,
    };
  }

  /**
   * Create a failure response
   * @param error
   * @protected
   */
  protected failure(error?: string): FailureResponse {
    return {
      success: false,
      error: error,
    };
  }

  protected response(success: boolean, error: string): FailureResponse;
  protected response(success: boolean, data: Response): SuccessResponse<Response>;
  protected response(success: boolean, value: Response | string): FailureResponse | SuccessResponse<Response> {
    if (success) {
      return this.success(value as Response);
    }
    return this.failure(value as string);
  }
}

/**
 * Given a tuple of LudiekControllers, produce a union of their Requests.
 */
export type LudiekRequest<Controllers extends readonly LudiekController[] = []> =
  IsNonEmpty<Controllers> extends false ? never : NonNullable<Controllers[number]['__request']>;

/**
 * Given a tuple of LudiekControllers and a specific Request, get the specific Response
 */
export type LudiekResponse<
  Controllers extends readonly LudiekController[],
  Request extends LudiekRequest<Controllers>,
> = BaseResponse<Extract<Controllers[number], { type: Request['type'] }>['__response']>;
