import { expect, it } from 'vitest';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { TrueEvaluator } from '@ludiek/stdlib/condition/TrueCondition';
import { ConditionNotFoundError } from '@ludiek/engine/condition/ConditionError';

it('is type-safe', () => {
  // Arrange
  const engine = new LudiekEngine({
    evaluators: [new TrueEvaluator()],
  });

  // Valid
  engine.evaluate({ type: '/condition/true' });

  expect(() => {
    // @ts-expect-error unknown type
    engine.evaluate({ type: 'wrong' });
  }).toThrow(ConditionNotFoundError);
});

it('it collapses to never when no conditions exist', () => {
  // Arrange
  const engine = new LudiekEngine({});

  expect(() => {
    // @ts-expect-error unknown type
    engine.evaluate({ type: 'wrong' });
  }).toThrow(ConditionNotFoundError);
});
