import { BaseOutputShape, LudiekOutput } from '@ludiek/engine/output/LudiekOutput';
import { SkillPlugin } from '@ludiek/plugins/skill/SkillPlugin';

/**
 * Awards Skill Experience
 */
interface SkillExperienceOutputShape extends BaseOutputShape {
  type: '/skill/experience';
  skill: string;
  amount: number;
}

export class SkillExperienceOutput implements LudiekOutput<SkillExperienceOutputShape> {
  readonly type = '/skill/experience';

  private _skill: SkillPlugin;

  constructor(skill: SkillPlugin) {
    this._skill = skill;
  }

  /**
   * Experience can always be gained
   * TODO: Should there be an experience cap?
   */
  canGain(): boolean {
    return true;
  }

  /**
   * Gain the experience
   * @param output
   */
  gain(output: SkillExperienceOutputShape): void {
    this._skill.gainExperience(output);
  }
}
