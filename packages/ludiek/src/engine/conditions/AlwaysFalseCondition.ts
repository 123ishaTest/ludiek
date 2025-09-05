import { BaseConditionShape, LudiekCondition } from '@ludiek/engine/conditions/LudiekCondition';

interface AlwaysFalseConditionShape extends BaseConditionShape {
  type: 'always-false';
}

/**
 * A condition which is always false
 */
export class AlwaysFalseCondition implements LudiekCondition<AlwaysFalseConditionShape> {
  type = 'always-false';

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  evaluate(object: AlwaysFalseConditionShape): boolean {
    return false;
  }
}
