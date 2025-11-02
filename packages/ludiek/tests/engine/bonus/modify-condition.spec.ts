import { beforeEach, expect, it, vi } from 'vitest';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { DummyModifier } from '@tests/shared/DummyBonus';
import { ModifiedEvaluator } from '@tests/shared/ModifiedCondition';

const evaluator = new ModifiedEvaluator();
const engine = new LudiekEngine({
  evaluators: [evaluator],
  modifiers: [new DummyModifier()],
});

beforeEach(() => {
  vi.resetAllMocks();
});

it('can modify a condition', () => {
  // Arrange
  const bonusMock = vi.spyOn(engine, 'getBonus').mockReturnValue(2);

  // Act
  const modifiedCondition = engine.modifyCondition({
    type: '/condition/modified',
    value: 4,
  });

  // Assert
  expect(bonusMock).toHaveBeenCalledExactlyOnceWith({
    type: '/bonus/dummy',
  });

  expect(modifiedCondition).toEqual({
    type: '/condition/modified',
    value: 2,
  });
});

it('modifies evaluated condition', () => {
  // Arrange
  const beforeBonus = engine.evaluate({
    type: '/condition/modified',
    value: 1,
  });
  // TODO(@Isha): Research why this is needed, it counts the evaluation before the function is spied on
  vi.resetAllMocks();

  // Apply the bonus
  const evaluateMock = vi.spyOn(evaluator, 'evaluate');
  const bonusMock = vi.spyOn(engine, 'getBonus').mockReturnValue(2);
  const afterBonus = engine.evaluate({
    type: '/condition/modified',
    value: 1,
  });

  // Assert
  expect(beforeBonus).toBe(false);
  expect(afterBonus).toBe(true);

  expect(bonusMock).toHaveBeenCalledExactlyOnceWith({
    type: '/bonus/dummy',
  });

  expect(evaluateMock).toHaveBeenCalledExactlyOnceWith({
    type: '/condition/modified',
    value: 0.5,
  });
});
