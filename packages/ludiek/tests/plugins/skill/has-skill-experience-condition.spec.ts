import { describe, expect, it } from 'vitest';
import { SkillPlugin } from '@ludiek/plugins/skill/SkillPlugin';
import { HasSkillExperienceCondition } from '@ludiek/plugins/skill/HasSkillExperienceCondition';

describe('Has Skill Experience Condition', () => {
  it('evaluates skills', () => {
    // Arrange
    const skill = new SkillPlugin();
    skill.loadContent([{ id: '/skill/fishing', experiencePerLevel: [0, 100, 200], initialExperience: 100 }]);
    const condition = new HasSkillExperienceCondition(skill);

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
