import { describe, expect, it, vi } from 'vitest';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { InputNotFoundError } from '@ludiek/engine/LudiekError';
import { EmptyInput, EmptyInputShape } from '@tests/shared/EmptyInput';
import { KitchenSinkPlugin } from '@tests/shared/KitchenSinkPlugin';

describe('Engine Input', () => {
  it('loses input', () => {
    // Arrange
    const emptyInput = new EmptyInput();
    const engine = new LudiekEngine({
      inputs: [emptyInput],
    });
    const input: EmptyInputShape = {
      type: '/input/empty',
      amount: 3,
    };
    const canLoseInputSpy = vi.spyOn(emptyInput, 'canLose');
    const loseInputSpy = vi.spyOn(emptyInput, 'lose');

    // Act
    const canLose = engine.canLoseInput(input);
    engine.loseInput(input);

    // Assert
    expect(canLose).toBe(true);
    expect(canLoseInputSpy).toBeCalledWith(input);
    expect(loseInputSpy).toBeCalledWith(input);
  });

  it('retrieves inputs from plugins', () => {
    // Arrange
    const kitchenSink = new KitchenSinkPlugin();
    kitchenSink.increase(4);
    const engine = new LudiekEngine({
      plugins: [kitchenSink],
    });
    const loseSpy = vi.spyOn(kitchenSink, 'increase');

    // Act
    engine.loseInput({
      type: '/input/kitchen-sink',
      amount: 4,
    });

    // Assert
    expect(loseSpy).toHaveBeenCalledWith(-4);
  });

  it("throws an error when input doesn't exist on canLoseInput", () => {
    // Arrange
    const engine = new LudiekEngine({});

    // Act
    expect(() => {
      // @ts-expect-error unknown type
      engine.canLoseInput({ type: 'wrong' });
    }).toThrow(InputNotFoundError);
  });

  it("throws an error when input doesn't exist on loseInput", () => {
    // Arrange
    const engine = new LudiekEngine({});
    expect(() => {
      // @ts-expect-error unknown type
      engine.loseInput({ type: 'wrong', amount: 1 });
    }).toThrow(InputNotFoundError);
  });
});
