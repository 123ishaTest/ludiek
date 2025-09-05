import { expect, it } from 'vitest';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { KitchenSinkPlugin } from '@tests/shared/KitchenSinkPlugin';
import { EmptyPlugin } from '@tests/shared/EmptyPlugin';
import { EmptyOutput } from '@tests/shared/EmptyOutput';
import { OutputNotFoundError } from '@ludiek/engine/output/OutputError';

it('is type-safe when plugins and output exists', () => {
  // Arrange
  const engine = new LudiekEngine({
    plugins: [new KitchenSinkPlugin()],
    outputs: [new EmptyOutput()],
  });

  engine.gainOutput({ type: '/output/kitchen-sink', amount: 4 });
  engine.gainOutput({ type: '/output/empty', amount: 3 });

  expect(() => {
    // @ts-expect-error unknown type
    engine.gainOutput({ type: 'wrong' });
  }).toThrow(OutputNotFoundError);

  expect(() => {
    // @ts-expect-error should have more arguments
    engine.gainOutput({ type: '/output/kitchen-sink' });
  }).toThrow(Error);
});

it('is type-safe when only plugins exists', () => {
  // Arrange
  const engine = new LudiekEngine({
    plugins: [new KitchenSinkPlugin()],
  });

  engine.gainOutput({ type: '/output/kitchen-sink', amount: 4 });

  expect(() => {
    // @ts-expect-error unknown type
    engine.gainOutput({ type: 'wrong' });
  }).toThrow(OutputNotFoundError);
});

it('is type-safe when plugins without output exists', () => {
  // Arrange
  const engine = new LudiekEngine({
    plugins: [new EmptyPlugin()],
  });

  expect(() => {
    // @ts-expect-error unknown type
    engine.gainOutput({ type: 'wrong' });
  }).toThrow(OutputNotFoundError);
});

it('is type-safe when only output exists', () => {
  // Arrange
  const engine = new LudiekEngine({
    outputs: [new EmptyOutput()],
  });

  // Valid
  engine.gainOutput({ type: '/output/empty', amount: 2 });

  expect(() => {
    // @ts-expect-error unknown type
    engine.gainOutput({ type: 'wrong' });
  }).toThrow(OutputNotFoundError);
});

it('it collapses to never when neither exist', () => {
  // Arrange
  const engine = new LudiekEngine({});

  expect(() => {
    // @ts-expect-error unknown type
    engine.gainOutput({ type: 'wrong' });
  }).toThrow(OutputNotFoundError);
});
