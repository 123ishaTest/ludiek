import { describe, expect, it, vi } from 'vitest';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { AlwaysFalseCondition } from '@ludiek/engine/evaluators/AlwaysFalseCondition';
import { AlwaysTrueCondition } from '@ludiek/engine/evaluators/AlwaysTrueCondition';
import { InputNotFoundError } from '@ludiek/engine/LudiekError';

const neverInput = {
  type: 'never',
  canLose: () => false,
  lose: () => {
    throw new Error('Method not implemented.');
  },
};

const alwaysInput = {
  type: 'always',
  canLose: () => true,
  lose: () => {},
};

const engine = new LudiekEngine({
  conditions: [new AlwaysTrueCondition(), new AlwaysFalseCondition()],
  inputs: [neverInput, alwaysInput],
});

describe('Engine Input', () => {
  it('stops if we cannot lose', () => {
    // Arrange
    const loseSpy = vi.spyOn(neverInput, 'lose');
    const transaction = {
      input: {
        type: 'never',
        amount: 0,
      },
    };

    // Act
    const completed = engine.handleTransaction(transaction);

    // Assert
    expect(completed).toBe(false);
    expect(loseSpy).not.toHaveBeenCalled();
  });

  it('continues if we can lose', () => {
    // Arrange
    const loseSpy = vi.spyOn(alwaysInput, 'lose');
    const transaction = {
      input: {
        type: 'always',
        amount: 0,
      },
    };

    // Act
    const completed = engine.handleTransaction(transaction);

    // Assert
    expect(completed).toBe(true);
    expect(loseSpy).toHaveBeenCalledOnce();
  });

  it("throws an error when input doesn't exist on canLoseInput", () => {
    // Arrange
    expect(() => {
      engine.canLoseInput({
        type: 'wrong',
        amount: 1,
      });
    }).toThrow(InputNotFoundError);
  });

  it("throws an error when input doesn't exist on loseInput", () => {
    // Arrange
    expect(() => {
      engine.loseInput({
        type: 'wrong',
        amount: 1,
      });
    }).toThrow(InputNotFoundError);
  });
});
