import { describe, expect, it } from 'vitest';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { AlwaysFalseCondition } from '@ludiek/engine/conditions/AlwaysFalseCondition';
import { AlwaysTrueCondition } from '@ludiek/engine/conditions/AlwaysTrueCondition';

const engine = new LudiekEngine({
  conditions: [new AlwaysTrueCondition(), new AlwaysFalseCondition()],
});

describe('Engine Transactions', () => {
  it('completes an empty transaction', () => {
    // Act
    const completed = engine.handleTransaction({});

    // Assert
    expect(completed).toBe(true);
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
