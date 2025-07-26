import { CurrencyPlugin } from '@ludiek/plugins/currency/CurrencyPlugin';
import { InvalidCurrencyError, NegativeAmountError } from '@ludiek/plugins/currency/CurrencyErrors';
import { beforeEach, describe, expect, it } from 'vitest';

let currency = new CurrencyPlugin([{ id: 'money' }, { id: 'gems' }]);
beforeEach(() => {
  currency = new CurrencyPlugin([{ id: 'money' }, { id: 'gems' }]);
});

describe('Bad flow', () => {
  it('throws an error when accessing an invalid currency ', () => {
    // @ts-expect-error 'unknown' is not a valid CurrencyId
    expect(() => currency.getBalance('unknown')).toThrow(InvalidCurrencyError);
  });

  it('prevents gaining unknown currencies', () => {
    // @ts-expect-error 'unknown' is not a valid currencyId
    expect(() => currency.gainCurrency({ id: 'unknown', amount: 4 })).toThrow(InvalidCurrencyError);
  });

  it('prevents gaining negative currencies', () => {
    expect(() => currency.gainCurrency({ id: 'money', amount: -1 })).toThrow(NegativeAmountError);
  });

  it('prevents gaining NaN of a currency', () => {
    // Act
    currency.gainCurrency({ id: 'money', amount: NaN });
  });
});
