import { APIOf } from '@ludiek/engine/utils';
import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';
import { ISimpleEvent, SimpleEventDispatcher } from 'strongly-typed-events';

export type CurrencyAPI<CurrencyId extends string> = APIOf<CurrencyPlugin<CurrencyId>>;

export type Currency<CurrencyId extends string = string> = {
  id: CurrencyId;
  amount: number;
};

export class CurrencyPlugin<CurrencyId extends string> extends LudiekPlugin {
  readonly name = 'currency';

  private _balances: Record<string, number> = {};

  protected _onCurrencyGain = new SimpleEventDispatcher<Currency<CurrencyId>>();

  constructor(currencies: readonly { id: CurrencyId }[]) {
    super();

    currencies.forEach((currency) => {
      this._balances[currency.id] = 0;
    });
  }

  /**
   * Gain the specified amount of currency
   */
  public gainCurrency(id: CurrencyId, amount: number): void {
    this._balances[id] += amount;
    this._onCurrencyGain.dispatch({ id, amount });
  }

  /**
   * Lose the specified amount of currency
   */
  public loseCurrency(id: CurrencyId, amount: number): void {
    this._balances[id] -= amount;
  }

  /**
   * Try to spend the specified amount of currency if you have it.
   * @return true if it was spent
   */
  public payCurrency(id: CurrencyId, amount: number): boolean {
    if (!this.hasCurrency(id, amount)) {
      return false;
    }
    this.loseCurrency(id, amount);
    return true;
  }

  /**
   * Whether we have the provided amount of currency
   */
  public hasCurrency(id: CurrencyId, amount: number): boolean {
    return this.getBalance(id) >= amount;
  }

  /**
   * Retrieve the balance for the specified currency
   */
  public getBalance(id: CurrencyId): number {
    return this._balances[id];
  }

  /**
   * Emitted whenever a currency is gained
   */
  public get onCurrencyGain(): ISimpleEvent<Currency<CurrencyId>> {
    return this._onCurrencyGain.asEvent();
  }
}
