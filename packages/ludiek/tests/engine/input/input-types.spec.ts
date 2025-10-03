import { expect, it } from 'vitest';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { EmptyInput } from '@tests/shared/EmptyInput';
import { InputNotFoundError } from '@ludiek/engine/input/InputError';

it('is type-safe', () => {
  // Arrange
  const engine = new LudiekEngine({
    consumers: [new EmptyInput()],
  });

  // Valid
  engine.loseInput({ type: '/input/empty', amount: 2 });

  expect(() => {
    // @ts-expect-error unknown type
    engine.loseInput({ type: 'wrong' });
  }).toThrow(InputNotFoundError);
});

it('it collapses to never when no input exist', () => {
  // Arrange
  const engine = new LudiekEngine({});

  expect(() => {
    // @ts-expect-error unknown type
    engine.loseInput({ type: 'wrong', amount: 4 });
  }).toThrow(InputNotFoundError);
});
