import { beforeEach, describe, expect, it } from 'vitest';
import { CurrencyPlugin } from '@ludiek/plugins/currency/CurrencyPlugin';

const currency = new CurrencyPlugin();
beforeEach(() => {
  currency.loadContent([{ id: 'money' }, { id: 'gems' }]);
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

  it('loses multiple of the same currencies', () => {
    // Act
    currency.loseCurrencies([
      { id: 'money', amount: 1 },
      { id: 'money', amount: 2 },
    ]);
    const actualMoney = currency.getBalance('money');

    // Assert
    expect(actualMoney).toBe(-3);
  });

  it('loses multiple different currencies', () => {
    // Act
    currency.loseCurrencies([
      { id: 'money', amount: 1 },
      { id: 'gems', amount: 2 },
    ]);
    const actualMoney = currency.getBalance('money');
    const actualGems = currency.getBalance('gems');

    // Assert
    expect(actualMoney).toBe(-1);
    expect(actualGems).toBe(-2);
  });

  it('pays multiple different currencies', () => {
    // Arrange
    currency.gainCurrencies([
      { id: 'money', amount: 1 },
      { id: 'gems', amount: 2 },
    ]);

    // Act
    const isPaid = currency.payCurrencies([
      { id: 'money', amount: 1 },
      { id: 'gems', amount: 2 },
    ]);

    // Assert
    expect(isPaid).toBe(true);
  });

  it('does not pay multiple even if one is enough', () => {
    // Arrange
    currency.gainCurrencies([
      { id: 'money', amount: 1 },
      { id: 'gems', amount: 2 },
    ]);

    // Act
    const isPaid = currency.payCurrencies([
      { id: 'money', amount: 1 },
      { id: 'gems', amount: 3 },
    ]);

    // Assert
    expect(isPaid).toBe(false);
  });
});
