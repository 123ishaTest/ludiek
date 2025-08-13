import { describe, expect, it } from 'vitest';
import { CurrencyPlugin } from '@ludiek/plugins/currency/CurrencyPlugin';
import { HasCurrencyCondition } from '@ludiek/plugins/currency/evaluators/HasCurrencyCondition';
import { InvalidCurrencyError } from '@ludiek/plugins/currency/CurrencyErrors';

describe('Has Currency Condition', () => {
  it('evaluates to true on currencies we have', () => {
    // Arrange
    const currency = new CurrencyPlugin([{ id: 'money' }, { id: 'gems' }]);
    currency.gainCurrency({ id: 'money', amount: 3 });
    const condition = new HasCurrencyCondition(currency);

    // Act
    const has3Money = condition.evaluate({
      type: 'has-currency',
      id: 'money',
      amount: 3,
    });
    const has4Money = condition.evaluate({
      type: 'has-currency',
      id: 'money',
      amount: 4,
    });

    // Assert
    expect(has3Money).toBe(true);
    expect(has4Money).toBe(false);
  });

  it('retains full type-safety', () => {
    // Arrange
    const currency = new CurrencyPlugin([{ id: 'money' }, { id: 'gems' }]);
    const condition = new HasCurrencyCondition(currency);

    expect(() => {
      condition.evaluate({
        // @ts-expect-error 'wrong' is not a CurrencyId
        type: 'wrong',
        // @ts-expect-error Type string is not assignable to type number
        amount: 'number',
      });
    }).toThrow(InvalidCurrencyError);

    condition.evaluate({
      type: 'has-currency',
      id: 'gems',
      amount: 0,
      // @ts-expect-error Object literal may only specify known properties
      unknown: 'unknown',
    });
  });
});
