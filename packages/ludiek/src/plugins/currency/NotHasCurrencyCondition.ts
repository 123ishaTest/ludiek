import { BaseConditionShape, LudiekCondition } from '@ludiek/engine/condition/LudiekCondition';
import { CurrencyPlugin } from '@ludiek/plugins/currency/CurrencyPlugin';

interface NotHasCurrencyConditionShape extends BaseConditionShape {
  type: 'not-has-currency';
  id: string;
  amount: number;
}

export class NotHasCurrencyCondition implements LudiekCondition<NotHasCurrencyConditionShape> {
  readonly type = 'not-has-currency' as const;

  private _currency: CurrencyPlugin;

  constructor(currency: CurrencyPlugin) {
    this._currency = currency;
  }

  evaluate(condition: NotHasCurrencyConditionShape): boolean {
    return !this._currency.hasCurrency(condition);
  }
}
