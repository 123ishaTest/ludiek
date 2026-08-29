import { beforeEach, expect, it } from 'vitest';
import { BuffPlugin } from '@ludiek/plugins/buff/BuffPlugin';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { IncreaseBuffDurationMutator } from '@ludiek/plugins/buff/contributions/IncreaseBuffDurationMutation';

const buff = new BuffPlugin();
const mutator = new IncreaseBuffDurationMutator();

new LudiekEngine({
  plugins: [buff],
  mutators: [mutator],
});

const buffs = [
  { id: '/buff/example', effects: [{ type: '/bonus/dummy', amount: +0.1 }] },
  { id: '/buff/other', effects: [{ type: '/bonus/dummy', amount: +0.2 }] },
];

beforeEach(() => {
  buff.loadContent(buffs);
});

it('checks if we can extend the buff', () => {
  // Act
  const canApply = mutator.canApply();

  // Assert
  expect(canApply).toBe(true);
});

it('applies buff duration', () => {
  // Arrange
  buff.increaseBuff('/buff/example', 4);
  // Act
  mutator.apply({
    type: '/mutation/increase-buff-duration',
    buff: '/buff/example',
    amount: 2,
  });
  const duration = buff.getDuration('/buff/example');

  // Assert
  expect(duration).toBe(6);
});
