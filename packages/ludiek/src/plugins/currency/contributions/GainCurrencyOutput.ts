import { z } from 'zod';
import { CurrencyPlugin } from '@ludiek/plugins/currency/CurrencyPlugin';
import { LudiekProducer } from '@ludiek/engine/output/LudiekProducer';

export const GainCurrencyOutputSchema = z.strictObject({
  type: z.literal('/output/gain-currency'),
  id: z.string(),
  amount: z.number().positive(),
});

export type GainCurrencyOutput = z.infer<typeof GainCurrencyOutputSchema>;

type Dependencies = {
  plugins: [CurrencyPlugin];
};

export class GainCurrencyProducer extends LudiekProducer<GainCurrencyOutput, Dependencies> {
  readonly schema = GainCurrencyOutputSchema;

  canProduce(): boolean {
    return true;
  }

  produce(output: GainCurrencyOutput): void {
    this.engine.plugins.currency.gainCurrency(output);
  }
}
