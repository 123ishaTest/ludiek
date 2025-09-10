import { BaseConditionShape, LudiekCondition } from '@ludiek/engine/condition/LudiekCondition';
import { AchievementPlugin } from '@ludiek/plugins/achievement/AchievementPlugin';

interface HasAchievementConditionShape extends BaseConditionShape {
  type: '/condition/has-achievement';
  id: string;
}

export class HasAchievementCondition extends LudiekCondition<HasAchievementConditionShape> {
  readonly type = '/condition/has-achievement';

  private _achievement: AchievementPlugin;

  constructor(achievement: AchievementPlugin) {
    super();
    this._achievement = achievement;
  }

  evaluate(condition: HasAchievementConditionShape): boolean {
    return this._achievement.hasAchievement(condition.id);
  }
}
