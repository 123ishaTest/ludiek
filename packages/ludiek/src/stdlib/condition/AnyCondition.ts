import { BaseConditionSchema, LudiekEvaluator } from '@ludiek/engine/condition/LudiekEvaluator';
import { z } from 'zod';

export const AnyConditionSchema = z.strictObject({
  type: z.literal('/condition/any'),
  conditions: z.array(BaseConditionSchema),
});

export type AnyCondition = z.infer<typeof AnyConditionSchema>;

type Dependencies = {
  conditions: [LudiekEvaluator];
};

/**
 * A condition which requires at least one condition to be true
 */
export class AnyEvaluator extends LudiekEvaluator<AnyCondition, Dependencies> {
  readonly schema = AnyConditionSchema;

  evaluate(object: AnyCondition): boolean {
    return object.conditions.some((condition) => this.engine.evaluate(condition));
  }
}
