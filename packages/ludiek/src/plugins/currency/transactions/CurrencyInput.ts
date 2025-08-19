import { CurrencyPlugin } from '@ludiek/plugins/currency/CurrencyPlugin';
import { BaseInputShape, LudiekInput } from '@ludiek/engine/transactions/LudiekInput';

interface CurrencyInputShape extends BaseInputShape {
  type: 'currency';
  id: string;
  amount: number;
}

export class CurrencyInput implements LudiekInput<CurrencyInputShape> {
  readonly type: string = 'currency';

  private _currency: CurrencyPlugin;

  constructor(currency: CurrencyPlugin) {
    this._currency = currency;
  }

  canLose(input: CurrencyInputShape): boolean {
    return this._currency.hasCurrency(input);
  }

  lose(input: CurrencyInputShape): void {
    return this._currency.loseCurrency(input);
  }
}
