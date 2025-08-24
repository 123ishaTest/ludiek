export interface BaseRequestShape {
  type: string;
}

export interface LudiekController<Request extends BaseRequestShape = BaseRequestShape> {
  type: string;

  // TODO(@Isha): LudiekResponse object?
  resolve(request: Request): void;
}

export type RequestShape<Requests extends LudiekController[]> =
  Requests[number] extends LudiekController<infer Request> ? Request : never;

export interface RequestEvent {
  timestamp: Date;
  request: BaseRequestShape;
}
