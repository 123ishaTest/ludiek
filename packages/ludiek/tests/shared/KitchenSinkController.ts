import { BaseRequestShape, LudiekController } from '@ludiek/engine/request/LudiekRequest';
import { KitchenSinkPlugin } from '@tests/shared/KitchenSinkPlugin';

export interface IncreaseVariableRequest extends BaseRequestShape {
  type: '/request/increase-variable';
  amount: number;
}

export class KitchenSinkController implements LudiekController<IncreaseVariableRequest> {
  readonly type = '/request/increase-variable';

  constructor(private readonly _kitchenSink: KitchenSinkPlugin) {}

  resolve(request: IncreaseVariableRequest): void {
    this._kitchenSink.increase(request.amount);
  }
}
