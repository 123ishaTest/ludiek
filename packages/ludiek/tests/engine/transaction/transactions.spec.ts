import { describe, expect, it, vi } from 'vitest';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { FalseEvaluator } from '@ludiek/stdlib/condition/FalseCondition';
import { TrueEvaluator } from '@ludiek/stdlib/condition/TrueCondition';
import { AlwaysConsumer } from '@tests/shared/AlwaysInput';
import { NeverConsumer } from '@tests/shared/NeverInput';
import { AlwaysProducer } from '@tests/shared/AlwaysOutput';
import { NeverProducer } from '@tests/shared/NeverOutput';

const alwaysInput = new AlwaysConsumer();
const neverInput = new NeverConsumer();
const alwaysOutput = new AlwaysProducer();
const neverOutput = new NeverProducer();

const engine = new LudiekEngine({
  evaluators: [new TrueEvaluator(), new FalseEvaluator()],
  consumers: [alwaysInput, neverInput],
  producers: [alwaysOutput, neverOutput],
});

describe('Engine Transactions', () => {
  it('completes an empty transaction', () => {
    // Act
    const completed = engine.handleTransaction({});

    // Assert
    expect(completed).toBe(true);
  });

  it('stops if we cannot cpmsi,e', () => {
    // Arrange
    const consumeSpy = vi.spyOn(neverInput, 'consume');
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
    expect(consumeSpy).not.toHaveBeenCalled();
  });

  it('continues if we can consume', () => {
    // Arrange
    const consumeSpy = vi.spyOn(alwaysInput, 'consume');
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
    expect(consumeSpy).toHaveBeenCalledOnce();
  });

  it('stops if we cannot gain', () => {
    // Arrange
    const gainSpy = vi.spyOn(neverOutput, 'produce');
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
    const gainSpy = vi.spyOn(alwaysOutput, 'produce');
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
