import { beforeEach, describe, expect, it } from 'vitest';
import { AchievementPlugin } from '@ludiek/plugins/achievement/AchievementPlugin';
import { HasAchievementEvaluator } from '@ludiek/plugins/achievement/HasAchievementCondition';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';

const achievement = new AchievementPlugin();
const evaluator = new HasAchievementEvaluator();

new LudiekEngine({
  plugins: [achievement],
  evaluators: [evaluator],
});

beforeEach(() => {
  achievement.loadContent([{ id: 'manual' }]);
});

describe('Has Achievement Condition', () => {
  it('evaluates to true on statistics we have', () => {
    // Arrange
    achievement.earnAchievement('manual');

    // Act
    const hasManual = evaluator.evaluate({
      type: '/condition/has-achievement',
      id: 'manual',
    });

    // Assert
    expect(hasManual).toBe(true);
  });

  it('evaluates to false on statistics we have', () => {
    // Act
    const hasManual = evaluator.evaluate({
      type: '/condition/has-achievement',
      id: 'manual',
    });

    // Assert
    expect(hasManual).toBe(false);
  });
});
