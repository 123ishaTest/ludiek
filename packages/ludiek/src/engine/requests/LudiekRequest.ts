import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';

export interface BaseRequestShape {
  type: string;
}

export interface LudiekController<Request extends BaseRequestShape = BaseRequestShape> {
  type: string;

  // TODO(@Isha): LudiekResponse object?
  resolve(request: Request): void;
}

export interface RequestEvent {
  timestamp: Date;
  request: BaseRequestShape;
}

/**
 * Create a union of RequestShapes from a list of LudiekRequests.
 */
export type RequestShape<Controllers extends LudiekController[]> =
  Controllers[number] extends LudiekController<infer Request> ? Request : never;

/**
 * Extract the list of requests from a plugins config and account for it being optional.
 */
export type PluginRequests<Plugins extends LudiekPlugin[] | undefined = undefined> = Plugins extends undefined
  ? []
  : NonNullable<Plugins>[number]['config'] extends { requests?: (infer C)[] }
    ? C[]
    : never;

export type EngineController<
  Plugins extends LudiekPlugin[] | undefined,
  Controllers extends LudiekController[] | undefined,
> = [...PluginRequests<Plugins>, ...(Controllers extends undefined ? [] : NonNullable<Controllers>)];

/**
 * Build all requests available to the engine by combining the PluginRequests and ConfigRequests
 */
export type EngineRequestShape<
  Plugins extends LudiekPlugin[] | undefined,
  Controllers extends LudiekController[] | undefined,
> = Controllers | Plugins extends undefined ? never : RequestShape<EngineController<Plugins, Controllers>>;
