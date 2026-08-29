import { z } from 'zod';
import { AchievementPlugin } from '@ludiek/plugins/achievement/AchievementPlugin';
import { LudiekMutator } from '@ludiek/engine/mutation/LudiekMutator';

export const EarnAchievementOutputSchema = z.strictObject({
  type: z.literal('/mutation/earn-achievement'),
  id: z.string(),
  amount: z.literal(1).default(1),
});

export type EarnAchievementOutput = z.infer<typeof EarnAchievementOutputSchema>;

type Dependencies = {
  plugins: [AchievementPlugin];
};

export class EarnAchievementMutator extends LudiekMutator<EarnAchievementOutput, Dependencies> {
  readonly schema = EarnAchievementOutputSchema;

  canApply(): boolean {
    return true;
  }

  apply(output: EarnAchievementOutput): void {
    this.engine.plugins.achievement.earnAchievement(output.id);
  }
}
