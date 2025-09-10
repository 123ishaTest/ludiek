import { CurrencyPlugin } from '@ludiek/plugins/currency/CurrencyPlugin';
import { beforeEach, describe, expect, it } from 'vitest';

const currency = new CurrencyPlugin();
beforeEach(() => {
  currency.loadContent([{ id: '/currency/money' }, { id: '/currency/gems' }]);
});

describe('Happy flow', () => {
  it('instantiates with 0 as the default amount', () => {
    const startingMoney = currency.getBalance('/currency/money');
    expect(startingMoney).toBe(0);
  });

  it('awards currency', () => {
    // Arrange
    currency.gainCurrency({ id: '/currency/money', amount: 3 });
    currency.gainCurrency({ id: '/currency/money', amount: 5 });

    // Act
    const money = currency.getBalance('/currency/money');

    // Assert
    expect(money).toBe(8);
  });

  it('knows which currencies are supported', () => {
    expect(currency.supportsCurrency('/currency/money')).toBe(true);
    expect(currency.supportsCurrency('/currency/gems')).toBe(true);
    expect(currency.supportsCurrency('unknown')).toBe(false);
  });

  it('checks whether you have currencies', () => {
    // Arrange
    currency.gainCurrency({ id: '/currency/money', amount: 10 });

    // Act
    const has10 = currency.hasCurrency({ id: '/currency/money', amount: 10 });
    const has11 = currency.hasCurrency({ id: '/currency/money', amount: 11 });

    // Assert
    expect(has10).toBe(true);
    expect(has11).toBe(false);
  });

  it('loses currency correctly', () => {
    // Arrange
    currency.gainCurrency({ id: '/currency/money', amount: 10 });

    // Act
    currency.loseCurrency({ id: '/currency/money', amount: 4 });
    const money = currency.getBalance('/currency/money');

    // Assert
    expect(money).toBe(6);
  });

  it('handles payments if you have enough currency', () => {
    // Arrange
    currency.gainCurrency({ id: '/currency/money', amount: 10 });

    // Act
    const paid = currency.payCurrency({ id: '/currency/money', amount: 4 });

    // Assert
    expect(currency.getBalance('/currency/money')).toBe(6);
    expect(paid).toBe(true);
  });

  it("handles payments if you don't have enough currency", () => {
    // Arrange
    currency.gainCurrency({ id: '/currency/money', amount: 10 });

    // Act
    const paid = currency.payCurrency({ id: '/currency/money', amount: 15 });

    // Assert
    expect(currency.getBalance('/currency/money')).toBe(10);
    expect(paid).toBe(false);
  });

  it('sends events on currency gain', () => {
    // Arrange
    expect.assertions(2);

    currency.onCurrencyGain.subscribe((currency) => {
      expect(currency.amount).toBe(10);
      expect(currency.id).toBe('/currency/money');
    });

    // Act
    currency.gainCurrency({ id: '/currency/money', amount: 10 });
  });
});
