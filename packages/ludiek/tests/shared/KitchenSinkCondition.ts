import { BaseConditionShape, LudiekCondition } from '@ludiek/engine/conditions/LudiekCondition';
import { KitchenSinkPlugin } from '@tests/shared/KitchenSinkPlugin';

export interface HasVariableConditionShape extends BaseConditionShape {
  type: '/condition/has-variable';
  amount: number;
}

export class KitchenSinkCondition implements LudiekCondition<HasVariableConditionShape> {
  readonly type = '/condition/has-variable';

  constructor(private readonly _kitchenSink: KitchenSinkPlugin) {}
  evaluate(condition: HasVariableConditionShape): boolean {
    return this._kitchenSink.variable >= condition.amount;
  }
}
