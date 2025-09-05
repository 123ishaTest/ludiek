import { BaseInputShape, LudiekInput } from '@ludiek/engine/inputs/LudiekInput';
import { KitchenSinkPlugin } from '@tests/shared/KitchenSinkPlugin';

interface KitchenSinkInputShape extends BaseInputShape {
  type: '/input/kitchen-sink';
  amount: number;
}

export class KitchenSinkInput implements LudiekInput<KitchenSinkInputShape> {
  readonly type = '/input/kitchen-sink';

  constructor(private readonly _kitchenSink: KitchenSinkPlugin) {}

  canLose(input: KitchenSinkInputShape): boolean {
    return this._kitchenSink.variable >= input.amount;
  }

  lose(input: KitchenSinkInputShape): void {
    return this._kitchenSink.increase(-input.amount);
  }
}
