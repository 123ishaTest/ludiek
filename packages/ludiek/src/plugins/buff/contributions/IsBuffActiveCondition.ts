import { z } from 'zod';
import { LudiekEvaluator } from '@ludiek/engine/condition/LudiekEvaluator';
import { BuffPlugin } from '@ludiek/plugins/buff/BuffPlugin';

export const IsBuffActiveConditionSchema = z.strictObject({
  type: z.literal('/condition/is-buff-active'),
  buff: z.string(),
});

export type IsBuffActiveCondition = z.infer<typeof IsBuffActiveConditionSchema>;

type Dependencies = {
  plugins: [BuffPlugin];
};

export class IsBuffActiveEvaluator extends LudiekEvaluator<IsBuffActiveCondition, Dependencies> {
  readonly schema = IsBuffActiveConditionSchema;

  evaluate(condition: IsBuffActiveCondition): boolean {
    return this.engine.plugins.buff.isBuffActive(condition.buff);
  }
}
