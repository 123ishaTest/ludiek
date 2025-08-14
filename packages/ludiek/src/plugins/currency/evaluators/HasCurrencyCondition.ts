import { BaseConditionShape, LudiekCondition } from '@ludiek/engine/LudiekCondition';
import { CurrencyPlugin } from '@ludiek/plugins/currency/CurrencyPlugin';

interface HasCurrencyConditionShape extends BaseConditionShape {
  type: 'has-currency';
  id: string;
  amount: number;
}

export class HasCurrencyCondition implements LudiekCondition<HasCurrencyConditionShape> {
  readonly type: string = 'has-currency';

  private _currency: CurrencyPlugin;

  constructor(currency: CurrencyPlugin) {
    this._currency = currency;
  }

  evaluate(condition: HasCurrencyConditionShape): boolean {
    return this._currency.hasCurrency(condition);
  }
}
