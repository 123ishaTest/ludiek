import { CurrencyPlugin } from '@ludiek/plugins/currency/CurrencyPlugin';
import { BaseOutputShape, LudiekOutput } from '@ludiek/engine/transactions/LudiekOutput';

interface CurrencyOutputShape extends BaseOutputShape {
  type: 'currency';
  id: string;
  amount: number;
}

export class CurrencyOutput implements LudiekOutput<CurrencyOutputShape> {
  readonly type: string = 'currency';

  private _currency: CurrencyPlugin;

  constructor(currency: CurrencyPlugin) {
    this._currency = currency;
  }

  canGain(): boolean {
    return true;
  }
  gain(output: CurrencyOutputShape): void {
    this._currency.gainCurrency(output);
  }
}
