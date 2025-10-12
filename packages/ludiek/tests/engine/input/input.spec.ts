import { describe, expect, it, vi } from 'vitest';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { EmptyConsumer, EmptyInput } from '@tests/shared/EmptyInput';
import { InputNotFoundError } from '@ludiek/engine/input/InputError';
import { AlwaysConsumer } from '@tests/shared/AlwaysInput';
import { NeverConsumer } from '@tests/shared/NeverInput';

describe('Engine Input', () => {
  it('registers provided consumers', () => {
    // Arrange
    const consumers = [new AlwaysConsumer(), new NeverConsumer()];

    // Act
    const engine = new LudiekEngine({
      consumers: consumers,
    });
    const registeredConsumers = engine.consumers;

    // Assert
    expect(registeredConsumers).toEqual(consumers);
  });

  it('consumes input', () => {
    // Arrange
    const emptyInput = new EmptyConsumer();
    const engine = new LudiekEngine({
      consumers: [emptyInput],
    });
    const input: EmptyInput = {
      type: '/input/empty',
      amount: 3,
    };
    const canConsumeSpy = vi.spyOn(emptyInput, 'canConsume');
    const consumeSpy = vi.spyOn(emptyInput, 'consume');

    // Act
    const canConsume = engine.canConsume(input);
    engine.consume(input);

    // Assert
    expect(canConsume).toBe(true);
    expect(canConsumeSpy).toBeCalledWith(input);
    expect(consumeSpy).toBeCalledWith(input);
  });

  it("throws an error when input doesn't exist on canConsume", () => {
    // Arrange
    const engine = new LudiekEngine({});

    // Act
    expect(() => {
      // @ts-expect-error unknown type
      engine.canConsume({ type: 'wrong' });
    }).toThrow(InputNotFoundError);
  });

  it("throws an error when input doesn't exist on consume", () => {
    // Arrange
    const engine = new LudiekEngine({});

    // Act
    expect(() => {
      // @ts-expect-error unknown type
      engine.consume({ type: 'wrong', amount: 1 });
    }).toThrow(InputNotFoundError);
  });
});
