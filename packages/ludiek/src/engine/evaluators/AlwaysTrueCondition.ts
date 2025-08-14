import { BaseConditionShape, LudiekCondition } from '@ludiek/engine/LudiekCondition';

interface AlwaysTrueConditionShape extends BaseConditionShape {
  type: 'always-true';
}

/**
 * A condition which is always true
 */
export class AlwaysTrueCondition implements LudiekCondition<AlwaysTrueConditionShape> {
  type = 'always-true';

  evaluate(): boolean {
    return true;
  }
}
