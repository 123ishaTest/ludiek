import { beforeEach, describe, expect, it } from 'vitest';

import { AchievementPlugin } from '@ludiek/plugins/achievement/AchievementPlugin';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { TrueCondition } from '@ludiek/engine/condition/TrueCondition';
import { FalseCondition } from '@ludiek/engine/condition/FalseCondition';
import { UnknownAchievementError } from '@ludiek/plugins/achievement/AchievementErrors';

const achievement = new AchievementPlugin();
new LudiekEngine({
  conditions: [new TrueCondition(), new FalseCondition()],
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

describe('Bad flow', () => {
  it('throws an error when accessing an unknown statistic ', () => {
    expect(() => achievement.hasAchievement('wrong')).toThrow(UnknownAchievementError);
  });
});
