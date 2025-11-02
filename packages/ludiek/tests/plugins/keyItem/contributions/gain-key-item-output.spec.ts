import { beforeEach, describe, expect, it } from 'vitest';
import { KeyItemPlugin } from '@ludiek/plugins/keyItem/KeyItemPlugin';
import { GainKeyItemProducer } from '@ludiek/plugins/keyItem/contributions/GainKeyItemOutput';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';

const keyItem = new KeyItemPlugin();
const producer = new GainKeyItemProducer();

new LudiekEngine({
  plugins: [keyItem],
  producers: [producer],
});

beforeEach(() => {
  keyItem.loadContent([{ id: '/key-item/example' }]);
});

describe('KeyItem Output', () => {
  it('can always gain KeyItems', () => {
    // Act
    const canProduce = producer.canProduce();

    // Assert
    expect(canProduce).toBe(true);
  });

  it('gains KeyItems', () => {
    // Act
    producer.produce({
      type: '/output/gain-key-item',
      item: '/key-item/example',
      amount: 1,
    });
    const hasKeyItem = keyItem.hasKeyItem('/key-item/example');

    // Assert
    expect(hasKeyItem).toBe(true);
  });
});
