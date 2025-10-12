import { describe, expect, it, vi } from 'vitest';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { EmptyController, EmptyRequest } from '@tests/shared/EmptyRequest';
import { ControllerNotFoundError } from '@ludiek/engine/request/RequestError';

const engine = new LudiekEngine({
  plugins: [],
});

describe('Engine Requests', () => {
  it('registers provided controllers', () => {
    // Arrange
    const controllers = [new EmptyController()];

    // Act
    const engine = new LudiekEngine({
      controllers: controllers,
    });
    const registeredControllers = engine.controllers;

    // Assert
    expect(registeredControllers).toEqual(controllers);
  });

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

  it('throws an error when performing an unknown request', () => {
    // Assert
    expect(() => {
      // @ts-expect-error wrong is not a known request type
      engine.request({ type: 'wrong' });
    }).toThrow(ControllerNotFoundError);
  });
});
