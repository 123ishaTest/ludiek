import { describe, expect, it } from 'vitest';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { LudiekCondition } from '@ludiek/engine/LudiekCondition';
import { ConditionNotFoundError } from '@ludiek/engine/LudiekError';

describe('Engine Conditions', () => {
  it('checks an always true condition', () => {
    // Arrange
    const alwaysTrueEvaluator = {
      type: 'always-true',
      evaluate: () => true,
    };
    const engine = new LudiekEngine({
      conditions: [alwaysTrueEvaluator],
    });

    // Act
    const result = engine.evaluate({ type: 'always-true' });

    // Assert
    expect(result).toBe(true);
  });

  it('checks an always false condition', () => {
    // Arrange
    const alwaysFalseEvaluator = {
      type: 'always-false',
      evaluate: () => false,
    };
    const engine = new LudiekEngine({
      conditions: [alwaysFalseEvaluator],
    });

    // Act
    const result = engine.evaluate({ type: 'always-false' });

    // Assert
    expect(result).toBe(false);
  });

  it('checks a condition', () => {
    // Arrange

    interface MyShape {
      type: 'maybe';
      value: number;
    }

    interface MyFeature {
      points: number;
    }

    class MyFeatureEvaluator implements LudiekCondition<MyShape> {
      type = 'maybe';
      private _feature: MyFeature;

      constructor(feature: MyFeature) {
        this._feature = feature;
      }

      evaluate(condition: MyShape): boolean {
        return this._feature.points >= condition.value;
      }
    }

    const myFeature: MyFeature = {
      points: 4,
    };

    const engine = new LudiekEngine({
      conditions: [new MyFeatureEvaluator(myFeature)],
    });

    // Act
    const has4 = engine.evaluate({ type: 'maybe', value: 4 });
    const has5 = engine.evaluate({ type: 'maybe', value: 5 });
    myFeature.points = 3;
    const has4Again = engine.evaluate({ type: 'maybe', value: 4 });

    // Assert
    expect(has4).toBe(true);
    expect(has5).toBe(false);
    expect(has4Again).toBe(false);
  });

  it('errors when an evaluator does not exist', () => {
    // Arrange
    const engine = new LudiekEngine({});

    // Act
    expect(() => {
      engine.evaluate({ type: 'wrong' });
    }).toThrow(ConditionNotFoundError);
  });
});
