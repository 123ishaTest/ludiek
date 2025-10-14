import { beforeEach, expect, it } from 'vitest';
import { BuffPlugin } from '@ludiek/plugins/buff/BuffPlugin';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { DummyModifier } from '@tests/shared/DummyBonus';

const buff = new BuffPlugin();
new LudiekEngine({
  modifiers: [new DummyModifier()],
  plugins: [buff],
});

const buffs = [
  { id: '/buff/example', effects: [{ type: '/bonus/dummy', amount: +0.1 }] },
  { id: '/buff/other', effects: [{ type: '/bonus/dummy', amount: +0.2 }] },
];
beforeEach(() => {
  buff.loadContent(buffs);
});

it('initializes at false', () => {
  // Act
  const isExampleActive = buff.isBuffActive('/buff/example');
  const isOtherActive = buff.isBuffActive('/buff/other');

  // Assert
  expect(isExampleActive).toBe(false);
  expect(isOtherActive).toBe(false);
});

it('activates buffs', () => {
  // Act
  buff.increaseBuff('/buff/example', 10);
  const exampleDuration = buff.getDuration('/buff/example');
  const isExampleActive = buff.isBuffActive('/buff/example');

  // Assert
  expect(exampleDuration).toBe(10);
  expect(isExampleActive).toBe(true);
});

it('extends buffs', () => {
  buff.increaseBuff('/buff/example', 10);

  // Act
  buff.increaseBuff('/buff/example', 10);
  const exampleDuration = buff.getDuration('/buff/example');

  // Assert
  expect(exampleDuration).toBe(20);
});

it('decreases durations', () => {
  buff.increaseBuff('/buff/example', 10);

  // Act
  buff.decreaseBuff('/buff/example', 4);
  const exampleDuration = buff.getDuration('/buff/example');

  // Assert
  expect(exampleDuration).toBe(6);
});

it('expires buffs when duration hits 0', () => {
  buff.increaseBuff('/buff/example', 10);

  // Act
  buff.decreaseBuff('/buff/example', 10);
  const isActive = buff.isBuffActive('/buff/example');

  // Assert
  expect(isActive).toBe(false);
});

it('does not let durations go under 0', () => {
  buff.increaseBuff('/buff/example', 10);

  // Act
  buff.decreaseBuff('/buff/example', 100);
  const exampleDuration = buff.getDuration('/buff/example');
  const isActive = buff.isBuffActive('/buff/example');

  // Assert
  expect(exampleDuration).toBe(0);
  expect(isActive).toBe(false);
});

it('sets buffs to a higher value', () => {
  // Act
  buff.setBuff('/buff/example', 100);
  const duration = buff.getDuration('/buff/example');

  // Assert
  expect(duration).toBe(100);
});

it('sets buffs to a lower value', () => {
  // Arrange
  buff.setBuff('/buff/example', 50);

  // Act
  buff.setBuff('/buff/example', 10);
  const duration = buff.getDuration('/buff/example');

  // Assert
  expect(duration).toBe(10);
});

it('provides a single bonus', () => {
  // Arrange
  buff.setBuff('/buff/other', 1);

  // Act
  const bonuses = buff.getBonuses();

  // Assert
  expect(bonuses).toEqual([
    {
      type: '/bonus/dummy',
      amount: +0.2,
      source: '/buff/other',
    },
  ]);
});

it('provides multiple bonuses', () => {
  // Arrange
  buff.setBuff('/buff/example', 1);
  buff.setBuff('/buff/other', 1);

  // Act
  const bonuses = buff.getBonuses();

  // Assert
  expect(bonuses).toEqual([
    {
      type: '/bonus/dummy',
      amount: +0.1,
      source: '/buff/example',
    },
    {
      type: '/bonus/dummy',
      amount: +0.2,
      source: '/buff/other',
    },
  ]);
});

it('stops providing bonuses when buffs go inactive', () => {
  // Arrange
  buff.setBuff('/buff/example', 4);
  expect(buff.getBonuses()).not.toHaveLength(0);

  // Act
  buff.decreaseBuff('/buff/example', 4);
  const bonuses = buff.getBonuses();

  // Assert
  expect(bonuses).toHaveLength(0);
});
