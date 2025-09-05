import { BaseOutputShape, LudiekOutput } from '@ludiek/engine/output/LudiekOutput';
import { SkillPlugin } from '@ludiek/plugins/skill/SkillPlugin';

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

  canGain(): boolean {
    return true;
  }

  gain(output: SkillExperienceOutputShape): void {
    this._skill.gainExperience(output);
  }
}
