import { BaseConditionShape, LudiekCondition } from '@ludiek/engine/condition/LudiekCondition';
import { SkillPlugin } from '@ludiek/plugins/skill/SkillPlugin';

interface HasSkillLevelConditionShape extends BaseConditionShape {
  type: '/skill/has-level';
  skill: string;
  level: number;
}

export class HasSkillLevelCondition implements LudiekCondition<HasSkillLevelConditionShape> {
  readonly type = '/skill/has-level';

  private _skill: SkillPlugin;

  constructor(skill: SkillPlugin) {
    this._skill = skill;
  }

  evaluate(condition: HasSkillLevelConditionShape): boolean {
    return this._skill.getLevel(condition.skill) >= condition.level;
  }
}
