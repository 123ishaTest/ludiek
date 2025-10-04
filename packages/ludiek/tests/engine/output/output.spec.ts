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
    const canProduceSpy = vi.spyOn(emptyOutput, 'canProduce');
    const produceSpy = vi.spyOn(emptyOutput, 'produce');

    // Act
    const canConsume = engine.canProduce(output);
    engine.produce(output);

    // Assert
    expect(canConsume).toBe(true);
    expect(canProduceSpy).toBeCalledWith(output);
    expect(produceSpy).toBeCalledWith(output);
  });

  it("throws an error when output doesn't exist on canProduce", () => {
    // Arrange
    const engine = new LudiekEngine({});

    // Act
    expect(() => {
      // @ts-expect-error unknown type
      engine.canProduce({ type: 'wrong', amount: 1 });
    }).toThrow(OutputNotFoundError);
  });

  it("throws an error when output doesn't exist on produce", () => {
    // Arrange
    const engine = new LudiekEngine({});

    // Act
    expect(() => {
      // @ts-expect-error unknown type
      engine.produce({ type: 'wrong', amount: 1 });
    }).toThrow(OutputNotFoundError);
  });
});
