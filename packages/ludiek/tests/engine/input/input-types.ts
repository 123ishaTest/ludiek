import { expect, it } from 'vitest';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { KitchenSinkPlugin } from '@tests/shared/KitchenSinkPlugin';
import { EmptyPlugin } from '@tests/shared/EmptyPlugin';
import { EmptyInput } from '@tests/shared/EmptyInput';
import { InputNotFoundError } from '@ludiek/engine/input/InputError';

it('is type-safe when plugins and input exists', () => {
  // Arrange
  const engine = new LudiekEngine({
    plugins: [new KitchenSinkPlugin()],
    inputs: [new EmptyInput()],
  });

  engine.loseInput({ type: '/input/kitchen-sink', amount: 4 });
  engine.loseInput({ type: '/input/empty', amount: 3 });

  expect(() => {
    // @ts-expect-error unknown type
    engine.loseInput({ type: 'wrong' });
  }).toThrow(InputNotFoundError);

  expect(() => {
    // @ts-expect-error should have more arguments
    engine.loseInput({ type: '/input/kitchen-sink' });
  }).toThrow(Error);
});

it('is type-safe when only plugins exists', () => {
  // Arrange
  const engine = new LudiekEngine({
    plugins: [new KitchenSinkPlugin()],
  });

  engine.loseInput({ type: '/input/kitchen-sink', amount: 4 });

  expect(() => {
    // @ts-expect-error unknown type
    engine.loseInput({ type: 'wrong' });
  }).toThrow(InputNotFoundError);
});

it('is type-safe when plugins without input exists', () => {
  // Arrange
  const engine = new LudiekEngine({
    plugins: [new EmptyPlugin()],
  });

  expect(() => {
    // @ts-expect-error unknown type
    engine.loseInput({ type: 'wrong' });
  }).toThrow(InputNotFoundError);
});

it('is type-safe when only input exists', () => {
  // Arrange
  const engine = new LudiekEngine({
    inputs: [new EmptyInput()],
  });

  // Valid
  engine.loseInput({ type: '/input/empty', amount: 2 });

  expect(() => {
    // @ts-expect-error unknown type
    engine.loseInput({ type: 'wrong' });
  }).toThrow(InputNotFoundError);
});

it('it collapses to never when neither exist', () => {
  // Arrange
  const engine = new LudiekEngine({});

  expect(() => {
    // @ts-expect-error unknown type
    engine.loseInput({ type: 'wrong' });
  }).toThrow(InputNotFoundError);
});
