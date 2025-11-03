import { expect, it } from 'vitest';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { TrueEvaluator } from '@ludiek/stdlib/condition/TrueCondition';
import { AndEvaluator, FalseEvaluator } from '@ludiek/stdlib';

const engine = new LudiekEngine({
  evaluators: [new TrueEvaluator(), new FalseEvaluator(), new AndEvaluator()],
});

it.each([
  ['/condition/false', '/condition/false', false],
  ['/condition/false', '/condition/true', false],
  ['/condition/true', '/condition/false', false],
  ['/condition/true', '/condition/true', true],
])('Evaluates %s AND %s = $d', (first: string, second: string, expected: boolean) => {
  // Act
  const result = engine.evaluate({
    type: '/condition/and',
    first: { type: first },
    second: { type: second },
  });

  // Assert
  expect(result).toBe(expected);
});
