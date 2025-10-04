import { CurrencyPlugin } from '@ludiek/plugins/currency/CurrencyPlugin';
import { BaseInput, LudiekConsumer } from '@ludiek/engine/input/LudiekConsumer';

interface CurrencyInput extends BaseInput {
  type: '/input/currency';
  id: string;
  amount: number;
}

type Dependencies = {
  plugins: [CurrencyPlugin];
};

export class CurrencyConsumer extends LudiekConsumer<CurrencyInput, Dependencies> {
  readonly type = '/input/currency';

  canConsume(input: CurrencyInput): boolean {
    return this.engine.plugins.currency.hasCurrency(input);
  }

  consume(input: CurrencyInput): void {
    return this.engine.plugins.currency.loseCurrency(input);
  }
}
