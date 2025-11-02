import { describe, expect, it } from 'vitest';
import { SkillPlugin } from '@ludiek/plugins/skill/SkillPlugin';
import { HasSkillLevelEvaluator } from '@ludiek/plugins/skill/contributions/HasSkillLevelCondition';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';

const skill = new SkillPlugin();
const condition = new HasSkillLevelEvaluator();

new LudiekEngine({
  plugins: [skill],
  evaluators: [condition],
});

describe('Has Skill Level Condition', () => {
  it('evaluates skills', () => {
    // Arrange
    skill.loadContent([{ id: '/skill/fishing', experiencePerLevel: [0, 100, 200], initialExperience: 100 }]);

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
