import { BaseConditionShape, LudiekCondition } from '@ludiek/engine/conditions/LudiekCondition';

interface AlwaysTrueConditionShape extends BaseConditionShape {
  type: 'always-true';
}

/**
 * A condition which is always true
 */
export class AlwaysTrueCondition implements LudiekCondition<AlwaysTrueConditionShape> {
  readonly type = 'always-true';

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  evaluate(object: AlwaysTrueConditionShape): boolean {
    return true;
  }
}
