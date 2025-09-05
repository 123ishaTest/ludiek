import { describe, expect, it, vi } from 'vitest';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { EmptyController, EmptyRequest } from '@tests/shared/EmptyController';
import { KitchenSinkPlugin } from '@tests/shared/KitchenSinkPlugin';
import { ControllerNotFoundError } from '@ludiek/engine/request/RequestError';

const engine = new LudiekEngine({
  plugins: [],
});

describe('Engine Requests', () => {
  it('resolves a request', () => {
    // Arrange
    const emptyController = new EmptyController();
    const engine = new LudiekEngine({
      controllers: [emptyController],
    });
    const controllerSpy = vi.spyOn(emptyController, 'resolve');

    // Act
    const request = { type: '/request/empty' } satisfies EmptyRequest;
    engine.request(request);

    // Assert
    expect(controllerSpy).toBeCalledWith(request);
  });

  it('retrieves request from plugins', () => {
    // Arrange
    const kitchenSink = new KitchenSinkPlugin();
    const engine = new LudiekEngine({
      plugins: [kitchenSink],
    });
    const increaseSpy = vi.spyOn(kitchenSink, 'increase');

    // Act
    engine.request({
      type: '/request/increase-variable',
      amount: 4,
    });

    // Act
    expect(increaseSpy).toBeCalledWith(4);

    // Assert
  });

  it('throws an error when performing an unknown request', () => {
    // Assert
    expect(() => {
      // @ts-expect-error wrong is not a known request type
      engine.request({ type: 'wrong' });
    }).toThrow(ControllerNotFoundError);
  });
});
