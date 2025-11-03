import { BaseCondition, LudiekEvaluator } from '@ludiek/engine/condition/LudiekEvaluator';

interface AllCondition extends BaseCondition {
  type: '/condition/all';
  conditions: BaseCondition[];
}

type Dependencies = {
  conditions: [LudiekEvaluator];
};

/**
 * A condition which requires all conditions to be true
 */
export class AllEvaluator extends LudiekEvaluator<AllCondition, Dependencies> {
  readonly type = '/condition/all';

  evaluate(object: AllCondition): boolean {
    return this.engine.evaluate(object.conditions);
  }
}
