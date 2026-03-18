import { z } from 'zod';
import { LudiekProducer } from '@ludiek/engine/output/LudiekProducer';
import { SkillPlugin } from '@ludiek/plugins/skill/SkillPlugin';

export const GainSkillExperienceOutputSchema = z.strictObject({
  type: z.literal('/skill/gain-experience'),
  skill: z.string(),
  amount: z.number().positive(),
});

export type GainSkillExperienceOutput = z.infer<typeof GainSkillExperienceOutputSchema>;

type Dependencies = {
  plugins: [SkillPlugin];
};

export class GainSkillExperienceProducer extends LudiekProducer<GainSkillExperienceOutput, Dependencies> {
  readonly schema = GainSkillExperienceOutputSchema;

  /**
   * Experience can always be gained
   * TODO: Should there be an experience cap?
   */
  canProduce(): boolean {
    return true;
  }

  /**
   * Gain the experience
   * @param output
   */
  produce(output: GainSkillExperienceOutput): void {
    this.engine.plugins.skill.gainExperience(output);
  }
}
