import { BaseCondition, LudiekEvaluator } from '@ludiek/engine/condition/LudiekEvaluator';
import { BuffPlugin } from '@ludiek/plugins/buff/BuffPlugin';

interface IsBuffActiveCondition extends BaseCondition {
  type: '/condition/is-buff-active';
  buff: string;
}

type Dependencies = {
  plugins: [BuffPlugin];
};

export class IsBuffActiveEvaluator extends LudiekEvaluator<IsBuffActiveCondition, Dependencies> {
  readonly type = '/condition/is-buff-active';

  evaluate(condition: IsBuffActiveCondition): boolean {
    return this.engine.plugins.buff.isBuffActive(condition.buff);
  }
}
