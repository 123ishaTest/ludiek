import { z } from 'zod';
import { LudiekMutator } from '@ludiek/engine/mutation/LudiekMutator';
import { SkillPlugin } from '@ludiek/plugins/skill/SkillPlugin';

export const GainSkillExperienceOutputSchema = z.strictObject({
  type: z.literal('/mutation/skill/gain-experience'),
  skill: z.string(),
  amount: z.number().positive(),
});

export type GainSkillExperienceOutput = z.infer<typeof GainSkillExperienceOutputSchema>;

type Dependencies = {
  plugins: [SkillPlugin];
};

export class GainSkillExperienceProducer extends LudiekMutator<GainSkillExperienceOutput, Dependencies> {
  readonly schema = GainSkillExperienceOutputSchema;

  /**
   * Experience can always be gained
   * TODO: Should there be an experience cap?
   */
  canApply(): boolean {
    return true;
  }

  /**
   * Gain the experience
   * @param output
   */
  apply(output: GainSkillExperienceOutput): void {
    this.engine.plugins.skill.gainExperience(output);
  }
}
