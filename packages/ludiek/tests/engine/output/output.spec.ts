import { describe, expect, it, vi } from 'vitest';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { EmptyOutput, EmptyProducer } from '@tests/shared/EmptyOutput';
import { OutputNotFoundError } from '@ludiek/engine/output/OutputError';

describe('Engine Output', () => {
  it('gains output', () => {
    // Arrange
    const emptyOutput = new EmptyProducer();
    const engine = new LudiekEngine({
      producers: [emptyOutput],
    });
    const output: EmptyOutput = {
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
