import { BaseCondition, LudiekEvaluator } from '@ludiek/engine/condition/LudiekEvaluator';

interface OrCondition extends BaseCondition {
  type: '/condition/or';
  first: BaseCondition;
  second: BaseCondition;
}

type Dependencies = {
  conditions: [LudiekEvaluator];
};

/**
 * A condition which requires at least one condition to be true
 */
export class OrEvaluator extends LudiekEvaluator<OrCondition, Dependencies> {
  readonly type = '/condition/or';

  evaluate(object: OrCondition): boolean {
    return this.engine.evaluate(object.first) || this.engine.evaluate(object.second);
  }
}
