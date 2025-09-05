import { BaseRequestShape, LudiekController } from '@ludiek/engine/request/LudiekRequest';

export interface EmptyRequest extends BaseRequestShape {
  type: '/request/empty';
}

export class EmptyController implements LudiekController<EmptyRequest> {
  readonly type = '/request/empty';

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  resolve(request: EmptyRequest): void {
    return;
  }
}
