import { BaseConditionSchema, LudiekEvaluator } from '@ludiek/engine/condition/LudiekEvaluator';
import { z } from 'zod';

export const XorConditionSchema = z.strictObject({
  type: z.literal('/condition/xor'),
  first: BaseConditionSchema,
  second: BaseConditionSchema,
});

export type XorCondition = z.infer<typeof XorConditionSchema>;

type Dependencies = {
  conditions: [LudiekEvaluator];
};

/**
 * A condition which requires exactly on condition to be true
 */
export class XorEvaluator extends LudiekEvaluator<XorCondition, Dependencies> {
  readonly schema = XorConditionSchema;

  evaluate(object: XorCondition): boolean {
    return this.engine.evaluate(object.first) != this.engine.evaluate(object.second);
  }
}
