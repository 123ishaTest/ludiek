import { LudiekEvaluator } from '@ludiek/engine/condition/LudiekEvaluator';
import { AchievementPlugin } from '@ludiek/plugins/achievement/AchievementPlugin';
import { z } from 'zod';

export const HasAchievementConditionSchema = z.strictObject({
  type: z.literal('/condition/has-achievement'),
  id: z.string(),
});

export type HasAchievementCondition = z.infer<typeof HasAchievementConditionSchema>;

type Dependencies = {
  plugins: [AchievementPlugin];
};

export class HasAchievementEvaluator extends LudiekEvaluator<HasAchievementCondition, Dependencies> {
  readonly schema = HasAchievementConditionSchema;

  evaluate(condition: HasAchievementCondition): boolean {
    return this.engine.plugins.achievement.hasAchievement(condition.id);
  }
}
