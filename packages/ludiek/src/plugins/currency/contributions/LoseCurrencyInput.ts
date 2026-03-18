import { CurrencyPlugin } from '@ludiek/plugins/currency/CurrencyPlugin';
import { LudiekConsumer } from '@ludiek/engine/input/LudiekConsumer';
import { z } from 'zod';

export const LoseCurrencyInputSchema = z.strictObject({
  type: z.literal('/input/lose-currency'),
  id: z.string(),
  amount: z.number(),
});

export type LoseCurrencyInput = z.infer<typeof LoseCurrencyInputSchema>;

type Dependencies = {
  plugins: [CurrencyPlugin];
};

export class LoseCurrencyConsumer extends LudiekConsumer<LoseCurrencyInput, Dependencies> {
  readonly schema = LoseCurrencyInputSchema;

  canConsume(input: LoseCurrencyInput): boolean {
    return this.engine.plugins.currency.hasCurrency(input);
  }

  consume(input: LoseCurrencyInput): void {
    return this.engine.plugins.currency.loseCurrency(input);
  }
}
