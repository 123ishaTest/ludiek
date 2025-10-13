import { beforeEach, expect, it } from 'vitest';
import { KeyItemPlugin } from '@ludiek/plugins/keyItem/KeyItemPlugin';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { DummyModifier } from '@tests/shared/DummyBonus';

const keyItem = new KeyItemPlugin();
const modifier = new DummyModifier();
new LudiekEngine({
  plugins: [keyItem],
  modifiers: [modifier],
});

beforeEach(() => {
  keyItem.loadContent([
    { id: '/key-item/example' },
    { id: '/key-item/with-bonus', rewards: [{ type: '/bonus/dummy', amount: +0.2 }] },
  ]);
});

it('initializes at false', () => {
  // Act
  const hasItem = keyItem.hasKeyItem('/key-item/example');

  // Assert
  expect(hasItem).toBe(false);
});

it('can gain KeyItems', () => {
  // Arrange
  keyItem.gainKeyItem('/key-item/example');

  // Act
  const hasItem = keyItem.hasKeyItem('/key-item/example');

  // Assert
  expect(hasItem).toBe(true);
});

it('emits an event when gaining KeyItems', () => {
  // Arrange
  expect.assertions(1);

  const unsub = keyItem.onKeyItemGain.sub((item) => {
    expect(item.id).toBe('/key-item/example');
  });

  // Act
  keyItem.gainKeyItem('/key-item/example');

  // After
  unsub();
});

it('cannot gain KeyItems twice', () => {
  expect.assertions(1);

  // Arrange
  const unsub = keyItem.onKeyItemGain.sub((item) => {
    expect(item.id).toBe('/key-item/example');
  });

  // Act
  keyItem.gainKeyItem('/key-item/example');
  keyItem.gainKeyItem('/key-item/example');

  // After
  unsub();
});

it('cannot gain manual KeyItems twice', () => {
  expect.assertions(1);

  // Arrange
  const unsub = keyItem.onKeyItemGain.sub((item) => {
    expect(item.id).toBe('/key-item/example');
  });

  // Act
  keyItem.gainKeyItem('/key-item/example');
  keyItem.gainKeyItem('/key-item/example');

  // After
  unsub();
});

it('returns a list of gained KeyItems', () => {
  // Arrange
  keyItem.gainKeyItem('/key-item/example');

  // Act
  const gainedKeyItems = keyItem.gainedKeyItems;
  const allKeyItems = keyItem.keyItemList;

  // Assert
  expect(gainedKeyItems).toHaveLength(1);
  expect(gainedKeyItems[0].id).toBe('/key-item/example');
  expect(allKeyItems).toHaveLength(2);
});

it('contributes bonuses from gained KeyItems', () => {
  // Arrange
  keyItem.gainKeyItem('/key-item/example');
  keyItem.gainKeyItem('/key-item/with-bonus');

  // Act
  const contributions = keyItem.getBonuses();

  // Assert
  expect(contributions).toHaveLength(1);
  expect(contributions).toEqual([{ type: '/bonus/dummy', amount: +0.2, source: '/key-item/with-bonus' }]);
});

it('gives no bonuses when no KeyItems are gained', () => {
  // Act
  const contributions = keyItem.getBonuses();

  // Assert
  expect(contributions).toHaveLength(0);
});
