import { LudiekSaveData } from '@ludiek/engine/peristence/LudiekSaveData';
import { LudiekLocalStorage } from '@ludiek/engine/peristence/LudiekLocalStorage';
import { LudiekJsonSaveEncoder } from '@ludiek/engine/peristence/LudiekJsonSaveEncoder';
import { expect, it } from 'vitest';

const encoder = new LudiekJsonSaveEncoder();

it('Writes to local storage', () => {
  // Arrange
  const saveKey = 'saveKey';
  const data: LudiekSaveData = {
    engine: {
      x: {
        y: 4,
      },
    },
    features: {
      z: {
        w: 2,
      },
    },
  };

  // Act
  LudiekLocalStorage.store(saveKey, data, encoder);
  const loaded = LudiekLocalStorage.get(saveKey, encoder);

  // Assert
  expect(data).toStrictEqual(loaded);
});

it('Can delete items', () => {
  // Arrange
  const saveKey = 'saveKey';
  const data: LudiekSaveData = {
    engine: {
      x: {
        y: 4,
      },
    },
    features: {},
  };

  // Act
  LudiekLocalStorage.store(saveKey, data, encoder);
  let loaded = LudiekLocalStorage.get(saveKey, encoder);
  expect(loaded).not.toBe(null);

  LudiekLocalStorage.delete(saveKey);
  loaded = LudiekLocalStorage.get(saveKey, encoder);

  // Assert
  expect(loaded).toStrictEqual({
    engine: {},
    features: {},
  });
});
