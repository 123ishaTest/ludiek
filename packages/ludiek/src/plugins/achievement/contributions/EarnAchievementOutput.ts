import { AchievementPlugin } from '@ludiek/plugins/achievement/AchievementPlugin';
import { BaseOutput, LudiekProducer } from '@ludiek/engine/output/LudiekProducer';

interface EarnAchievementOutput extends BaseOutput {
  type: '/output/earn-achievement';
  id: string;
}

type Dependencies = {
  plugins: [AchievementPlugin];
};

export class EarnAchievementProducer extends LudiekProducer<EarnAchievementOutput, Dependencies> {
  readonly type = '/output/earn-achievement';

  canProduce(): boolean {
    return true;
  }

  produce(output: EarnAchievementOutput): void {
    this.engine.plugins.achievement.earnAchievement(output.id);
  }
}
