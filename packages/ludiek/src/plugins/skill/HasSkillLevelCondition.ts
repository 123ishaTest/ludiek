import { BaseConditionShape, LudiekCondition } from '@ludiek/engine/condition/LudiekCondition';
import { SkillPlugin } from '@ludiek/plugins/skill/SkillPlugin';

interface HasSkillLevelConditionShape extends BaseConditionShape {
  type: '/condition/has-skill-level';
  skill: string;
  level: number;
}

export class HasSkillLevelCondition extends LudiekCondition<HasSkillLevelConditionShape> {
  readonly type = '/condition/has-skill-level';

  private _skill: SkillPlugin;

  constructor(skill: SkillPlugin) {
    super();
    this._skill = skill;
  }

  evaluate(condition: HasSkillLevelConditionShape): boolean {
    return this._skill.getLevel(condition.skill) >= condition.level;
  }
}
