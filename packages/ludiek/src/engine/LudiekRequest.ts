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

export class RequestHistory {
  private readonly _requests: BaseRequestShape[];

  constructor() {
    this._requests = [];
  }

  public get requests(): BaseRequestShape[] {
    return this._requests;
  }

  public add(request: BaseRequestShape): void {
    this._requests.push(request);
  }
}
