import { BaseConditionShape, LudiekCondition } from '@ludiek/engine/condition/LudiekCondition';
import { CurrencyPlugin } from '@ludiek/plugins/currency/CurrencyPlugin';

interface NotHasCurrencyConditionShape extends BaseConditionShape {
  type: '/condition/not-has-currency';
  id: string;
  amount: number;
}

export class NotHasCurrencyCondition extends LudiekCondition<NotHasCurrencyConditionShape> {
  readonly type = '/condition/not-has-currency';

  private _currency: CurrencyPlugin;

  constructor(currency: CurrencyPlugin) {
    super();
    this._currency = currency;
  }

  evaluate(condition: NotHasCurrencyConditionShape): boolean {
    return !this._currency.hasCurrency(condition);
  }
}
