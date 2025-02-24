import { Feature } from '$lib/ludiek/features/Feature';
import type { CurrencyType } from '$lib/ludiek/features/wallet/CurrencyType';
import type { Currency } from '$lib/ludiek/features/wallet/Currency';
import { type ISimpleEvent, SimpleEventDispatcher } from 'strongly-typed-events';
import type { WalletSaveData } from '$lib/ludiek/features/wallet/WalletSaveData';
import { InvalidCurrencyError } from '$lib/ludiek/features/wallet/Errors';

export class Wallet extends Feature {
  private _supportedCurrencies: CurrencyType[];
  private _currencies: Record<CurrencyType, number> = {};

  private _onCurrencyGain = new SimpleEventDispatcher<Currency>();

  /**
   * Emitted whenever a currency is gained
   */
  public get onCurrencyGain(): ISimpleEvent<Currency> {
    return this._onCurrencyGain.asEvent();
  }

  constructor(supportedCurrencies: CurrencyType[], saveKey: string = 'wallet') {
    super(saveKey);
    this._supportedCurrencies = supportedCurrencies;

    this._supportedCurrencies.forEach((type) => {
      this._currencies[type] = 0;
    });
  }

  /**
   * @returns Whether this wallet supports this CurrencyType
   */
  public supportsCurrencyType(type: CurrencyType): boolean {
    return this._supportedCurrencies.includes(type);
  }

  /**
   * Get the amount you have of the specified type of currency.
   * @param type The CurrencyType to check for
   * @returns The amount you have
   */
  public getAmount(type: CurrencyType): number {
    if (!this.supportsCurrencyType(type)) {
      return 0;
    }
    return this._currencies[type];
  }

  /**
   * Gain the specified currency amount.
   */
  public gainCurrency(currency: Currency): void {
    if (!this.isCurrencyValid(currency)) {
      throw new InvalidCurrencyError(`Invalid currency ${currency}`);
    }
    this._currencies[currency.type] += currency.amount;
    this._onCurrencyGain.dispatch(currency);
  }

  /**
   * Gain the currency amount from the specified currencies.
   */
  public gainCurrencies(currencies: Currency[]): void {
    currencies.forEach((currency) => this.gainCurrency(currency));
  }

  /**
   * @returns Whether you have the specified currency.
   */
  public hasCurrency(currency: Currency): boolean {
    return this._currencies[currency.type] >= currency.amount;
  }

  /**
   * @returns whether you have all specified currencies.
   */
  public hasCurrencies(currencies: Currency[]): boolean {
    return currencies.every((currency) => this.hasCurrency(currency));
  }

  /**
   * Subtract the currency amount from the specified currency.
   * @remarks This method does not care if amounts go negative.
   */
  public loseCurrency(currency: Currency): void {
    if (!this.isCurrencyValid(currency)) {
      throw new InvalidCurrencyError(`Invalid currency ${currency}`);
    }
    this._currencies[currency.type] -= currency.amount;
  }

  /**
   * Remove the currencies amounts from the specified currencies.
   * @remarks This method does not care if amounts go negative
   */
  public loseMultipleCurrencies(currencies: Currency[]): void {
    currencies.forEach((currency) => this.loseCurrency(currency));
  }

  /**
   * Subtract the currency if and only if you have enough.
   *
   * @returns true if the currency was paid, false if not
   */
  public pay(currency: Currency): boolean {
    if (!this.hasCurrency(currency)) {
      return false;
    }
    this.loseCurrency(currency);
    return true;
  }

  /**
   * Subtract the currencies if and only if you have enough of each.
   *
   * @returns true if the currencies were paid, false if not
   */
  public payMultiple(currencies: Currency[]): boolean {
    if (!this.hasCurrencies(currencies)) {
      return false;
    }
    this.loseMultipleCurrencies(currencies);
    return true;
  }

  /**
   * @returns Whether this currency is valid.
   */
  public isCurrencyValid(currency: Currency): boolean {
    if (isNaN(currency.amount)) {
      return false;
    }
    return currency.amount > 0;
  }

  load(data: Partial<WalletSaveData>): void {
    this._supportedCurrencies.forEach((type) => {
      this._currencies[type] = data?.currencies?.[type] ?? 0;
    });
  }

  save(): WalletSaveData {
    return {
      currencies: this._currencies,
    };
  }
}
