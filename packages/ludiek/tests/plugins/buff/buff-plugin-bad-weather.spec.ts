import { beforeEach, expect, it } from 'vitest';

import { BuffPlugin } from '@ludiek/plugins/buff/BuffPlugin';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { UnknownBuffError } from '@ludiek/plugins/buff/BuffErrors';

const buff = new BuffPlugin();
new LudiekEngine({
  plugins: [buff],
});

beforeEach(() => {
  const buffs = [{ id: '/buff/example', effects: [{ type: '/bonus/example', amount: +0.2 }] }];
  buff.loadContent(buffs);
});

it('throws an error when accessing an unknown buff ', () => {
  expect(() => buff.isBuffActive('wrong')).toThrow(UnknownBuffError);
});

it('ignores increasing buffs with a negative amount', () => {
  // Arrange
  buff.increaseBuff('/buff/example', 10);

  // Act
  buff.increaseBuff('/buff/example', -1);
  const duration = buff.getDuration('/buff/example');

  // Assert
  expect(duration).toBe(10);
});

it('ignores decreasing buffs with a negative amount', () => {
  // Arrange
  buff.increaseBuff('/buff/example', 10);

  // Act
  buff.decreaseBuff('/buff/example', -1);
  const duration = buff.getDuration('/buff/example');

  // Assert
  expect(duration).toBe(10);
});

it('ignores decreasing inactive', () => {
  // Arrange

  // Act
  buff.decreaseBuff('/buff/example', 5);
  const duration = buff.getDuration('/buff/example');

  // Assert
  expect(duration).toBe(0);
});
