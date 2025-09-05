import { BaseConditionShape, LudiekCondition } from '@ludiek/engine/condition/LudiekCondition';
import { SkillPlugin } from '@ludiek/plugins/skill/SkillPlugin';

interface HasSkillExperienceConditionShape extends BaseConditionShape {
  type: '/skill/has-experience';
  skill: string;
  experience: number;
}

export class HasSkillExperienceCondition implements LudiekCondition<HasSkillExperienceConditionShape> {
  readonly type = '/skill/has-experience';

  private _skill: SkillPlugin;

  constructor(skill: SkillPlugin) {
    this._skill = skill;
  }

  evaluate(condition: HasSkillExperienceConditionShape): boolean {
    return this._skill.getExperience(condition.skill) >= condition.experience;
  }
}
