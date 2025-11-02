import { CurrencyDefinition } from '@ludiek/plugins/currency/CurrencyDefinition';

/**
 * A currency has been gained
 */
export interface CurrencyGained extends CurrencyDefinition {
  /**
   * The amount of currency gained
   */
  amount: number;

  /**
   * The resulting balance
   */
  balance: number;
}

/**
 * A currency has been gained or lost
 */
export interface CurrencyChanged extends CurrencyDefinition {
  /**
   * The amount of currency gained
   */
  amount: number;

  /**
   * The resulting balance
   */
  balance: number;
}
