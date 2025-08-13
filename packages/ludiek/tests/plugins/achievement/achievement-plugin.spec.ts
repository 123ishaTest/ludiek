import { beforeEach, expect, it } from 'vitest';
import { AchievementDetail, AchievementPlugin } from '@ludiek/plugins/achievement/AchievementPlugin';

const achievementContent = [
  { id: 'should-gain', condition: [{ type: 'always-true' }] },
  { id: 'should-not-gain', condition: [{ type: 'always-false' }] },
] as const;

let achievement = new AchievementPlugin(achievementContent);

beforeEach(() => {
  achievement = new AchievementPlugin(achievementContent);
});

it('initializes at 0', () => {
  // Act
  const money = achievement.getAchievement('money');
  const number = achievement.getMapAchievement('numbers', 0);
  const monster = achievement.getMapAchievement('monsters', 'zombie');

  // Assert
  expect(money).toBe(0);
  expect(number).toBe(0);
  expect(monster).toBe(0);
});

it('increments with a delta', () => {
  // Act
  achievement.incrementAchievement('money', 2);
  achievement.incrementMapAchievement('numbers', 0, 3);
  achievement.incrementMapAchievement('monsters', 'zombie', 4);

  const money = achievement.getAchievement('money');
  const number = achievement.getMapAchievement('numbers', 0);
  const monster = achievement.getMapAchievement('monsters', 'zombie');

  // Assert
  expect(money).toBe(2);
  expect(number).toBe(3);
  expect(monster).toBe(4);
});

it('increments with a default of 1', () => {
  // Act
  achievement.incrementAchievement('money');
  achievement.incrementMapAchievement('numbers', 0);
  achievement.incrementMapAchievement('monsters', 'zombie');

  const money = achievement.getAchievement('money');
  const number = achievement.getMapAchievement('numbers', 0);
  const monster = achievement.getMapAchievement('monsters', 'zombie');

  // Assert
  expect(money).toBe(1);
  expect(number).toBe(1);
  expect(monster).toBe(1);
});

it('returns map objects', () => {
  // Arrange
  achievement.incrementMapAchievement('numbers', 'first', 2);
  achievement.incrementMapAchievement('numbers', 'second', 3);

  // Act
  const numbers = achievement.getMapAchievementObject('numbers');

  // Assert
  expect(numbers).toEqual({
    first: 2,
    second: 3,
  });
});
