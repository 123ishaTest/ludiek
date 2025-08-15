import { LudiekJsonSaveEncoder } from '@ludiek/engine/peristence/LudiekJsonSaveEncoder';
import { LudiekSaveData } from '@ludiek/engine/peristence/LudiekSaveData';
import { expect, it } from 'vitest';

it('is symmetrical', () => {
  // Arrange
  const data: LudiekSaveData = {
    engine: {
      some: { field: 0 },
    },
    features: {
      and: { data: [3] },
    },
  };
  const encoder = new LudiekJsonSaveEncoder();

  // Act
  const encoded = encoder.encode(data);
  const decoded = encoder.decode(encoded);

  // Assert
  expect(decoded).toStrictEqual(data);
});
