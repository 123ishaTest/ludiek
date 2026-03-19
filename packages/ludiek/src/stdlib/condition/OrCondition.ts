import { BaseConditionSchema, LudiekEvaluator } from '@ludiek/engine/condition/LudiekEvaluator';
import { z } from 'zod';

export const OrConditionSchema = z.strictObject({
  type: z.literal('/condition/or'),
  first: BaseConditionSchema,
  second: BaseConditionSchema,
});

export type OrCondition = z.infer<typeof OrConditionSchema>;

type Dependencies = {
  conditions: [LudiekEvaluator];
};

/**
 * A condition which requires at least one condition to be true
 */
export class OrEvaluator extends LudiekEvaluator<OrCondition, Dependencies> {
  readonly schema = OrConditionSchema;

  evaluate(object: OrCondition): boolean {
    return this.engine.evaluate(object.first) || this.engine.evaluate(object.second);
  }
}
