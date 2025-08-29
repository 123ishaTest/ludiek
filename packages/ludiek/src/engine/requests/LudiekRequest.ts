import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';
import { LudiekFeature } from '@ludiek/engine/LudiekFeature';
import { PluginMap } from '@ludiek/engine/LudiekConfiguration';

export interface BaseRequestShape {
  type: string;
}

export interface LudiekController<Request extends BaseRequestShape = BaseRequestShape> {
  type: string;

  // TODO(@Isha): LudiekResponse object?
  resolve(request: Request): void;
}

export type RequestShape<
  Plugins extends LudiekPlugin[],
  Features extends LudiekFeature<PluginMap<Plugins>>[],
> = ControllerRequest<[...Features[number]['controllers'], ...Plugins[number]['controllers']]>;

export type ControllerRequest<Requests extends LudiekController[]> =
  Requests[number] extends LudiekController<infer Request> ? Request : never;

export interface RequestEvent {
  timestamp: Date;
  request: BaseRequestShape;
}
