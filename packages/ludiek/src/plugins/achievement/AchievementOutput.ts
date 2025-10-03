import { AchievementPlugin } from '@ludiek/plugins/achievement/AchievementPlugin';
import { BaseOutput, LudiekProducer } from '@ludiek/engine/output/LudiekProducer';

interface AchievementOutput extends BaseOutput {
  type: '/output/achievement';
  id: string;
}

type Dependencies = {
  plugins: [AchievementPlugin];
};

export class AchievementProducer extends LudiekProducer<AchievementOutput, Dependencies> {
  readonly type = '/output/achievement';

  canGain(): boolean {
    return true;
  }

  gain(output: AchievementOutput): void {
    this.engine.plugins.achievement.earnAchievement(output.id);
  }
}
