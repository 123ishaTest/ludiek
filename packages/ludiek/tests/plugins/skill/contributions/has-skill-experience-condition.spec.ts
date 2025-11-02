import { describe, expect, it } from 'vitest';
import { SkillPlugin } from '@ludiek/plugins/skill/SkillPlugin';
import { HasSkillExperienceEvaluator } from '@ludiek/plugins/skill/contributions/HasSkillExperienceCondition';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';

const skill = new SkillPlugin();
const condition = new HasSkillExperienceEvaluator();

new LudiekEngine({
  plugins: [skill],
  evaluators: [condition],
});

describe('Has Skill Experience Condition', () => {
  it('evaluates skills', () => {
    // Arrange
    skill.loadContent([{ id: '/skill/fishing', experiencePerLevel: [0, 100, 200], initialExperience: 100 }]);

    // Act
    const has100Experience = condition.evaluate({
      type: '/condition/has-skill-experience',
      skill: '/skill/fishing',
      experience: 100,
    });

    const has101Experience = condition.evaluate({
      type: '/condition/has-skill-experience',
      skill: '/skill/fishing',
      experience: 101,
    });

    // Assert
    expect(has100Experience).toBe(true);
    expect(has101Experience).toBe(false);
  });
});
