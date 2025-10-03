import { LudiekDependencies, LudiekEngineConcept } from '@ludiek/engine/LudiekEngineConcept';

/**
 * Base shape for all conditions.
 */
export interface BaseCondition {
  type: string;
}

/**
 * A LudiekEvaluator evaluates a given condition.
 */
export abstract class LudiekEvaluator<
  Condition extends BaseCondition = BaseCondition,
  Dependencies extends LudiekDependencies = object,
> extends LudiekEngineConcept<Dependencies> {
  public abstract readonly type: Condition['type'];

  /**
   * Calculate whether the condition is true
   * @param condition
   */
  public abstract evaluate(condition: Condition): boolean;
}

/**
 * Given a tuple of LudiekEvaluators, produce a union of their Conditions.
 */
export type Condition<Evaluators extends readonly LudiekEvaluator[]> =
  Evaluators[number] extends LudiekEvaluator<infer Condition> ? Condition : never;
