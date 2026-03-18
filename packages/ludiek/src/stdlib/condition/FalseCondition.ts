import { LudiekEvaluator } from '@ludiek/engine/condition/LudiekEvaluator';
import { z } from 'zod';

export const FalseConditionSchema = z.strictObject({
  type: z.literal('/condition/false'),
});

export type FalseCondition = z.infer<typeof FalseConditionSchema>;

/**
 * A condition which is always false
 */
export class FalseEvaluator extends LudiekEvaluator<FalseCondition> {
  readonly schema = FalseConditionSchema;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  evaluate(object: FalseCondition): boolean {
    return false;
  }
}
