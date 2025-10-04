import { CurrencyPlugin } from '@ludiek/plugins/currency/CurrencyPlugin';
import { BaseOutput, LudiekProducer } from '@ludiek/engine/output/LudiekProducer';

interface CurrencyOutputShape extends BaseOutput {
  type: '/output/currency';
  id: string;
  amount: number;
}

type Dependencies = {
  plugins: [CurrencyPlugin];
};

export class CurrencyProducer extends LudiekProducer<CurrencyOutputShape, Dependencies> {
  readonly type = '/output/currency';

  canProduce(): boolean {
    return true;
  }

  produce(output: CurrencyOutputShape): void {
    this.engine.plugins.currency.gainCurrency(output);
  }
}
