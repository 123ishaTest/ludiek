import { expect, it } from 'vitest';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { TrueEvaluator } from '@ludiek/stdlib/condition/TrueCondition';
import { NotEvaluator } from '@ludiek/stdlib/condition/NotCondition';
import { FalseEvaluator } from '@ludiek/stdlib';

const engine = new LudiekEngine({
  evaluators: [new TrueEvaluator(), new FalseEvaluator(), new NotEvaluator()],
});

it('Inverts conditions', () => {
  // Act
  const isFalse = engine.evaluate({
    type: '/condition/not',
    condition: {
      type: '/condition/true',
    },
  });
  const isTrue = engine.evaluate({
    type: '/condition/not',
    condition: {
      type: '/condition/false',
    },
  });

  // Assert
  expect(isFalse).toBe(false);
  expect(isTrue).toBe(true);
});
