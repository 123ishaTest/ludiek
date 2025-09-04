import { BaseRequestShape, LudiekController } from '@ludiek/engine/requests/LudiekRequest';
import { KitchenSinkPlugin } from '@tests/shared/KitchenSinkPlugin';

export interface IncreaseVariableRequest extends BaseRequestShape {
  type: '/controller/increase-variable';
  amount: number;
}

export class KitchenSinkController implements LudiekController<IncreaseVariableRequest> {
  readonly type = '/controller/increase-variable';

  constructor(private readonly _kitchenSink: KitchenSinkPlugin) {}

  resolve(request: IncreaseVariableRequest): void {
    this._kitchenSink.increase(request.amount);
  }
}
