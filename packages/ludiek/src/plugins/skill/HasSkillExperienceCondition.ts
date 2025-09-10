import { BaseConditionShape, LudiekCondition } from '@ludiek/engine/condition/LudiekCondition';
import { SkillPlugin } from '@ludiek/plugins/skill/SkillPlugin';

interface HasSkillExperienceConditionShape extends BaseConditionShape {
  type: '/condition/has-skill-experience';
  skill: string;
  experience: number;
}

export class HasSkillExperienceCondition extends LudiekCondition<HasSkillExperienceConditionShape> {
  readonly type = '/condition/has-skill-experience';

  private _skill: SkillPlugin;

  constructor(skill: SkillPlugin) {
    super();
    this._skill = skill;
  }

  evaluate(condition: HasSkillExperienceConditionShape): boolean {
    return this._skill.getExperience(condition.skill) >= condition.experience;
  }
}
