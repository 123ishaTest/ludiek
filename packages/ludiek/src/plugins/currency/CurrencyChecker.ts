import { CurrencyPlugin } from '@ludiek/plugins/currency/CurrencyPlugin';
import { RequirementChecker } from '@ludiek/engine/LudiekRequirement';

export interface CurrencyRequirement<CurrencyId> {
  type: 'currency';
  id: CurrencyId;
  amount: number;
}

export class CurrencyChecker<CurrencyId extends string> implements RequirementChecker<CurrencyRequirement<CurrencyId>> {
  readonly type: string = 'currency';

  private _currency: CurrencyPlugin<CurrencyId>;

  constructor(currency: CurrencyPlugin<CurrencyId>) {
    this._currency = currency;
  }

  has(req: CurrencyRequirement<CurrencyId>): boolean {
    return this._currency.hasCurrency(req);
  }
}
