import { expect, it } from 'vitest';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { CurrencyPlugin } from '@ludiek/plugins/currency/CurrencyPlugin';
import { AlwaysTrueCondition } from '@ludiek/engine/evaluators/AlwaysTrueCondition';
import { CouponPlugin } from '@ludiek/plugins/coupon/CouponPlugin';
import { ConditionNotFoundError } from '@ludiek/engine/LudiekError';

it('is type-safe when plugins and conditions exists', () => {
  // Arrange
  const engine = new LudiekEngine({
    plugins: [new CurrencyPlugin(), new CouponPlugin()],
    conditions: [new AlwaysTrueCondition()],
  });
  engine.plugins.currency.loadContent([{ id: 'money' }]);

  // Valid
  engine.evaluate({ type: 'has-currency', amount: 4, id: 'money' });
  engine.evaluate({ type: 'always-true' });

  expect(() => {
    // @ts-expect-error unknown type
    engine.evaluate({ type: 'wrong' });
  }).toThrow(ConditionNotFoundError);

  expect(() => {
    // @ts-expect-error should have more arguments
    engine.evaluate({ type: 'has-currency' });
  }).toThrow(Error);
});

it('is type-safe when only plugins exists', () => {
  // Arrange
  const engine = new LudiekEngine({
    plugins: [new CurrencyPlugin()],
  });
  engine.plugins.currency.loadContent([{ id: 'money' }]);

  // Valid
  engine.evaluate({ type: 'has-currency', amount: 4, id: 'money' });
  expect(() => {
    // @ts-expect-error unknown type
    engine.evaluate({ type: 'wrong' });
  }).toThrow(ConditionNotFoundError);
});

it('is type-safe when plugins without conditions exists', () => {
  // Arrange
  const engine = new LudiekEngine({
    plugins: [new CouponPlugin()],
  });

  expect(() => {
    // @ts-expect-error unknown type
    engine.evaluate({ type: 'wrong' });
  }).toThrow(ConditionNotFoundError);
});

it('is type-safe when only conditions exists', () => {
  // Arrange
  const engine = new LudiekEngine({
    conditions: [new AlwaysTrueCondition()],
  });

  // Valid
  engine.evaluate({ type: 'always-true' });

  expect(() => {
    // @ts-expect-error unknown type
    engine.evaluate({ type: 'wrong' });
  }).toThrow(ConditionNotFoundError);
});

it('it collapses to never when neither exist', () => {
  // Arrange
  const engine = new LudiekEngine({});

  expect(() => {
    // @ts-expect-error unknown type
    engine.evaluate({ type: 'wrong' });
  }).toThrow(ConditionNotFoundError);
});
