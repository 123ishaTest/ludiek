import { AchievementPlugin } from '@ludiek/plugins/achievement/AchievementPlugin';
import { BaseOutputShape, LudiekOutput } from '@ludiek/engine/transactions/LudiekOutput';

interface AchievementOutputShape extends BaseOutputShape {
  type: 'achievement';
  id: string;
}

export class AchievementOutput implements LudiekOutput<AchievementOutputShape> {
  readonly type: string = 'achievement';

  private _achievement: AchievementPlugin;

  constructor(achievement: AchievementPlugin) {
    this._achievement = achievement;
  }

  canGain(): boolean {
    return true;
  }

  gain(output: AchievementOutputShape): void {
    this._achievement.earnAchievement(output.id);
  }
}
