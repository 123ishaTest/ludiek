import { BaseCondition, LudiekEvaluator } from '@ludiek/engine/condition/LudiekEvaluator';
import { SkillPlugin } from '@ludiek/plugins/skill/SkillPlugin';

interface HasSkillExperienceConditionShape extends BaseCondition {
  type: '/condition/has-skill-experience';
  skill: string;
  experience: number;
}

type Dependencies = {
  plugins: [SkillPlugin];
};

export class HasSkillExperienceCondition extends LudiekEvaluator<HasSkillExperienceConditionShape, Dependencies> {
  readonly type = '/condition/has-skill-experience';

  evaluate(condition: HasSkillExperienceConditionShape): boolean {
    return this.engine.plugins.skill.getExperience(condition.skill) >= condition.experience;
  }
}
