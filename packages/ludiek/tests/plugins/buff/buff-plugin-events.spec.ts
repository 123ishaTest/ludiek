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

it('emits an activated event when a buff is activated', () => {
  // Arrange
  expect.assertions(1);

  const onActivated = buff.onBuffActivated.sub((b) => {
    expect(b.id).toBe('/buff/example');
  });
  const onExtended = buff.onBuffExtended.sub(() => expect.fail('onBuffExtended should not have been emitted'));
  const onExpired = buff.onBuffExpired.sub(() => expect.fail('onBuffExpired should not have been emitted'));

  // Act
  buff.increaseBuff('/buff/example', 10);

  // After
  onActivated();
  onExtended();
  onExpired();
});

it('emits an extended event when a buff is extended', () => {
  // Arrange
  expect.assertions(1);
  buff.increaseBuff('/buff/example', 10);

  const onActivated = buff.onBuffActivated.sub(() => expect.fail('onBuffActivated should not have been emitted'));
  const onExtended = buff.onBuffExtended.sub((b) => {
    expect(b.id).toBe('/buff/example');
  });
  const onExpired = buff.onBuffExpired.sub(() => expect.fail('onBuffExpired should not have been emitted'));

  // Act
  buff.increaseBuff('/buff/example', 10);

  // After
  onActivated();
  onExtended();
  onExpired();
});

it('emits an expired event when a buff is expired', () => {
  // Arrange
  expect.assertions(1);

  buff.increaseBuff('/buff/example', 10);

  const onActivated = buff.onBuffActivated.sub(() => expect.fail('onBuffActivated should not have been emitted'));
  const onExtended = buff.onBuffExtended.sub(() => expect.fail('onBuffExtended should not have been emitted'));
  const onExpired = buff.onBuffExpired.sub((b) => {
    expect(b.id).toBe('/buff/example');
  });

  // Act
  buff.decreaseBuff('/buff/example', 10);

  // After
  onActivated();
  onExtended();
  onExpired();
});

it('does not emit an event when a buff decreases', () => {
  // Arrange
  expect.assertions(0);
  buff.increaseBuff('/buff/example', 10);

  const onActivated = buff.onBuffActivated.sub(() => expect.fail('onBuffActivated should not have been emitted'));
  const onExtended = buff.onBuffExtended.sub(() => expect.fail('onBuffExtended should not have been emitted'));
  const onExpired = buff.onBuffExtended.sub(() => expect.fail('onExpired should not have been emitted'));

  // Act
  buff.decreaseBuff('/buff/example');

  // After
  onActivated();
  onExtended();
  onExpired();
});

it('emits an activated event when a buff is set from 0', () => {
  // Arrange
  expect.assertions(1);

  const onActivated = buff.onBuffActivated.sub((b) => {
    expect(b.id).toBe('/buff/example');
  });
  const onExtended = buff.onBuffExtended.sub(() => expect.fail('onBuffExtended should not have been emitted'));
  const onExpired = buff.onBuffExpired.sub(() => expect.fail('onBuffExpired should not have been emitted'));

  // Act
  buff.setBuff('/buff/example', 10);

  // After
  onActivated();
  onExtended();
  onExpired();
});

it('emits an extended event when a buff is set higher', () => {
  // Arrange
  expect.assertions(1);
  buff.increaseBuff('/buff/example', 10);

  const onActivated = buff.onBuffActivated.sub(() => expect.fail('onBuffActivated should not have been emitted'));
  const onExtended = buff.onBuffExtended.sub((b) => {
    expect(b.id).toBe('/buff/example');
  });
  const onExpired = buff.onBuffExpired.sub(() => expect.fail('onBuffExpired should not have been emitted'));

  // Act
  buff.setBuff('/buff/example', 20);

  // After
  onActivated();
  onExtended();
  onExpired();
});

it('emits an expired event when a buff is set to 0', () => {
  // Arrange
  expect.assertions(1);
  buff.increaseBuff('/buff/example', 10);

  const onActivated = buff.onBuffActivated.sub(() => expect.fail('onBuffActivated should not have been emitted'));
  const onExtended = buff.onBuffExtended.sub(() => expect.fail('onBuffExtended should not have been emitted'));
  const onExpired = buff.onBuffExpired.sub((b) => {
    expect(b.id).toBe('/buff/example');
  });

  // Act
  buff.setBuff('/buff/example', 0);

  // After
  onActivated();
  onExtended();
  onExpired();
});

it('does not emit an event when a buff is set lower', () => {
  // Arrange
  expect.assertions(0);
  buff.increaseBuff('/buff/example', 10);

  const onActivated = buff.onBuffActivated.sub(() => expect.fail('onBuffActivated should not have been emitted'));
  const onExtended = buff.onBuffExtended.sub(() => expect.fail('onBuffExtended should not have been emitted'));
  const onExpired = buff.onBuffExtended.sub(() => expect.fail('onExpired should not have been emitted'));

  // Act
  buff.setBuff('/buff/example', 9);

  // After
  onActivated();
  onExtended();
  onExpired();
});
