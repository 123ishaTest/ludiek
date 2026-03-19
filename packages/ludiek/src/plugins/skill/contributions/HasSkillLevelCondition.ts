import { z } from 'zod';
import { LudiekEvaluator } from '@ludiek/engine/condition/LudiekEvaluator';
import { SkillPlugin } from '@ludiek/plugins/skill/SkillPlugin';

export const HasSkillLevelConditionSchema = z.strictObject({
  type: z.literal('/condition/has-skill-level'),
  skill: z.string(),
  level: z.number(),
});

export type HasSkillLevelCondition = z.infer<typeof HasSkillLevelConditionSchema>;

type Dependencies = {
  plugins: [SkillPlugin];
};

export class HasSkillLevelEvaluator extends LudiekEvaluator<HasSkillLevelCondition, Dependencies> {
  readonly schema = HasSkillLevelConditionSchema;

  evaluate(condition: HasSkillLevelCondition): boolean {
    return this.engine.plugins.skill.getLevel(condition.skill) >= condition.level;
  }
}
