import { beforeEach, describe, expect, it } from 'vitest';
import { CurrencyPlugin } from '@ludiek/plugins/currency/CurrencyPlugin';

const currency = new CurrencyPlugin();
beforeEach(() => {
  currency.loadContent([{ id: '/currency/money' }, { id: '/currency/gems' }]);
});

describe('Multiple currencies', () => {
  it('gains multiple of the same currencies', () => {
    // Act
    currency.gainCurrencies([
      { id: '/currency/money', amount: 1 },
      { id: '/currency/money', amount: 2 },
    ]);
    const actualMoney = currency.getBalance('/currency/money');

    // Assert
    expect(actualMoney).toBe(3);
  });

  it('gains multiple different currencies', () => {
    // Act
    currency.gainCurrencies([
      { id: '/currency/money', amount: 1 },
      { id: '/currency/gems', amount: 2 },
    ]);
    const actualMoney = currency.getBalance('/currency/money');
    const actualGems = currency.getBalance('/currency/gems');

    // Assert
    expect(actualMoney).toBe(1);
    expect(actualGems).toBe(2);
  });

  it('loses multiple of the same currencies', () => {
    // Act
    currency.loseCurrencies([
      { id: '/currency/money', amount: 1 },
      { id: '/currency/money', amount: 2 },
    ]);
    const actualMoney = currency.getBalance('/currency/money');

    // Assert
    expect(actualMoney).toBe(-3);
  });

  it('loses multiple different currencies', () => {
    // Act
    currency.loseCurrencies([
      { id: '/currency/money', amount: 1 },
      { id: '/currency/gems', amount: 2 },
    ]);
    const actualMoney = currency.getBalance('/currency/money');
    const actualGems = currency.getBalance('/currency/gems');

    // Assert
    expect(actualMoney).toBe(-1);
    expect(actualGems).toBe(-2);
  });

  it('pays multiple different currencies', () => {
    // Arrange
    currency.gainCurrencies([
      { id: '/currency/money', amount: 1 },
      { id: '/currency/gems', amount: 2 },
    ]);

    // Act
    const isPaid = currency.payCurrencies([
      { id: '/currency/money', amount: 1 },
      { id: '/currency/gems', amount: 2 },
    ]);

    // Assert
    expect(isPaid).toBe(true);
  });

  it('does not pay multiple even if one is enough', () => {
    // Arrange
    currency.gainCurrencies([
      { id: '/currency/money', amount: 1 },
      { id: '/currency/gems', amount: 2 },
    ]);

    // Act
    const isPaid = currency.payCurrencies([
      { id: '/currency/money', amount: 1 },
      { id: '/currency/gems', amount: 3 },
    ]);

    // Assert
    expect(isPaid).toBe(false);
  });

  it('does not pay duplicate currencies when combined amount exceeds balance', () => {
    // Arrange
    currency.gainCurrency({ id: '/currency/money', amount: 1 });

    // Act — paying 1+1=2 money with only 1 in balance should fail
    const isPaid = currency.payCurrencies([
      { id: '/currency/money', amount: 1 },
      { id: '/currency/money', amount: 1 },
    ]);

    // Assert
    expect(isPaid).toBe(false);
    expect(currency.getBalance('/currency/money')).toBe(1);
  });

  it('pays duplicate currencies when combined amount is within balance', () => {
    // Arrange
    currency.gainCurrency({ id: '/currency/money', amount: 3 });

    // Act — paying 1+1=2 money with 3 in balance should succeed
    const isPaid = currency.payCurrencies([
      { id: '/currency/money', amount: 1 },
      { id: '/currency/money', amount: 1 },
    ]);

    // Assert
    expect(isPaid).toBe(true);
    expect(currency.getBalance('/currency/money')).toBe(1);
  });

  it('hasCurrencies returns false for duplicate currencies exceeding balance', () => {
    // Arrange
    currency.gainCurrency({ id: '/currency/money', amount: 1 });

    // Act
    const has = currency.hasCurrencies([
      { id: '/currency/money', amount: 1 },
      { id: '/currency/money', amount: 1 },
    ]);

    // Assert
    expect(has).toBe(false);
  });
});
