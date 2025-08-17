import { beforeEach, describe, expect, it } from 'vitest';
import { AchievementPlugin } from '@ludiek/plugins/achievement/AchievementPlugin';
import { HasAchievementCondition } from '@ludiek/plugins/achievement/evaluators/HasAchievementCondition';

const achievement = new AchievementPlugin();

const achievementContent = [
  {
    id: 'manual',
  },
];

beforeEach(() => {
  achievement.loadContent(achievementContent);
});

describe('Has Achievement Condition', () => {
  it('evaluates to true on statistics we have', () => {
    // Arrange
    achievement.earnAchievement('manual');
    const condition = new HasAchievementCondition(achievement);

    // Act
    const hasManual = condition.evaluate({
      type: 'has-achievement',
      id: 'manual',
    });

    // Assert
    expect(hasManual).toBe(true);
  });

  it('evaluates to false on statistics we have', () => {
    // Arrange
    const condition = new HasAchievementCondition(achievement);

    // Act
    const hasManual = condition.evaluate({
      type: 'has-achievement',
      id: 'manual',
    });

    // Assert
    expect(hasManual).toBe(false);
  });
});
