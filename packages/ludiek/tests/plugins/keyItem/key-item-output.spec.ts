import { beforeEach, describe, expect, it } from 'vitest';
import { KeyItemPlugin } from '@ludiek/plugins/keyItem/KeyItemPlugin';
import { KeyItemProducer } from '@ludiek/plugins/keyItem/KeyItemOutput';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';

const keyItem = new KeyItemPlugin();
const producer = new KeyItemProducer();

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
      type: '/output/key-item',
      item: '/key-item/example',
      amount: 1,
    });
    const hasKeyItem = keyItem.hasKeyItem('/key-item/example');

    // Assert
    expect(hasKeyItem).toBe(true);
  });
});
