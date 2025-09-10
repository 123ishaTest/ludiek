import { AchievementPlugin } from '@ludiek/plugins/achievement/AchievementPlugin';
import { BaseOutputShape, LudiekOutput } from '@ludiek/engine/output/LudiekOutput';

interface AchievementOutputShape extends BaseOutputShape {
  type: '/output/achievement';
  id: string;
}

export class AchievementOutput extends LudiekOutput<AchievementOutputShape> {
  readonly type = '/output/achievement';

  private _achievement: AchievementPlugin;

  constructor(achievement: AchievementPlugin) {
    super();
    this._achievement = achievement;
  }

  canGain(): boolean {
    return true;
  }

  gain(output: AchievementOutputShape): void {
    this._achievement.earnAchievement(output.id);
  }
}
