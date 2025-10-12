import { beforeEach, describe, expect, it } from 'vitest';
import { KeyItemPlugin } from '@ludiek/plugins/keyItem/KeyItemPlugin';
import { HasKeyItemEvaluator } from '@ludiek/plugins/keyItem/HasKeyItemCondition';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';

const keyItem = new KeyItemPlugin();
const evaluator = new HasKeyItemEvaluator();

new LudiekEngine({
  plugins: [keyItem],
  evaluators: [evaluator],
});

beforeEach(() => {
  keyItem.loadContent([{ id: '/key-item/example' }]);
});

describe('Has KeyItem Condition', () => {
  it('evaluates to true on KeyItems we have', () => {
    // Arrange
    keyItem.gainKeyItem('/key-item/example');

    // Act
    const hasItem = evaluator.evaluate({
      type: '/condition/key-item',
      item: '/key-item/example',
    });

    // Assert
    expect(hasItem).toBe(true);
  });

  it("evaluates to false on KeyItems we don't have", () => {
    // Act
    const hasItem = evaluator.evaluate({
      type: '/condition/key-item',
      item: '/key-item/example',
    });

    // Assert
    expect(hasItem).toBe(false);
  });
});
