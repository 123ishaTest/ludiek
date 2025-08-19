import { beforeEach, describe, expect, it } from 'vitest';
import { AchievementPlugin } from '@ludiek/plugins/achievement/AchievementPlugin';
import { AchievementOutput } from '@ludiek/plugins/achievement/transactions/AchievementOutput';

const achievement = new AchievementPlugin();

beforeEach(() => {
  achievement.loadContent([{ id: 'example-achievement' }]);
});

describe('Achievement Output', () => {
  it('checks if we can earn achievement', () => {
    // Arrange
    const output = new AchievementOutput(achievement);

    // Act
    const canGain = output.canGain();

    // Assert
    expect(canGain).toBe(true);
  });

  it('earns achievement', () => {
    // Arrange
    const output = new AchievementOutput(achievement);

    // Act
    output.gain({
      type: 'achievement',
      id: 'example-achievement',
      amount: 1,
    });
    const hasAchievement = achievement.hasAchievement('example-achievement');

    // Assert
    expect(hasAchievement).toBe(true);
  });
});
