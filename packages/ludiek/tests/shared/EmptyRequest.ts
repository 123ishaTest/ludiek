import { BaseRequest, LudiekController } from '@ludiek/engine/request/LudiekRequest';

export interface EmptyRequest extends BaseRequest {
  type: '/request/empty';
}

export class EmptyController extends LudiekController<EmptyRequest> {
  readonly type = '/request/empty';

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  resolve(request: EmptyRequest): void {
    return;
  }
}
