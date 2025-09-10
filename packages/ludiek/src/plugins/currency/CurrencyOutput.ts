import { CurrencyPlugin } from '@ludiek/plugins/currency/CurrencyPlugin';
import { BaseOutputShape, LudiekOutput } from '@ludiek/engine/output/LudiekOutput';

interface CurrencyOutputShape extends BaseOutputShape {
  type: '/output/currency';
  id: string;
  amount: number;
}

export class CurrencyOutput extends LudiekOutput<CurrencyOutputShape> {
  readonly type = '/output/currency';

  private _currency: CurrencyPlugin;

  constructor(currency: CurrencyPlugin) {
    super();
    this._currency = currency;
  }

  canGain(): boolean {
    return true;
  }

  gain(output: CurrencyOutputShape): void {
    this._currency.gainCurrency(output);
  }
}
