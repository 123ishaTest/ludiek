import { type ISimpleEvent, SimpleEventDispatcher } from 'strongly-typed-events';
import type { CurrencyType } from '#ludiek/features/wallet/content/CurrencyType';
import { CurrencyState } from '#ludiek/features/wallet/state/CurrencyState';
import { Feature } from '#ludiek/features/Feature';
import type { Currency } from '#ludiek/features/wallet/Currency';
import { CurrencyRequirementDefinition } from '#ludiek/features/wallet/requirements/CurrencyRequirement';
import { GainCurrencyEffectDefinition } from '#ludiek/features/wallet/effects/GainCurrencyEffect';
import { type CurrencyDetail, CurrencyDetailSchema } from '#ludiek/features/wallet/content/CurrencyDetail';
import { InvalidCurrencyError } from '#ludiek/features/wallet/WalletErrors';
import type { EngineContribution } from '#ludiek/engine/EngineContribution';

export interface WalletState {
  currencies: Record<CurrencyType, CurrencyState>;
}

export class Wallet extends Feature {
  protected _state: WalletState = {
    currencies: {},
  };

  private _onCurrencyGain = new SimpleEventDispatcher<Currency>();

  /**
   * Emitted whenever a currency is gained
   */
  public get onCurrencyGain(): ISimpleEvent<Currency> {
    return this._onCurrencyGain.asEvent();
  }

  constructor() {
    super('wallet');
  }

  public initialize() {
    this.currencyDetails.forEach((currency) => {
      this._state.currencies[currency.id] = new CurrencyState(currency);
    });
  }

  public getEngineContribution(): EngineContribution {
    return {
      engine: {
        requirements: [new CurrencyRequirementDefinition()],
        effects: [new GainCurrencyEffectDefinition()],
      },
      content: [{ key: 'currency', schema: CurrencyDetailSchema }],
    };
  }

  /**
   * @returns Whether this wallet supports this CurrencyType
   */
  public supportsCurrencyType(type: CurrencyType): boolean {
    return this.supportedCurrencies.includes(type);
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
    return this._state.currencies[type].get();
  }

  /**
   * Gain the specified currency amount.
   */
  public gainCurrency(currency: Currency): void {
    if (!this.isCurrencyValid(currency)) {
      throw new InvalidCurrencyError(`Invalid currency ${JSON.stringify(currency)}`);
    }
    this._state.currencies[currency.type].add(this._engine.number(currency.amount));
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
    if (!this.supportsCurrencyType(currency.type)) {
      return false;
    }
    return this._state.currencies[currency.type].has(this._engine.number(currency.amount));
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
      throw new InvalidCurrencyError(`Invalid currency ${JSON.stringify(currency)}`);
    }
    this._state.currencies[currency.type].subtract(this._engine.number(currency.amount));
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
    if (!this.supportsCurrencyType(currency.type)) {
      return false;
    }
    const amount = this._engine.number(currency.amount);
    if (isNaN(amount)) {
      return false;
    }
    return amount > 0;
  }

  public get currencyDetails(): CurrencyDetail[] {
    return this._content.currencies;
  }

  public get supportedCurrencies(): string[] {
    return this.currencyDetails.map((c) => c.id);
  }

  public getCurrency(type: CurrencyType): CurrencyState {
    return this._state.currencies[type];
  }
}
