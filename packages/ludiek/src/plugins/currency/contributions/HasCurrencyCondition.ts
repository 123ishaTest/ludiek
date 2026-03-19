import { z } from 'zod';
import { LudiekEvaluator } from '@ludiek/engine/condition/LudiekEvaluator';
import { CurrencyPlugin } from '@ludiek/plugins/currency/CurrencyPlugin';

export const HasCurrencyConditionSchema = z.strictObject({
  type: z.literal('/condition/has-currency'),
  id: z.string(),
  amount: z.number(),
});

export type HasCurrencyCondition = z.infer<typeof HasCurrencyConditionSchema>;

type Dependencies = {
  plugins: [CurrencyPlugin];
};

export class HasCurrencyEvaluator extends LudiekEvaluator<HasCurrencyCondition, Dependencies> {
  public readonly schema = HasCurrencyConditionSchema;

  evaluate(condition: HasCurrencyCondition): boolean {
    return this.engine.plugins.currency.hasCurrency(condition);
  }
}
