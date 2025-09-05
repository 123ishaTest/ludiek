import { expect, it } from 'vitest';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { ControllerNotFoundError } from '@ludiek/engine/LudiekError';
import { KitchenSinkPlugin } from '@tests/shared/KitchenSinkPlugin';
import { EmptyPlugin } from '@tests/shared/EmptyPlugin';
import { EmptyController } from '@tests/shared/EmptyController';

it('is type-safe when plugins and controllers exists', () => {
  // Arrange
  const engine = new LudiekEngine({
    plugins: [new KitchenSinkPlugin()],
    controllers: [new EmptyController()],
  });

  engine.request({ type: '/request/increase-variable', amount: 4 });
  engine.request({ type: '/request/empty' });

  expect(() => {
    // @ts-expect-error unknown type
    engine.request({ type: 'wrong' });
  }).toThrow(ControllerNotFoundError);

  expect(() => {
    // @ts-expect-error should have more arguments
    engine.request({ type: 'has-currency' });
  }).toThrow(Error);
});

it('is type-safe when only plugins exists', () => {
  // Arrange
  const engine = new LudiekEngine({
    plugins: [new KitchenSinkPlugin()],
  });

  engine.request({ type: '/request/increase-variable', amount: 4 });

  expect(() => {
    // @ts-expect-error unknown type
    engine.request({ type: 'wrong' });
  }).toThrow(ControllerNotFoundError);
});

it('is type-safe when plugins without controllers exists', () => {
  // Arrange
  const engine = new LudiekEngine({
    plugins: [new EmptyPlugin()],
  });

  expect(() => {
    // @ts-expect-error unknown type
    engine.request({ type: 'wrong' });
  }).toThrow(ControllerNotFoundError);
});

it('is type-safe when only controllers exists', () => {
  // Arrange
  const engine = new LudiekEngine({
    controllers: [new EmptyController()],
  });

  // Valid
  engine.request({ type: '/request/empty' });

  expect(() => {
    // @ts-expect-error unknown type
    engine.request({ type: 'wrong' });
  }).toThrow(ControllerNotFoundError);
});

it('it collapses to never when neither exist', () => {
  // Arrange
  const engine = new LudiekEngine({});

  expect(() => {
    // @ts-expect-error unknown type
    engine.request({ type: 'wrong' });
  }).toThrow(ControllerNotFoundError);
});
