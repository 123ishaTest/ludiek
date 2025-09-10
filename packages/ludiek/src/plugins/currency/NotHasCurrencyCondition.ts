import { BaseConditionShape, LudiekCondition } from '@ludiek/engine/condition/LudiekCondition';
import { CurrencyPlugin } from '@ludiek/plugins/currency/CurrencyPlugin';

interface NotHasCurrencyConditionShape extends BaseConditionShape {
  type: '/currency/not-has-amount';
  id: string;
  amount: number;
}

export class NotHasCurrencyCondition extends LudiekCondition<NotHasCurrencyConditionShape> {
  readonly type = '/currency/not-has-amount';

  private _currency: CurrencyPlugin;

  constructor(currency: CurrencyPlugin) {
    super();
    this._currency = currency;
  }

  evaluate(condition: NotHasCurrencyConditionShape): boolean {
    return !this._currency.hasCurrency(condition);
  }
}
