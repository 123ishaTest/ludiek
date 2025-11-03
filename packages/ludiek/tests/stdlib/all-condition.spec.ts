import { expect, it } from 'vitest';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { TrueEvaluator } from '@ludiek/stdlib/condition/TrueCondition';
import { AllEvaluator, FalseEvaluator } from '@ludiek/stdlib';

const engine = new LudiekEngine({
  evaluators: [new TrueEvaluator(), new FalseEvaluator(), new AllEvaluator()],
});

it.each([
  ['/condition/false', '/condition/false', '/condition/false', false],
  ['/condition/true', '/condition/true', '/condition/false', false],
  ['/condition/false', '/condition/true', '/condition/true', false],
  ['/condition/false', '/condition/true', '/condition/true', false],
  ['/condition/true', '/condition/true', '/condition/true', true],
])('Evaluates ALL(%s, %s, %s) = $d', (a: string, b: string, c: string, expected: boolean) => {
  // Act
  const result = engine.evaluate({
    type: '/condition/all',
    conditions: [{ type: a }, { type: b }, { type: c }],
  });

  // Assert
  expect(result).toBe(expected);
});
