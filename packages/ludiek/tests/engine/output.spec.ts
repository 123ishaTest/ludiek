import { describe, expect, it, vi } from 'vitest';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { AlwaysFalseCondition } from '@ludiek/engine/conditions/AlwaysFalseCondition';
import { AlwaysTrueCondition } from '@ludiek/engine/conditions/AlwaysTrueCondition';
import { OutputNotFoundError } from '@ludiek/engine/LudiekError';

const neverOutput = {
  type: 'never',
  canGain: () => false,
  gain: () => {},
};

const alwaysOutput = {
  type: 'always',
  canGain: () => true,
  gain: () => {},
};

const engine = new LudiekEngine({
  conditions: [new AlwaysTrueCondition(), new AlwaysFalseCondition()],
  outputs: [neverOutput, alwaysOutput],
});

describe('Engine Output', () => {
  it('stops if we cannot gain', () => {
    // Arrange
    const gainSpy = vi.spyOn(neverOutput, 'gain');
    const transaction = {
      output: {
        type: 'never',
        amount: 0,
      },
    };

    // Act
    const completed = engine.handleTransaction(transaction);

    // Assert
    expect(completed).toBe(false);
    expect(gainSpy).not.toHaveBeenCalled();
  });

  it('continues if we can gain', () => {
    // Arrange
    const gainSpy = vi.spyOn(alwaysOutput, 'gain');
    const transaction = {
      output: {
        type: 'always',
        amount: 0,
      },
    };

    // Act
    const completed = engine.handleTransaction(transaction);

    // Assert
    expect(completed).toBe(true);
    expect(gainSpy).toHaveBeenCalledOnce();
  });

  it("throws an error when output doesn't exist on canGainOutput", () => {
    // Arrange
    expect(() => {
      engine.canGainOutput({
        type: 'wrong',
        amount: 1,
      });
    }).toThrow(OutputNotFoundError);
  });

  it("throws an error when output doesn't exist on gainOutput", () => {
    // Arrange
    expect(() => {
      engine.gainOutput({
        type: 'wrong',
        amount: 1,
      });
    }).toThrow(OutputNotFoundError);
  });
});
