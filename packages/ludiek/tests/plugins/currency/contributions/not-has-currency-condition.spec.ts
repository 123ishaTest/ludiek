import { beforeEach, describe, expect, it } from 'vitest';
import { CurrencyPlugin } from '@ludiek/plugins/currency/CurrencyPlugin';
import { NotHasCurrencyEvaluator } from '@ludiek/plugins/currency/contributions/NotHasCurrencyCondition';
import { InvalidCurrencyError } from '@ludiek/plugins/currency/CurrencyErrors';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';

const currency = new CurrencyPlugin();
const evaluator = new NotHasCurrencyEvaluator();

new LudiekEngine({
  plugins: [currency],
  evaluators: [evaluator],
});

beforeEach(() => {
  currency.loadContent([{ id: '/currency/money' }, { id: '/currency/gems' }]);
});

describe('Not Has Currency Condition', () => {
  it("evaluates to true on currencies we don't have", () => {
    // Arrange
    currency.loadContent([{ id: '/currency/money' }, { id: '/currency/gems' }]);
    currency.gainCurrency({ id: '/currency/money', amount: 3 });

    // Act
    const has3Money = evaluator.evaluate({
      type: '/condition/not-has-currency',
      id: '/currency/money',
      amount: 3,
    });
    const has4Money = evaluator.evaluate({
      type: '/condition/not-has-currency',
      id: '/currency/money',
      amount: 4,
    });

    // Assert
    expect(has3Money).toBe(false);
    expect(has4Money).toBe(true);
  });

  it('retains full type-safety', () => {
    // Arrange

    expect(() => {
      evaluator.evaluate({
        // @ts-expect-error 'wrong' is not a valid type
        type: 'wrong',
        // @ts-expect-error Type string is not assignable to type number
        amount: 'number',
      });
    }).toThrow(InvalidCurrencyError);

    evaluator.evaluate({
      type: '/condition/not-has-currency',
      id: '/currency/gems',
      amount: 0,
      // @ts-expect-error Object literal may only specify known properties
      unknown: 'unknown',
    });
  });
});
