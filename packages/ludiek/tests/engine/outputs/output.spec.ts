import { describe, expect, it, vi } from 'vitest';
import { OutputNotFoundError } from '@ludiek/engine/LudiekError';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { EmptyOutput, EmptyOutputShape } from '@tests/shared/EmptyOutput';
import { KitchenSinkPlugin } from '@tests/shared/KitchenSinkPlugin';

describe('Engine Output', () => {
  it('gains output', () => {
    // Arrange
    const emptyOutput = new EmptyOutput();
    const engine = new LudiekEngine({
      outputs: [emptyOutput],
    });
    const output: EmptyOutputShape = {
      type: '/output/empty',
      amount: 3,
    };
    const canGainOutputSpy = vi.spyOn(emptyOutput, 'canGain');
    const gainOutputSpy = vi.spyOn(emptyOutput, 'gain');

    // Act
    const canLose = engine.canGainOutput(output);
    engine.gainOutput(output);

    // Assert
    expect(canLose).toBe(true);
    expect(canGainOutputSpy).toBeCalledWith(output);
    expect(gainOutputSpy).toBeCalledWith(output);
  });

  it('retrieves outputs from plugins', () => {
    // Arrange
    const kitchenSink = new KitchenSinkPlugin();
    const engine = new LudiekEngine({
      plugins: [kitchenSink],
    });
    const gainSpy = vi.spyOn(kitchenSink, 'increase');

    // Act
    engine.gainOutput({
      type: '/output/kitchen-sink',
      amount: 4,
    });

    // Assert
    expect(gainSpy).toHaveBeenCalledWith(4);
    expect(kitchenSink.variable).toBe(4);
  });

  it("throws an error when output doesn't exist on canGainOutput", () => {
    // Arrange
    const engine = new LudiekEngine({});

    // Act
    expect(() => {
      // @ts-expect-error unknown type
      engine.canGainOutput({ type: 'wrong', amount: 1 });
    }).toThrow(OutputNotFoundError);
  });

  it("throws an error when output doesn't exist on gainOutput", () => {
    // Arrange
    const engine = new LudiekEngine({});

    // Act
    expect(() => {
      // @ts-expect-error unknown type
      engine.gainOutput({ type: 'wrong', amount: 1 });
    }).toThrow(OutputNotFoundError);
  });
});
