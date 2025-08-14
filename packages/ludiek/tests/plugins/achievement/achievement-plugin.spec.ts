import { beforeEach, expect, it } from 'vitest';
import { AchievementPlugin } from '@ludiek/plugins/achievement/AchievementPlugin';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { AlwaysTrueCondition } from '@ludiek/engine/evaluators/AlwaysTrueCondition';
import { AlwaysFalseCondition } from '@ludiek/engine/evaluators/AlwaysFalseCondition';

const achievement = new AchievementPlugin();
new LudiekEngine({
  conditions: [new AlwaysTrueCondition(), new AlwaysFalseCondition()],
  plugins: [achievement],
});

const achievementContent = [
  {
    id: 'always-true',
    condition: {
      type: 'always-true',
    },
  },
  {
    id: 'always-false',
    condition: {
      type: 'always-false',
    },
  },
  {
    id: 'manual',
  },
];

beforeEach(() => {
  achievement.loadContent(achievementContent);
});

it('initializes at false', () => {
  // Act
  const alwaysTrue = achievement.hasAchievement('always-true');
  const alwaysFalse = achievement.hasAchievement('always-false');
  const manual = achievement.hasAchievement('manual');

  // Assert
  expect(alwaysTrue).toBe(false);
  expect(alwaysFalse).toBe(false);
  expect(manual).toBe(false);
});

it('checks for requirements', () => {
  // Act
  achievement.checkAchievements();
  const alwaysTrue = achievement.hasAchievement('always-true');
  const alwaysFalse = achievement.hasAchievement('always-false');
  const manual = achievement.hasAchievement('manual');

  // Assert
  expect(alwaysTrue).toBe(true);
  expect(alwaysFalse).toBe(false);
  expect(manual).toBe(false);
});

it('can earn manual achievements', () => {
  // Act
  achievement.earnAchievement('manual');
  const manual = achievement.hasAchievement('manual');

  // Assert
  expect(manual).toBe(true);
});

it('emits an event when gaining achievements', () => {
  // Arrange
  expect.assertions(1);

  const unsub = achievement.onAchievementEarn.sub((a) => {
    expect(a.id).toBe('manual');
  });

  // Act
  achievement.earnAchievement('manual');

  // After
  unsub();
});

it('cannot earn checked achievements twice', () => {
  expect.assertions(1);

  // Arrange
  const unsub = achievement.onAchievementEarn.sub((a) => {
    expect(a.id).toBe('always-true');
  });

  // Act
  achievement.checkAchievements();
  achievement.checkAchievements();

  // After
  unsub();
});

it('cannot earn manual achievements twice', () => {
  expect.assertions(1);

  // Arrange
  const unsub = achievement.onAchievementEarn.sub((a) => {
    expect(a.id).toBe('manual');
  });

  // Act
  achievement.earnAchievement('manual');
  achievement.earnAchievement('manual');

  // After
  unsub();
});
