import { beforeEach, describe, expect, it } from 'vitest';
import { CurrencyPlugin } from '@ludiek/plugins/currency/CurrencyPlugin';
import { CurrencyInput } from '@ludiek/plugins/currency/CurrencyInput';

const currency = new CurrencyPlugin();

beforeEach(() => {
  currency.loadContent([{ id: '/currency/money' }, { id: '/currency/gems' }]);
});

describe('Currency Input', () => {
  it('checks if we can lose currency', () => {
    // Arrange
    currency.gainCurrency({ id: '/currency/money', amount: 3 });
    const input = new CurrencyInput(currency);

    // Act
    const canLose3 = input.canLose({
      type: '/input/currency',
      id: '/currency/money',
      amount: 3,
    });
    const canLose4 = input.canLose({
      type: '/input/currency',
      id: '/currency/money',
      amount: 4,
    });

    // Assert
    expect(canLose3).toBe(true);
    expect(canLose4).toBe(false);
  });

  it('loses currency', () => {
    // Arrange
    currency.gainCurrency({ id: '/currency/money', amount: 3 });
    const input = new CurrencyInput(currency);

    // Act
    input.lose({
      type: '/input/currency',
      id: '/currency/money',
      amount: 2,
    });
    const money = currency.getBalance('/currency/money');

    // Assert
    expect(money).toBe(1);
  });
});
