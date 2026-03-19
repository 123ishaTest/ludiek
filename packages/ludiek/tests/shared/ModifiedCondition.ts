import { z } from 'zod';
import { LudiekEvaluator } from '@ludiek/engine/condition/LudiekEvaluator';
import { DummyModifier } from '@tests/shared/DummyBonus';

export const ModifiedConditionSchema = z.strictObject({
  type: z.literal('/condition/modified'),
  value: z.number(),
});

export type ModifiedCondition = z.infer<typeof ModifiedConditionSchema>;

type Dependencies = {
  modifiers: [DummyModifier];
};

/**
 * An evaluator that has a modifier and only evaluates to true if that bonus is >1
 */
export class ModifiedEvaluator extends LudiekEvaluator<ModifiedCondition, Dependencies> {
  readonly schema = ModifiedConditionSchema;

  modify(condition: ModifiedCondition): ModifiedCondition {
    condition.value /= this.getBonus({ type: '/bonus/dummy' });
    return super.modify(condition);
  }

  evaluate(condition: ModifiedCondition): boolean {
    return condition.value < 1;
  }
}
