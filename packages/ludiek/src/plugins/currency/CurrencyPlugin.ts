import { APIOf } from '@ludiek/engine/utils';
import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';

export type CurrencyAPI<CurrencyId extends string> = APIOf<CurrencyPlugin<CurrencyId>>;

export class CurrencyPlugin<CurrencyId extends string> extends LudiekPlugin {
  readonly name = 'currency';

  private _balances: Record<string, number> = {};

  constructor(currencies: readonly { id: CurrencyId }[]) {
    super();

    currencies.forEach((currency) => {
      this._balances[currency.id] = 0;
    });
  }

  /**
   * Gain the specified amount of currency
   */
  public gainCurrency(id: CurrencyId, amount: number) {
    this._balances[id] += amount;
  }

  /**
   * Retrieve the balance for the specified currency
   */
  public getBalance(id: CurrencyId): number {
    return this._balances[id];
  }
}
