import { BaseCondition, LudiekEvaluator } from '@ludiek/engine/condition/LudiekEvaluator';
import { SkillPlugin } from '@ludiek/plugins/skill/SkillPlugin';

interface HasSkillExperienceCondition extends BaseCondition {
  type: '/condition/has-skill-experience';
  skill: string;
  experience: number;
}

type Dependencies = {
  plugins: [SkillPlugin];
};

export class HasSkillExperienceEvaluator extends LudiekEvaluator<HasSkillExperienceCondition, Dependencies> {
  readonly type = '/condition/has-skill-experience';

  evaluate(condition: HasSkillExperienceCondition): boolean {
    return this.engine.plugins.skill.getExperience(condition.skill) >= condition.experience;
  }
}
