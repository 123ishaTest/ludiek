import { BaseCondition, LudiekEvaluator } from '@ludiek/engine/condition/LudiekEvaluator';

interface FalseCondition extends BaseCondition {
  type: '/condition/false';
}

/**
 * A condition which is always false
 */
export class FalseEvaluator extends LudiekEvaluator<FalseCondition> {
  readonly type = '/condition/false';

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  evaluate(object: FalseCondition): boolean {
    return false;
  }
}
