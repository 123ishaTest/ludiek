import { CurrencyPlugin } from '@ludiek/plugins/currency/CurrencyPlugin';
import { BaseInputShape, LudiekInput } from '@ludiek/engine/input/LudiekInput';

interface CurrencyInputShape extends BaseInputShape {
  type: '/input/currency';
  id: string;
  amount: number;
}

export class CurrencyInput extends LudiekInput<CurrencyInputShape> {
  readonly type = '/input/currency';

  private _currency: CurrencyPlugin;

  constructor(currency: CurrencyPlugin) {
    super();
    this._currency = currency;
  }

  canLose(input: CurrencyInputShape): boolean {
    return this._currency.hasCurrency(input);
  }

  lose(input: CurrencyInputShape): void {
    return this._currency.loseCurrency(input);
  }
}
