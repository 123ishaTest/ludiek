import { CurrencyPlugin } from '@ludiek/plugins/currency/CurrencyPlugin';
import { BaseOutput, LudiekProducer } from '@ludiek/engine/output/LudiekProducer';

export interface GainCurrencyOutput extends BaseOutput {
  type: '/output/gain-currency';
  id: string;
  amount: number;
}

type Dependencies = {
  plugins: [CurrencyPlugin];
};

export class GainCurrencyProducer extends LudiekProducer<GainCurrencyOutput, Dependencies> {
  readonly type = '/output/gain-currency';

  canProduce(): boolean {
    return true;
  }

  produce(output: GainCurrencyOutput): void {
    this.engine.plugins.currency.gainCurrency(output);
  }
}
