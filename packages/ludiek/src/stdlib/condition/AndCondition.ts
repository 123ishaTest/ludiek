import { BaseConditionSchema, LudiekEvaluator } from '@ludiek/engine/condition/LudiekEvaluator';
import { z } from 'zod';

export const AndConditionSchema = z.strictObject({
  type: z.literal('/condition/and'),
  first: BaseConditionSchema,
  second: BaseConditionSchema,
});

export type AndCondition = z.infer<typeof AndConditionSchema>;

type Dependencies = {
  conditions: [LudiekEvaluator];
};

/**
 * A condition which requires both conditions to be true
 */
export class AndEvaluator extends LudiekEvaluator<AndCondition, Dependencies> {
  readonly schema = AndConditionSchema;

  evaluate(object: AndCondition): boolean {
    return this.engine.evaluate(object.first) && this.engine.evaluate(object.second);
  }
}
