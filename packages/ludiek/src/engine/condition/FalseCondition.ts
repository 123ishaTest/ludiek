import { BaseConditionShape, LudiekCondition } from '@ludiek/engine/condition/LudiekCondition';

interface FalseConditionShape extends BaseConditionShape {
  type: '/condition/false';
}

/**
 * A condition which is always false
 */
export class FalseCondition extends LudiekCondition<FalseConditionShape> {
  readonly type = '/condition/false';

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  evaluate(object: FalseConditionShape): boolean {
    return false;
  }
}
