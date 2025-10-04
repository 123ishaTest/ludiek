import { beforeEach, describe, expect, it } from 'vitest';
import { AchievementPlugin } from '@ludiek/plugins/achievement/AchievementPlugin';
import { AchievementProducer } from '@ludiek/plugins/achievement/AchievementOutput';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';

const achievement = new AchievementPlugin();
const producer = new AchievementProducer();

new LudiekEngine({
  plugins: [achievement],
  producers: [producer],
});

beforeEach(() => {
  achievement.loadContent([{ id: 'example-achievement' }]);
});

describe('Achievement Output', () => {
  it('checks if we can earn achievement', () => {
    // Arrange

    // Act
    const canProduce = producer.canProduce();

    // Assert
    expect(canProduce).toBe(true);
  });

  it('earns achievement', () => {
    // Act
    producer.produce({
      type: '/output/achievement',
      id: 'example-achievement',
      amount: 1,
    });
    const hasAchievement = achievement.hasAchievement('example-achievement');

    // Assert
    expect(hasAchievement).toBe(true);
  });
});
