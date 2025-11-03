import { BaseCondition, LudiekEvaluator } from '@ludiek/engine/condition/LudiekEvaluator';

interface XorCondition extends BaseCondition {
  type: '/condition/xor';
  first: BaseCondition;
  second: BaseCondition;
}

type Dependencies = {
  conditions: [LudiekEvaluator];
};

/**
 * A condition which requires exactly on condition to be true
 */
export class XorEvaluator extends LudiekEvaluator<XorCondition, Dependencies> {
  readonly type = '/condition/xor';

  evaluate(object: XorCondition): boolean {
    return this.engine.evaluate(object.first) != this.engine.evaluate(object.second);
  }
}
