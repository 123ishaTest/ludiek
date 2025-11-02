import { CurrencyPlugin } from '@ludiek/plugins/currency/CurrencyPlugin';
import { BaseInput, LudiekConsumer } from '@ludiek/engine/input/LudiekConsumer';

export interface LoseCurrencyInput extends BaseInput {
  type: '/input/lose-currency';
  id: string;
  amount: number;
}

type Dependencies = {
  plugins: [CurrencyPlugin];
};

export class LoseCurrencyConsumer extends LudiekConsumer<LoseCurrencyInput, Dependencies> {
  readonly type = '/input/lose-currency';

  canConsume(input: LoseCurrencyInput): boolean {
    return this.engine.plugins.currency.hasCurrency(input);
  }

  consume(input: LoseCurrencyInput): void {
    return this.engine.plugins.currency.loseCurrency(input);
  }
}
