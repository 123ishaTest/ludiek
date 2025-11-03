import { BaseCondition, LudiekEvaluator } from '@ludiek/engine/condition/LudiekEvaluator';

interface AnyCondition extends BaseCondition {
  type: '/condition/any';
  conditions: BaseCondition[];
}

type Dependencies = {
  conditions: [LudiekEvaluator];
};

/**
 * A condition which requires at least one condition to be true
 */
export class AnyEvaluator extends LudiekEvaluator<AnyCondition, Dependencies> {
  readonly type = '/condition/any';

  evaluate(object: AnyCondition): boolean {
    return object.conditions.some((condition) => this.engine.evaluate(condition));
  }
}
