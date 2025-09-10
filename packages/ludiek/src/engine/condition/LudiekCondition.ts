import { LudiekEngineConcept } from '@ludiek/engine/LudiekEngineConcept';

/**
 * Base shape for all conditions.
 */
export interface BaseConditionShape {
  type: string;
}

/**
 * A LudiekCondition evaluates a given condition shape.
 */
export abstract class LudiekCondition<
  Condition extends BaseConditionShape = BaseConditionShape,
> extends LudiekEngineConcept {
  public abstract readonly type: Condition['type'];

  /**
   * Calculate whether this condition is true
   * @param condition
   */
  public abstract evaluate(condition: Condition): boolean;
}
