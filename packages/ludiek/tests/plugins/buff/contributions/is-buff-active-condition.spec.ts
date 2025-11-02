import { beforeEach, expect, it } from 'vitest';
import { BuffPlugin } from '@ludiek/plugins/buff/BuffPlugin';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { IsBuffActiveEvaluator } from '@ludiek/plugins/buff/contributions/IsBuffActiveCondition';

const buff = new BuffPlugin();
const evaluator = new IsBuffActiveEvaluator();

new LudiekEngine({
  plugins: [buff],
  evaluators: [evaluator],
});

beforeEach(() => {
  const buffs = [{ id: '/buff/example', effects: [{ type: '/bonus/example', amount: +0.2 }] }];
  buff.loadContent(buffs);
});

it('evaluates to false on buffs that are inactive', () => {
  // Act
  const isActive = evaluator.evaluate({
    type: '/condition/is-buff-active',
    buff: '/buff/example',
  });

  // Assert
  expect(isActive).toBe(false);
});

it('evaluates to true on buffs that are active', () => {
  // Arrange
  buff.increaseBuff('/buff/example', 10);

  // Act
  const isActive = evaluator.evaluate({
    type: '/condition/is-buff-active',
    buff: '/buff/example',
  });

  // Assert
  expect(isActive).toBe(true);
});
