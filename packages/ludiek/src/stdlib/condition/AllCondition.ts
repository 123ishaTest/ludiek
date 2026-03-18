import { BaseConditionSchema, LudiekEvaluator } from '@ludiek/engine/condition/LudiekEvaluator';
import { z } from 'zod';

export const AllConditionSchema = z.strictObject({
  type: z.literal('/condition/all'),
  conditions: z.array(BaseConditionSchema),
});

export type AllCondition = z.infer<typeof AllConditionSchema>;

type Dependencies = {
  conditions: [LudiekEvaluator];
};

/**
 * A condition which requires all conditions to be true
 */
export class AllEvaluator extends LudiekEvaluator<AllCondition, Dependencies> {
  readonly schema = AllConditionSchema;

  evaluate(object: AllCondition): boolean {
    return this.engine.evaluate(object.conditions);
  }
}
