import { BaseOutput, LudiekProducer } from '@ludiek/engine/output/LudiekProducer';
import { SkillPlugin } from '@ludiek/plugins/skill/SkillPlugin';

interface GainSkillExperienceOutput extends BaseOutput {
  type: '/skill/gain-experience';
  skill: string;
  amount: number;
}

type Dependencies = {
  plugins: [SkillPlugin];
};

export class GainSkillExperienceProducer extends LudiekProducer<GainSkillExperienceOutput, Dependencies> {
  readonly type = '/skill/gain-experience';

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
