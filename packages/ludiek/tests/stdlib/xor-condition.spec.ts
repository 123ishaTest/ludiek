import { expect, it } from 'vitest';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { TrueEvaluator } from '@ludiek/stdlib/condition/TrueCondition';
import { FalseEvaluator, XorEvaluator } from '@ludiek/stdlib';

const engine = new LudiekEngine({
  evaluators: [new TrueEvaluator(), new FalseEvaluator(), new XorEvaluator()],
});

it.each([
  ['/condition/false', '/condition/false', false],
  ['/condition/false', '/condition/true', true],
  ['/condition/true', '/condition/false', true],
  ['/condition/true', '/condition/true', false],
])('Evaluates %s XOR %s = $d', (first: string, second: string, expected: boolean) => {
  // Act
  const result = engine.evaluate({
    type: '/condition/xor',
    first: { type: first },
    second: { type: second },
  });

  // Assert
  expect(result).toBe(expected);
});
