import { beforeEach, expect, it } from 'vitest';
import { BuffPlugin } from '@ludiek/plugins/buff/BuffPlugin';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { SetBuffDurationProducer } from '@ludiek/plugins/buff/SetBuffDurationOutput';

const buff = new BuffPlugin();
const producer = new SetBuffDurationProducer();

new LudiekEngine({
  plugins: [buff],
  producers: [producer],
});

const buffs = [
  { id: '/buff/example', effects: [{ type: '/bonus/dummy', amount: +0.1 }] },
  { id: '/buff/other', effects: [{ type: '/bonus/dummy', amount: +0.2 }] },
];

beforeEach(() => {
  buff.loadContent(buffs);
});

it('checks if we can set the buff', () => {
  // Act
  const canProduce = producer.canProduce();

  // Assert
  expect(canProduce).toBe(true);
});

it('sets buff duration', () => {
  // Arrange
  buff.increaseBuff('/buff/example', 4);

  // Act
  producer.produce({
    type: '/output/set-buff-duration',
    buff: '/buff/example',
    amount: 2,
  });
  const duration = buff.getDuration('/buff/example');

  // Assert
  expect(duration).toBe(2);
});
