export interface BaseConditionShape {
  type: string;
}

export interface LudiekCondition<Condition extends BaseConditionShape = BaseConditionShape> {
  type: string;

  evaluate(condition: Condition): boolean;
}

export type ConditionShape<Conditions extends LudiekCondition[]> =
  Conditions[number] extends LudiekCondition<infer Condition> ? Condition : never;
