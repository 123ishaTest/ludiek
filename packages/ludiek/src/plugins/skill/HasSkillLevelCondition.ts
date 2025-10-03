import { BaseCondition, LudiekEvaluator } from '@ludiek/engine/condition/LudiekEvaluator';
import { SkillPlugin } from '@ludiek/plugins/skill/SkillPlugin';

interface HasSkillLevelCondition extends BaseCondition {
  type: '/condition/has-skill-level';
  skill: string;
  level: number;
}

type Dependencies = {
  plugins: [SkillPlugin];
};

export class HasSkillLevelEvaluator extends LudiekEvaluator<HasSkillLevelCondition, Dependencies> {
  readonly type = '/condition/has-skill-level';

  evaluate(condition: HasSkillLevelCondition): boolean {
    return this.engine.plugins.skill.getLevel(condition.skill) >= condition.level;
  }
}
