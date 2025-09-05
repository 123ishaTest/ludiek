import { BaseOutputShape, LudiekOutput } from '@ludiek/engine/output/LudiekOutput';
import { KitchenSinkPlugin } from '@tests/shared/KitchenSinkPlugin';

interface KitchenSinkOutputShape extends BaseOutputShape {
  type: '/output/kitchen-sink';
  amount: number;
}

export class KitchenSinkOutput implements LudiekOutput<KitchenSinkOutputShape> {
  readonly type = '/output/kitchen-sink';

  private _kitchenSink: KitchenSinkPlugin;

  constructor(kitchenSink: KitchenSinkPlugin) {
    this._kitchenSink = kitchenSink;
  }

  canGain(): boolean {
    return true;
  }

  gain(output: KitchenSinkOutputShape): void {
    this._kitchenSink.increase(output.amount);
  }
}
