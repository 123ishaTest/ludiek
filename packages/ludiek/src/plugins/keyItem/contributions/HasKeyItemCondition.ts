import { z } from 'zod';
import { LudiekEvaluator } from '@ludiek/engine/condition/LudiekEvaluator';
import { KeyItemPlugin } from '@ludiek/plugins/keyItem/KeyItemPlugin';

export const HasKeyItemConditionSchema = z.strictObject({
  type: z.literal('/condition/has-key-item'),
  item: z.string(),
});

export type HasKeyItemCondition = z.infer<typeof HasKeyItemConditionSchema>;

type Dependencies = {
  plugins: [KeyItemPlugin];
};

export class HasKeyItemEvaluator extends LudiekEvaluator<HasKeyItemCondition, Dependencies> {
  readonly schema = HasKeyItemConditionSchema;

  evaluate(condition: HasKeyItemCondition): boolean {
    return this.engine.plugins.keyItem.hasKeyItem(condition.item);
  }
}
