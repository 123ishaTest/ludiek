import { expect, it } from 'vitest';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { TrueEvaluator } from '@ludiek/stdlib/condition/TrueCondition';
import { FalseEvaluator, OrEvaluator } from '@ludiek/stdlib';

const engine = new LudiekEngine({
  evaluators: [new TrueEvaluator(), new FalseEvaluator(), new OrEvaluator()],
});

it.each([
  ['/condition/false', '/condition/false', false],
  ['/condition/false', '/condition/true', true],
  ['/condition/true', '/condition/false', true],
  ['/condition/true', '/condition/true', true],
])('Evaluates %s OR %s = $d', (first: string, second: string, expected: boolean) => {
  // Act
  const result = engine.evaluate({
    type: '/condition/or',
    first: { type: first },
    second: { type: second },
  });

  // Assert
  expect(result).toBe(expected);
});
