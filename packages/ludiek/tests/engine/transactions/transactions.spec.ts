import { describe, expect, it, vi } from 'vitest';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { AlwaysFalseCondition } from '@ludiek/engine/conditions/AlwaysFalseCondition';
import { AlwaysTrueCondition } from '@ludiek/engine/conditions/AlwaysTrueCondition';

const alwaysInput = {
  type: 'always',
  canLose: () => true,
  lose: () => {},
};

const neverInput = {
  type: 'never',
  canLose: () => false,
  lose: () => {
    throw new Error('Method not implemented.');
  },
};

const alwaysOutput = {
  type: 'always',
  canGain: () => true,
  gain: () => {},
};
const neverOutput = {
  type: 'never',
  canGain: () => false,
  gain: () => {},
};

const engine = new LudiekEngine({
  conditions: [new AlwaysTrueCondition(), new AlwaysFalseCondition()],
  inputs: [alwaysInput, neverInput],
  outputs: [alwaysOutput, neverOutput],
});

describe('Engine Transactions', () => {
  it('completes an empty transaction', () => {
    // Act
    const completed = engine.handleTransaction({});

    // Assert
    expect(completed).toBe(true);
  });

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

  it('stops on false conditions', () => {
    // Act
    const isCompleted = engine.handleTransaction({
      requirement: {
        type: 'always-false',
      },
    });

    // Assert
    expect(isCompleted).toBe(false);
  });

  it('continues on true conditions', () => {
    // Act
    const isCompleted = engine.handleTransaction({
      requirement: {
        type: 'always-true',
      },
    });

    // Assert
    expect(isCompleted).toBe(true);
  });
});
