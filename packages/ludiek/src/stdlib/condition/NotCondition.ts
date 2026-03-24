import { BaseConditionSchema, LudiekEvaluator } from '@ludiek/engine/condition/LudiekEvaluator';
import { z } from 'zod';

export const NotConditionSchema = z.strictObject({
  type: z.literal('/condition/not'),
  condition: BaseConditionSchema,
});

export type NotCondition = z.infer<typeof NotConditionSchema>;

type Dependencies = {
  evaluators: [LudiekEvaluator];
};

/**
 * A condition which inverts the result of the condition
 */
export class NotEvaluator extends LudiekEvaluator<NotCondition, Dependencies> {
  readonly schema = NotConditionSchema;

  evaluate(object: NotCondition): boolean {
    return !this.engine.evaluate(object.condition);
  }
}
