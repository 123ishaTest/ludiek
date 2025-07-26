import { beforeEach, describe, expect, it } from 'vitest';
import { CurrencyPlugin } from '@ludiek/plugins/currency/CurrencyPlugin';

let currency = new CurrencyPlugin([{ id: 'money' }, { id: 'gems' }]);
beforeEach(() => {
  currency = new CurrencyPlugin([{ id: 'money' }, { id: 'gems' }]);
});

describe('Multiple currencies', () => {
  it('gains multiple of the same currencies', () => {
    // Act
    currency.gainCurrencies([
      { id: 'money', amount: 1 },
      { id: 'money', amount: 2 },
    ]);
    const actualMoney = currency.getBalance('money');

    // Assert
    expect(actualMoney).toBe(3);
  });

  it('gains multiple different currencies', () => {
    // Act
    currency.gainCurrencies([
      { id: 'money', amount: 1 },
      { id: 'gems', amount: 2 },
    ]);
    const actualMoney = currency.getBalance('money');
    const actualGems = currency.getBalance('gems');

    // Assert
    expect(actualMoney).toBe(1);
    expect(actualGems).toBe(2);
  });
});
