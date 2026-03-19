import { z } from 'zod';
import { AchievementPlugin } from '@ludiek/plugins/achievement/AchievementPlugin';
import { LudiekProducer } from '@ludiek/engine/output/LudiekProducer';

export const EarnAchievementOutputSchema = z.strictObject({
  type: z.literal('/output/earn-achievement'),
  id: z.string(),
  amount: z.literal(1).default(1),
});

export type EarnAchievementOutput = z.infer<typeof EarnAchievementOutputSchema>;

type Dependencies = {
  plugins: [AchievementPlugin];
};

export class EarnAchievementProducer extends LudiekProducer<EarnAchievementOutput, Dependencies> {
  readonly schema = EarnAchievementOutputSchema;

  canProduce(): boolean {
    return true;
  }

  produce(output: EarnAchievementOutput): void {
    this.engine.plugins.achievement.earnAchievement(output.id);
  }
}
