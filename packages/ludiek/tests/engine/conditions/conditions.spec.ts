import { describe, expect, it } from 'vitest';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { LudiekCondition } from '@ludiek/engine/conditions/LudiekCondition';
import { ConditionNotFoundError } from '@ludiek/engine/LudiekError';
import { AlwaysTrueCondition } from '@ludiek/engine/conditions/AlwaysTrueCondition';
import { AlwaysFalseCondition } from '@ludiek/engine/conditions/AlwaysFalseCondition';
import { KitchenSinkPlugin } from '@tests/shared/KitchenSinkPlugin';

describe('Engine Conditions', () => {
  it('checks an always true condition', () => {
    // Arrange
    const engine = new LudiekEngine({
      conditions: [new AlwaysTrueCondition()],
    });

    // Act
    const result = engine.evaluate({ type: 'always-true' });

    // Assert
    expect(result).toBe(true);
  });

  it('checks an always false condition', () => {
    // Arrange
    const engine = new LudiekEngine({
      conditions: [new AlwaysFalseCondition()],
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

  it('retrieves conditions from plugins', () => {
    // Arrange
    const engine = new LudiekEngine({
      plugins: [new KitchenSinkPlugin()],
    });

    // Act
    const condition = engine.evaluate({
      type: '/condition/has-variable',
      amount: 1,
    });

    // Assert
    expect(condition).toBe(false);
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
