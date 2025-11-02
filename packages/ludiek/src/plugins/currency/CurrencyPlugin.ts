import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';
import { InvalidCurrencyError, NegativeAmountError } from '@ludiek/plugins/currency/CurrencyErrors';
import { ISimpleEvent, SimpleEventDispatcher } from 'strongly-typed-events';
import { createCurrencyState, CurrencyPluginState } from '@ludiek/plugins/currency/CurrencyPluginState';
import { CurrencyDefinition } from '@ludiek/plugins/currency/CurrencyDefinition';
import { CurrencyChanged, CurrencyGained } from '@ludiek/plugins/currency/CurrencyEvents';

export type Currency = {
  id: string;
  amount: number;
};

export class CurrencyPlugin extends LudiekPlugin {
  readonly name = 'currency';

  protected _state: CurrencyPluginState;
  private readonly _currencies: Record<string, CurrencyDefinition> = {};

  constructor(state: CurrencyPluginState = createCurrencyState()) {
    super();
    this._state = state;
  }

  public loadContent(currencies: CurrencyDefinition[]): void {
    currencies.forEach((currency) => {
      this._currencies[currency.id] = currency;
      this._state.balances[currency.id] = 0;
    });
  }

  /**
   * Gain the specified amount of currency
   */
  public gainCurrency(currency: Currency): void {
    this.validate(currency, 'gain');
    this._state.balances[currency.id] += currency.amount;

    this._onCurrencyGain.dispatch({
      ...this._currencies[currency.id],
      amount: currency.amount,
      balance: this.getBalance(currency.id),
    });
    this._onCurrencyChanged.dispatch({
      ...this._currencies[currency.id],
      amount: currency.amount,
      balance: this.getBalance(currency.id),
    });
  }

  /**
   * Gain a list of currencies
   */
  public gainCurrencies(currencies: Currency[]): void {
    currencies.forEach((c) => this.validate(c, 'gain'));
    currencies.forEach((c) => {
      this.gainCurrency(c);
    });
  }

  /**
   * Lose the specified amount of currency
   */
  public loseCurrency(currency: Currency): void {
    this.validate(currency, 'lose');
    this._state.balances[currency.id] -= currency.amount;
    this._onCurrencyChanged.dispatch({
      ...this._currencies[currency.id],
      amount: -currency.amount,
      balance: this.getBalance(currency.id),
    });
  }

  /**
   * Lose a list of currencies
   */
  public loseCurrencies(currencies: Currency[]): void {
    currencies.forEach((c) => this.validate(c, 'lose'));
    currencies.forEach((c) => {
      this.loseCurrency(c);
    });
  }

  /**
   * Try to spend the specified amount of currency if you have it.
   * @return true if it was spent
   */
  public payCurrency(currency: Currency): boolean {
    this.validate(currency, 'pay');

    if (!this.hasCurrency(currency)) {
      return false;
    }
    this.loseCurrency(currency);
    return true;
  }

  /**
   * Try to spend the specified amount of currencies if you have it.
   * @return true if it was spent
   *
   * @todo(#61) Each currency is checked individually, meaning that if there are duplicate Ids it could lead to negative balance.
   */
  public payCurrencies(currencies: Currency[]): boolean {
    if (!this.hasCurrencies(currencies)) {
      return false;
    }
    this.loseCurrencies(currencies);
    return true;
  }

  /**
   * Whether we have the provided amount of currency
   */
  public hasCurrency(currency: Currency): boolean {
    this.validate(currency, 'has');
    return this.getBalance(currency.id) >= currency.amount;
  }

  /**
   * Whether we have a list of currencies
   *
   * @todo(#61) Each currency is checked individually, meaning that if there are duplicate Ids the answer could be misleading.
   */
  public hasCurrencies(currencies: Currency[]): boolean {
    return currencies.every((c) => {
      return this.hasCurrency(c);
    });
  }

  /**
   * Retrieve the balance for the specified currency
   */
  public getBalance(id: string): number {
    if (!this.supportsCurrency(id)) {
      throw new InvalidCurrencyError(`Cannot get '${id}' as it does not exist`);
    }
    return this._state.balances[id];
  }

  /**
   * Get the currency definition
   * @param id
   */
  public getCurrency(id: string): CurrencyDefinition {
    return this._currencies[id];
  }

  /**
   * Whether the plugin supports this type of currency
   * @param id
   */
  public supportsCurrency(id: string): boolean {
    return id in this._state.balances;
  }

  private validate(currency: Currency, action: string): void {
    if (!this.supportsCurrency(currency.id)) {
      throw new InvalidCurrencyError(`Cannot ${action} '${currency.amount}' of '${currency.id}'. Unknown currency`);
    }
    if (currency.amount < 0) {
      throw new NegativeAmountError(
        `Cannot ${action} '${currency.amount}' of '${currency.id}'. Amount must be positive`,
      );
    }
  }

  public get currencies(): CurrencyDefinition[] {
    return Object.values(this._currencies);
  }

  //
  protected _onCurrencyGain = new SimpleEventDispatcher<CurrencyGained>();
  protected _onCurrencyChanged = new SimpleEventDispatcher<CurrencyChanged>();

  /**
   * Emitted when a currency is gained
   */
  public get onCurrencyGain(): ISimpleEvent<CurrencyGained> {
    return this._onCurrencyGain.asEvent();
  }

  /**
   * Emitted when a currency changes
   */
  public get onCurrencyChange(): ISimpleEvent<CurrencyChanged> {
    return this._onCurrencyChanged.asEvent();
  }
}
