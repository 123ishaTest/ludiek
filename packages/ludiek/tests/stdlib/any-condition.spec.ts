import { expect, it } from 'vitest';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { TrueEvaluator } from '@ludiek/stdlib/condition/TrueCondition';
import { AnyEvaluator, FalseEvaluator } from '@ludiek/stdlib';

const engine = new LudiekEngine({
  evaluators: [new TrueEvaluator(), new FalseEvaluator(), new AnyEvaluator()],
});

it.each([
  ['/condition/false', '/condition/false', '/condition/false', false],
  ['/condition/true', '/condition/false', '/condition/false', true],
  ['/condition/false', '/condition/true', '/condition/false', true],
  ['/condition/false', '/condition/false', '/condition/true', true],
  ['/condition/true', '/condition/true', '/condition/true', true],
])('Evaluates ANY(%s, %s, %s) = $d', (a: string, b: string, c: string, expected: boolean) => {
  // Act
  const result = engine.evaluate({
    type: '/condition/any',
    conditions: [{ type: a }, { type: b }, { type: c }],
  });

  // Assert
  expect(result).toBe(expected);
});
