import { LudiekEvaluator } from '@ludiek/engine/condition/LudiekEvaluator';
import { z } from 'zod';

export const TrueConditionSchema = z.strictObject({
  type: z.literal('/condition/true'),
});

export type TrueCondition = z.infer<typeof TrueConditionSchema>;

/**
 * A condition which is always true
 */
export class TrueEvaluator extends LudiekEvaluator<TrueCondition> {
  readonly schema = TrueConditionSchema;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  evaluate(object: TrueCondition): boolean {
    return true;
  }
}
