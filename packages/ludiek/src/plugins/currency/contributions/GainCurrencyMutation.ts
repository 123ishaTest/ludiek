import { z } from 'zod';
import { CurrencyPlugin } from '@ludiek/plugins/currency/CurrencyPlugin';
import { LudiekMutator } from '@ludiek/engine/mutation/LudiekMutator';

export const GainCurrencyMutationSchema = z.strictObject({
  type: z.literal('/mutation/gain-currency'),
  id: z.string(),
  amount: z.number().positive(),
});

export type GainCurrencyMutation = z.infer<typeof GainCurrencyMutationSchema>;

type Dependencies = {
  plugins: [CurrencyPlugin];
};

export class GainCurrencyMutator extends LudiekMutator<GainCurrencyMutation, Dependencies> {
  readonly schema = GainCurrencyMutationSchema;

  canApply(): boolean {
    return true;
  }

  apply(mutation: GainCurrencyMutation): void {
    this.engine.plugins.currency.gainCurrency(mutation);
  }
}
