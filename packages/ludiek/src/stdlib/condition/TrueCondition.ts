import { BaseCondition, LudiekEvaluator } from '@ludiek/engine/condition/LudiekEvaluator';

interface TrueCondition extends BaseCondition {
  type: '/condition/true';
}

/**
 * A condition which is always true
 */
export class TrueEvaluator extends LudiekEvaluator<TrueCondition> {
  readonly type = '/condition/true';

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  evaluate(object: TrueCondition): boolean {
    return true;
  }
}
