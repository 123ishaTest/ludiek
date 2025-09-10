import { describe, expect, it, vi } from 'vitest';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { FalseCondition } from '@ludiek/engine/condition/FalseCondition';
import { TrueCondition } from '@ludiek/engine/condition/TrueCondition';
import { AlwaysInput } from '@tests/shared/AlwaysInput';
import { NeverInput } from '@tests/shared/NeverInput';
import { AlwaysOutput } from '@tests/shared/AlwaysOutput';
import { NeverOutput } from '@tests/shared/NeverOutput';

const alwaysInput = new AlwaysInput();
const neverInput = new NeverInput();
const alwaysOutput = new AlwaysOutput();
const neverOutput = new NeverOutput();

const engine = new LudiekEngine({
  conditions: [new TrueCondition(), new FalseCondition()],
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
        type: '/input/never',
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
        type: '/input/always',
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
        type: '/output/never',
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
        type: '/output/always',
        amount: 0,
      },
    };

    // Act
    const completed = engine.handleTransaction(transaction);

    // Assert
    expect(completed).toBe(true);
    expect(gainSpy).toHaveBeenCalledOnce();
  });

  it('stops on false condition', () => {
    // Act
    const isCompleted = engine.handleTransaction({
      requirement: {
        type: '/condition/false',
      },
    });

    // Assert
    expect(isCompleted).toBe(false);
  });

  it('continues on true condition', () => {
    // Act
    const isCompleted = engine.handleTransaction({
      requirement: {
        type: '/condition/true',
      },
    });

    // Assert
    expect(isCompleted).toBe(true);
  });
});
