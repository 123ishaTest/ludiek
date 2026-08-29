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

it('can modify mutation', () => {
  // Arrange
  const bonusMock = vi.spyOn(engine, 'getBonus').mockReturnValue(3);

  // Act
  const modifiedOutput = engine.modifyOutput({
    type: '/mutation/modified',
    amount: 5,
  });

  // Assert
  expect(bonusMock).toHaveBeenCalledExactlyOnceWith({
    type: '/bonus/dummy',
  });
  expect(modifiedOutput).toEqual({
    type: '/mutation/modified',
    amount: 15,
  });
});

it('modifies produced mutation', () => {
  // Arrange
  const bonusMock = vi.spyOn(engine, 'getBonus').mockReturnValue(2);
  const produceMock = vi.spyOn(producer, 'produce');

  // Act
  engine.produce({
    type: '/mutation/modified',
    amount: 1,
  });

  // Assert
  expect(bonusMock).toHaveBeenCalledExactlyOnceWith({
    type: '/bonus/dummy',
  });
  expect(produceMock).toHaveBeenCalledExactlyOnceWith({
    type: '/mutation/modified',
    amount: 2,
  });
});

it('modifies canProduced mutation', () => {
  // Arrange
  const bonusMock = vi.spyOn(engine, 'getBonus').mockReturnValue(2);
  const canProduceMock = vi.spyOn(producer, 'canProduce');

  // Act
  engine.canProduce({
    type: '/mutation/modified',
    amount: 1,
  });

  // Assert
  expect(bonusMock).toHaveBeenCalledExactlyOnceWith({
    type: '/bonus/dummy',
  });
  expect(canProduceMock).toHaveBeenCalledExactlyOnceWith({
    type: '/mutation/modified',
    amount: 2,
  });
});
