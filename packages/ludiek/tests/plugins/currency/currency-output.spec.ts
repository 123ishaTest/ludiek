import { beforeEach, describe, expect, it } from 'vitest';
import { CurrencyPlugin } from '@ludiek/plugins/currency/CurrencyPlugin';
import { CurrencyOutput } from '@ludiek/plugins/currency/CurrencyOutput';

const currency = new CurrencyPlugin();

beforeEach(() => {
  currency.loadContent([{ id: '/currency/money' }, { id: '/currency/gems' }]);
});

describe('Currency Output', () => {
  it('checks if we can gain currency', () => {
    // Arrange
    const output = new CurrencyOutput(currency);

    // Act
    const canGain = output.canGain();

    // Assert
    expect(canGain).toBe(true);
  });

  it('gains currency', () => {
    // Arrange
    const output = new CurrencyOutput(currency);

    // Act
    output.gain({
      type: '/output/currency',
      id: '/currency/money',
      amount: 6,
    });
    const money = currency.getBalance('/currency/money');

    // Assert
    expect(money).toBe(6);
  });
});
