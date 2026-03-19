import { z } from 'zod';
import { LudiekEvaluator } from '@ludiek/engine/condition/LudiekEvaluator';
import { SkillPlugin } from '@ludiek/plugins/skill/SkillPlugin';

export const HasSkillExperienceConditionSchema = z.strictObject({
  type: z.literal('/condition/has-skill-experience'),
  skill: z.string(),
  experience: z.number(),
});

export type HasSkillExperienceCondition = z.infer<typeof HasSkillExperienceConditionSchema>;

type Dependencies = {
  plugins: [SkillPlugin];
};

export class HasSkillExperienceEvaluator extends LudiekEvaluator<HasSkillExperienceCondition, Dependencies> {
  readonly schema = HasSkillExperienceConditionSchema;

  evaluate(condition: HasSkillExperienceCondition): boolean {
    return this.engine.plugins.skill.getExperience(condition.skill) >= condition.experience;
  }
}
