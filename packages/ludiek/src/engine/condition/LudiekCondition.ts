/**
 * Base shape for all conditions.
 */
export interface BaseConditionShape {
  type: string;
}

/**
 * A LudiekCondition evaluates a given condition shape.
 */
export interface LudiekCondition<Condition extends BaseConditionShape = BaseConditionShape> {
  type: string;

  evaluate(condition: Condition): boolean;
}
