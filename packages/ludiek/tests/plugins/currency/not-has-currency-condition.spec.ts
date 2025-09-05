import { describe, expect, it } from 'vitest';
import { CurrencyPlugin } from '@ludiek/plugins/currency/CurrencyPlugin';
import { NotHasCurrencyCondition } from '@ludiek/plugins/currency/NotHasCurrencyCondition';
import { InvalidCurrencyError } from '@ludiek/plugins/currency/CurrencyErrors';

describe('Not Has Currency Condition', () => {
  it("evaluates to true on currencies we don't have", () => {
    // Arrange
    const currency = new CurrencyPlugin();
    currency.loadContent([{ id: 'money' }, { id: 'gems' }]);

    currency.gainCurrency({ id: 'money', amount: 3 });
    const condition = new NotHasCurrencyCondition(currency);

    // Act
    const has3Money = condition.evaluate({
      type: 'not-has-currency',
      id: 'money',
      amount: 3,
    });
    const has4Money = condition.evaluate({
      type: 'not-has-currency',
      id: 'money',
      amount: 4,
    });

    // Assert
    expect(has3Money).toBe(false);
    expect(has4Money).toBe(true);
  });

  it('retains full type-safety', () => {
    // Arrange
    const currency = new CurrencyPlugin();
    const condition = new NotHasCurrencyCondition(currency);
    currency.loadContent([{ id: 'money' }, { id: 'gems' }]);

    expect(() => {
      condition.evaluate({
        // @ts-expect-error 'wrong' is not a valid type
        type: 'wrong',
        // @ts-expect-error Type string is not assignable to type number
        amount: 'number',
      });
    }).toThrow(InvalidCurrencyError);

    condition.evaluate({
      type: 'not-has-currency',
      id: 'gems',
      amount: 0,
      // @ts-expect-error Object literal may only specify known properties
      unknown: 'unknown',
    });
  });
});
