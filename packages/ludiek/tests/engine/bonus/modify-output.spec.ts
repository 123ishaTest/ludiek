import { beforeEach, expect, it, vi } from 'vitest';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { DummyModifier } from '@tests/shared/DummyBonus';
import { ModifiedProducer } from '@tests/shared/ModifiedOutput';

const producer = new ModifiedProducer();
const engine = new LudiekEngine({
  producers: [producer],
  modifiers: [new DummyModifier()],
});

beforeEach(() => {
  vi.resetAllMocks();
});

it('can modify output', () => {
  // Arrange
  const bonusMock = vi.spyOn(engine, 'getBonus').mockReturnValue(3);

  // Act
  const modifiedOutput = engine.modifyOutput({
    type: '/output/modified',
    amount: 5,
  });

  // Assert
  expect(bonusMock).toHaveBeenCalledExactlyOnceWith({
    type: '/bonus/dummy',
  });
  expect(modifiedOutput).toEqual({
    type: '/output/modified',
    amount: 15,
  });
});

it('modifies produced output', () => {
  // Arrange
  const bonusMock = vi.spyOn(engine, 'getBonus').mockReturnValue(2);
  const produceMock = vi.spyOn(producer, 'produce');

  // Act
  engine.produce({
    type: '/output/modified',
    amount: 1,
  });

  // Assert
  expect(bonusMock).toHaveBeenCalledExactlyOnceWith({
    type: '/bonus/dummy',
  });
  expect(produceMock).toHaveBeenCalledExactlyOnceWith({
    type: '/output/modified',
    amount: 2,
  });
});

it('modifies canProduced output', () => {
  // Arrange
  const bonusMock = vi.spyOn(engine, 'getBonus').mockReturnValue(2);
  const canProduceMock = vi.spyOn(producer, 'canProduce');

  // Act
  engine.canProduce({
    type: '/output/modified',
    amount: 1,
  });

  // Assert
  expect(bonusMock).toHaveBeenCalledExactlyOnceWith({
    type: '/bonus/dummy',
  });
  expect(canProduceMock).toHaveBeenCalledExactlyOnceWith({
    type: '/output/modified',
    amount: 2,
  });
});
