import { BaseConditionShape, LudiekCondition } from '@ludiek/engine/LudiekCondition';
import { CurrencyPlugin } from '@ludiek/plugins/currency/CurrencyPlugin';

interface HasCurrencyConditionShape<CurrencyId> extends BaseConditionShape {
  type: 'currency';
  id: CurrencyId;
  amount: number;
}

export class HasCurrencyCondition<CurrencyId extends string>
  implements LudiekCondition<HasCurrencyConditionShape<CurrencyId>>
{
  readonly type: string = 'currency';

  private _currency: CurrencyPlugin<CurrencyId>;

  constructor(currency: CurrencyPlugin<CurrencyId>) {
    this._currency = currency;
  }

  evaluate(condition: HasCurrencyConditionShape<CurrencyId>): boolean {
    return this._currency.hasCurrency(condition);
  }
}
