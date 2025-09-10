import { BaseConditionShape, LudiekCondition } from '@ludiek/engine/condition/LudiekCondition';
import { CurrencyPlugin } from '@ludiek/plugins/currency/CurrencyPlugin';

interface HasCurrencyConditionShape extends BaseConditionShape {
  type: '/condition/has-currency';
  id: string;
  amount: number;
}

export class HasCurrencyCondition extends LudiekCondition<HasCurrencyConditionShape> {
  readonly type = '/condition/has-currency' as const;

  private _currency: CurrencyPlugin;

  constructor(currency: CurrencyPlugin) {
    super();
    this._currency = currency;
  }

  evaluate(condition: HasCurrencyConditionShape): boolean {
    return this._currency.hasCurrency(condition);
  }
}
