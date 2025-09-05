import { expect, it } from 'vitest';
import { SkillPlugin } from '@ludiek/plugins/skill/SkillPlugin';
import { SkillExperienceOutput } from '@ludiek/plugins/skill/SkillExperienceOutput';

it('gains experience', () => {
  // Arrange
  const skill = new SkillPlugin();
  skill.loadContent([{ id: '/skill/fishing', experiencePerLevel: [0, 100, 200] }]);
  const output = new SkillExperienceOutput(skill);

  // Act
  output.gain({
    type: '/skill/experience',
    skill: '/skill/fishing',
    amount: 100,
  });

  const fishingExperience = skill.getExperience('/skill/fishing');

  // Assert
  expect(output.canGain()).toBe(true);
  expect(fishingExperience).toBe(100);
});
