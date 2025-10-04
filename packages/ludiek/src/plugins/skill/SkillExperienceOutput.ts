import { BaseOutput, LudiekProducer } from '@ludiek/engine/output/LudiekProducer';
import { SkillPlugin } from '@ludiek/plugins/skill/SkillPlugin';

/**
 * Awards Skill Experience
 */
interface SkillExperienceOutput extends BaseOutput {
  type: '/skill/experience';
  skill: string;
  amount: number;
}

type Dependencies = {
  plugins: [SkillPlugin];
};

export class SkillExperienceProducer extends LudiekProducer<SkillExperienceOutput, Dependencies> {
  readonly type = '/skill/experience';

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
  produce(output: SkillExperienceOutput): void {
    this.engine.plugins.skill.gainExperience(output);
  }
}
