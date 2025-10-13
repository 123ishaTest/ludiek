import { beforeEach, expect, it, vi } from 'vitest';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { DummyModifier } from '@tests/shared/DummyBonus';
import { ModifiedConsumer } from '@tests/shared/ModifiedInput';

const consumer = new ModifiedConsumer();
const engine = new LudiekEngine({
  consumers: [consumer],
  modifiers: [new DummyModifier()],
});

beforeEach(() => {
  vi.resetAllMocks();
});

it('can modify input', () => {
  // Arrange
  const bonusMock = vi.spyOn(engine, 'getBonus').mockReturnValue(3);

  // Act
  const modifiedInput = engine.modifyInput({
    type: '/input/modified',
    amount: 5,
  });

  // Assert
  expect(bonusMock).toHaveBeenCalledExactlyOnceWith({
    type: '/bonus/dummy',
  });
  expect(modifiedInput).toEqual({
    type: '/input/modified',
    amount: 15,
  });
});

it('modifies consumed input', () => {
  // Arrange
  const bonusMock = vi.spyOn(engine, 'getBonus').mockReturnValue(2);
  const consumeMock = vi.spyOn(consumer, 'consume');

  // Act
  engine.consume({
    type: '/input/modified',
    amount: 1,
  });

  // Assert
  expect(bonusMock).toHaveBeenCalledExactlyOnceWith({
    type: '/bonus/dummy',
  });
  expect(consumeMock).toHaveBeenCalledExactlyOnceWith({
    type: '/input/modified',
    amount: 2,
  });
});

it('modifies canConsumed input', () => {
  // Arrange
  const bonusMock = vi.spyOn(engine, 'getBonus').mockReturnValue(2);
  const canConsumeMock = vi.spyOn(consumer, 'canConsume');

  // Act
  engine.canConsume({
    type: '/input/modified',
    amount: 1,
  });

  // Assert
  expect(bonusMock).toHaveBeenCalledExactlyOnceWith({
    type: '/bonus/dummy',
  });
  expect(canConsumeMock).toHaveBeenCalledExactlyOnceWith({
    type: '/input/modified',
    amount: 2,
  });
});
