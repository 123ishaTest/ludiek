import { describe, expect, it } from 'vitest';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { LudiekCondition } from '@ludiek/engine/LudiekCondition';

class AlwaysTrueEvaluator implements LudiekCondition<never> {
  type: string = 'always-true';
  evaluate(): boolean {
    return true;
  }
}

describe('Engine Conditions', () => {
  it('checks an always true condition', () => {
    // Arrange
    const engine = new LudiekEngine({
      conditions: [new AlwaysTrueEvaluator()],
    });

    // Act
    const result = engine.evaluate({ type: 'always-true' });

    // Assert
    expect(result).toBe(true);
  });
});
