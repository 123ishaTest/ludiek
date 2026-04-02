import { z } from 'zod';
import { LudiekDependencies, LudiekEngineConcept } from '@ludiek/engine/LudiekEngineConcept';
import { IsNonEmpty } from '@ludiek/util/types';

/**
 * Base shape for all conditions.
 */
export const BaseConditionSchema = z.strictObject({
  type: z.string(),
});

export type BaseCondition = z.infer<typeof BaseConditionSchema>;

/**
 * A LudiekEvaluator evaluates a given condition.
 */
export abstract class LudiekEvaluator<
  Condition extends BaseCondition = BaseCondition,
  Dependencies extends LudiekDependencies = object,
> extends LudiekEngineConcept<Dependencies> {
  declare readonly __condition: Condition;

  public abstract readonly schema: z.ZodObject<{
    type: z.ZodLiteral<Condition['type']>;
  }>;

  get type(): Condition['type'] {
    return this.schema.shape.type.value;
  }

  /**
   * Apply modifiers to this condition.
   * Override to define your modifiers
   */
  public modify(condition: Condition): Condition {
    return condition;
  }

  /**
   * Calculate whether the condition is true
   * @param condition
   */
  public abstract evaluate(condition: Condition): boolean;
}

/**
 * Given a tuple of LudiekEvaluators, produce a union of their Conditions.
 */
export type LudiekCondition<Evaluators extends readonly LudiekEvaluator[]> =
  IsNonEmpty<Evaluators> extends false ? never : NonNullable<Evaluators[number]['__condition']>;

/**
 * Given a tuple of LudiekEvaluators, produce a union of their schemas.
 */
export type EvaluatorSchemas<Evaluators extends readonly LudiekEvaluator[]> = {
  [Key in keyof Evaluators]: Evaluators[Key] extends LudiekEvaluator ? Evaluators[Key]['schema'] : never;
};
