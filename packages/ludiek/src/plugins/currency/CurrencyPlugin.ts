import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';
import { ISimpleEvent, SimpleEventDispatcher } from 'strongly-typed-events';
import { InvalidCurrencyError, NegativeAmountError } from '@ludiek/plugins/currency/CurrencyErrors';

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
  public gainCurrency(currency: Currency<CurrencyId>): void {
    this.validate(currency, 'gain');
    this._balances[currency.id] += currency.amount;
    this._onCurrencyGain.dispatch(currency);
  }

  /**
   * Gain a list of currencies
   */
  public gainCurrencies(currencies: Currency<CurrencyId>[]): void {
    currencies.forEach((c) => this.validate(c, 'gain multiple'));
    currencies.forEach((c) => {
      this.gainCurrency(c);
    });
  }

  /**
   * Lose the specified amount of currency
   */
  public loseCurrency(currency: Currency<CurrencyId>): void {
    this.validate(currency, 'lose');

    this._balances[currency.id] -= currency.amount;
  }

  /**
   * Try to spend the specified amount of currency if you have it.
   * @return true if it was spent
   */
  public payCurrency(currency: Currency<CurrencyId>): boolean {
    this.validate(currency, 'pay');

    if (!this.hasCurrency(currency)) {
      return false;
    }
    this.loseCurrency(currency);
    return true;
  }

  /**
   * Whether we have the provided amount of currency
   */
  public hasCurrency(currency: Currency<CurrencyId>): boolean {
    return this.getBalance(currency.id) >= currency.amount;
  }

  /**
   * Retrieve the balance for the specified currency
   */
  public getBalance(id: CurrencyId): number {
    if (!this.supportsCurrency(id)) {
      throw new InvalidCurrencyError(`Cannot currency '${id}' asit does not exist`);
    }
    return this._balances[id];
  }

  public supportsCurrency(id: CurrencyId): boolean {
    return id in this._balances;
  }

  private validate(currency: Currency<CurrencyId>, action: string): void {
    if (!this.supportsCurrency(currency.id)) {
      throw new InvalidCurrencyError(`Cannot ${action} '${currency.amount}' of '${currency.id}'. Unknown currency`);
    }
    if (currency.amount < 0) {
      throw new NegativeAmountError(
        `Cannot ${action} '${currency.amount}' of '${currency.id}'. Amount must be positive`,
      );
    }
  }

  /**
   * Emitted whenever a currency is gained
   */
  public get onCurrencyGain(): ISimpleEvent<Currency<CurrencyId>> {
    return this._onCurrencyGain.asEvent();
  }
}
