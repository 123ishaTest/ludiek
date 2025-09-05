import { beforeEach, describe, expect, it } from 'vitest';
import { CurrencyPlugin } from '@ludiek/plugins/currency/CurrencyPlugin';
import { CurrencyOutput } from '@ludiek/plugins/currency/CurrencyOutput';

const currency = new CurrencyPlugin();

beforeEach(() => {
  currency.loadContent([{ id: 'money' }, { id: 'gems' }]);
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
      type: 'currency',
      id: 'money',
      amount: 6,
    });
    const money = currency.getBalance('money');

    // Assert
    expect(money).toBe(6);
  });
});
