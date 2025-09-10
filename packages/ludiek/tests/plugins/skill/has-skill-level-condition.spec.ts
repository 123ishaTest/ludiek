import { describe, expect, it } from 'vitest';
import { SkillPlugin } from '@ludiek/plugins/skill/SkillPlugin';
import { HasSkillLevelCondition } from '@ludiek/plugins/skill/HasSkillLevelCondition';

describe('Has Skill Level Condition', () => {
  it('evaluates skills', () => {
    // Arrange
    const skill = new SkillPlugin();
    skill.loadContent([{ id: '/skill/fishing', experiencePerLevel: [0, 100, 200], initialExperience: 100 }]);
    const condition = new HasSkillLevelCondition(skill);

    // Act
    const has1Fishing = condition.evaluate({
      type: '/condition/has-skill-level',
      skill: '/skill/fishing',
      level: 1,
    });

    const has2Fishing = condition.evaluate({
      type: '/condition/has-skill-level',
      skill: '/skill/fishing',
      level: 2,
    });

    // Assert
    expect(has1Fishing).toBe(true);
    expect(has2Fishing).toBe(false);
  });
});
