import { beforeEach, describe, expect, it } from 'vitest';

import { AchievementPlugin } from '@ludiek/plugins/achievement/AchievementPlugin';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { AlwaysTrueCondition } from '@ludiek/engine/condition/AlwaysTrueCondition';
import { AlwaysFalseCondition } from '@ludiek/engine/condition/AlwaysFalseCondition';
import { UnknownAchievementError } from '@ludiek/plugins/achievement/AchievementErrors';

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

describe('Bad flow', () => {
  it('throws an error when accessing an unknown statistic ', () => {
    expect(() => achievement.hasAchievement('wrong')).toThrow(UnknownAchievementError);
  });
});
