import { BaseConditionShape, LudiekCondition } from '@ludiek/engine/condition/LudiekCondition';

interface AlwaysTrueConditionShape extends BaseConditionShape {
  type: '/condition/true';
}

/**
 * A condition which is always true
 */
export class TrueCondition extends LudiekCondition<AlwaysTrueConditionShape> {
  readonly type = '/condition/true';

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  evaluate(object: AlwaysTrueConditionShape): boolean {
    return true;
  }
}
