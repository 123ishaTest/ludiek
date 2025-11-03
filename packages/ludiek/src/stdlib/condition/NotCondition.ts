import { BaseCondition, LudiekEvaluator } from '@ludiek/engine/condition/LudiekEvaluator';

interface NotCondition extends BaseCondition {
  type: '/condition/not';
  condition: BaseCondition;
}

type Dependencies = {
  conditions: [LudiekEvaluator];
};

/**
 * A condition which inverts the result of the condition
 */
export class NotEvaluator extends LudiekEvaluator<NotCondition, Dependencies> {
  readonly type = '/condition/not';

  evaluate(object: NotCondition): boolean {
    return !this.engine.evaluate(object.condition);
  }
}
