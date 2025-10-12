import { describe, expect, it } from 'vitest';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { LudiekEvaluator } from '@ludiek/engine/condition/LudiekEvaluator';
import { TrueEvaluator } from '@ludiek/stdlib/condition/TrueCondition';
import { FalseEvaluator } from '@ludiek/stdlib/condition/FalseCondition';
import { ConditionNotFoundError } from '@ludiek/engine/condition/ConditionError';

describe('Engine Conditions', () => {
  it('registers provided evaluators', () => {
    // Arrange
    const evaluators = [new TrueEvaluator(), new FalseEvaluator()];

    // Act
    const engine = new LudiekEngine({
      evaluators: evaluators,
    });
    const registeredEvaluators = engine.evaluators;

    // Assert
    expect(registeredEvaluators).toEqual(evaluators);
  });

  it('checks an always true condition', () => {
    // Arrange
    const engine = new LudiekEngine({
      evaluators: [new TrueEvaluator()],
    });

    // Act
    const result = engine.evaluate({ type: '/condition/true' });

    // Assert
    expect(result).toBe(true);
  });

  it('checks an always false condition', () => {
    // Arrange
    const engine = new LudiekEngine({
      evaluators: [new FalseEvaluator()],
    });

    // Act
    const result = engine.evaluate({ type: '/condition/false' });

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

    class MyFeatureEvaluator extends LudiekEvaluator<MyShape> {
      readonly type = 'maybe';
      private _feature: MyFeature;

      constructor(feature: MyFeature) {
        super();
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
      evaluators: [new MyFeatureEvaluator(myFeature)],
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
      // @ts-expect-error unknown type
      engine.evaluate({ type: 'wrong' });
    }).toThrow(ConditionNotFoundError);
  });
});
