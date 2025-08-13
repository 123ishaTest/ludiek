import { BaseConditionShape, LudiekCondition } from '@ludiek/engine/LudiekCondition';
import { AchievementPlugin } from '@ludiek/plugins/achievement/AchievementPlugin';

interface HasAchievementConditionShape<AchievementId> extends BaseConditionShape {
  type: 'has-achievement';
  id: AchievementId;
}

export class HasAchievementCondition<AchievementId extends string>
  implements LudiekCondition<HasAchievementConditionShape<AchievementId>>
{
  readonly type: string = 'has-achievement';

  private _achievement: AchievementPlugin<AchievementId>;

  constructor(achievement: AchievementPlugin<AchievementId>) {
    this._achievement = achievement;
  }

  evaluate(condition: HasAchievementConditionShape<AchievementId>): boolean {
    return this._achievement.hasAchievement(condition.id);
  }
}
