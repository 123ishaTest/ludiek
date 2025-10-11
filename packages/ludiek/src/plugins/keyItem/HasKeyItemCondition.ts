import { KeyItemPlugin } from '@ludiek/plugins/keyItem/KeyItemPlugin';
import { BaseCondition, LudiekEvaluator } from '@ludiek/engine/condition/LudiekEvaluator';

interface HasKeyItemCondition extends BaseCondition {
  type: '/condition/key-item';
  item: string;
}

type Dependencies = {
  plugins: [KeyItemPlugin];
};

export class HasKeyItemEvaluator extends LudiekEvaluator<HasKeyItemCondition, Dependencies> {
  readonly type = '/condition/key-item';

  evaluate(condition: HasKeyItemCondition): boolean {
    return this.engine.plugins.keyItem.hasKeyItem(condition.item);
  }
}
