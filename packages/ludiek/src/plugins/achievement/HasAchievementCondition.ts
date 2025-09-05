import { BaseConditionShape, LudiekCondition } from '@ludiek/engine/condition/LudiekCondition';
import { AchievementPlugin } from '@ludiek/plugins/achievement/AchievementPlugin';

interface HasAchievementConditionShape extends BaseConditionShape {
  type: 'has-achievement';
  id: string;
}

export class HasAchievementCondition implements LudiekCondition<HasAchievementConditionShape> {
  readonly type = 'has-achievement';

  private _achievement: AchievementPlugin;

  constructor(achievement: AchievementPlugin) {
    this._achievement = achievement;
  }

  evaluate(condition: HasAchievementConditionShape): boolean {
    return this._achievement.hasAchievement(condition.id);
  }
}
