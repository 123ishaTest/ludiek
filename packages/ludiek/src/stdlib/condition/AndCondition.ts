import { BaseCondition, LudiekEvaluator } from '@ludiek/engine/condition/LudiekEvaluator';

interface AndCondition extends BaseCondition {
  type: '/condition/and';
  first: BaseCondition;
  second: BaseCondition;
}

type Dependencies = {
  conditions: [LudiekEvaluator];
};

/**
 * A condition which requires both conditions to be true
 */
export class AndEvaluator extends LudiekEvaluator<AndCondition, Dependencies> {
  readonly type = '/condition/and';

  evaluate(object: AndCondition): boolean {
    return this.engine.evaluate(object.first) && this.engine.evaluate(object.second);
  }
}
