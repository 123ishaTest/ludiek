import { expect, it } from 'vitest';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { AlwaysTrueCondition } from '@ludiek/engine/conditions/AlwaysTrueCondition';
import { ConditionNotFoundError } from '@ludiek/engine/LudiekError';
import { KitchenSinkPlugin } from '@tests/shared/KitchenSinkPlugin';
import { EmptyPlugin } from '@tests/shared/EmptyPlugin';

it('is type-safe when plugins and conditions exists', () => {
  // Arrange
  const engine = new LudiekEngine({
    plugins: [new KitchenSinkPlugin()],
    conditions: [new AlwaysTrueCondition()],
  });

  engine.evaluate({ type: '/condition/has-variable', amount: 4 });
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
    plugins: [new KitchenSinkPlugin()],
  });

  engine.evaluate({ type: '/condition/has-variable', amount: 4 });

  expect(() => {
    // @ts-expect-error unknown type
    engine.evaluate({ type: 'wrong' });
  }).toThrow(ConditionNotFoundError);
});

it('is type-safe when plugins without conditions exists', () => {
  // Arrange
  const engine = new LudiekEngine({
    plugins: [new EmptyPlugin()],
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
