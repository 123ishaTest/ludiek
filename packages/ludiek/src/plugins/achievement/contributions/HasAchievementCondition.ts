import { BaseCondition, LudiekEvaluator } from '@ludiek/engine/condition/LudiekEvaluator';
import { AchievementPlugin } from '@ludiek/plugins/achievement/AchievementPlugin';

interface HasAchievementCondition extends BaseCondition {
  type: '/condition/has-achievement';
  id: string;
}

type Dependencies = {
  plugins: [AchievementPlugin];
};

export class HasAchievementEvaluator extends LudiekEvaluator<HasAchievementCondition, Dependencies> {
  readonly type = '/condition/has-achievement';

  evaluate(condition: HasAchievementCondition): boolean {
    return this.engine.plugins.achievement.hasAchievement(condition.id);
  }
}
