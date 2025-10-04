import { expect, it } from 'vitest';
import { SkillPlugin } from '@ludiek/plugins/skill/SkillPlugin';
import { SkillExperienceProducer } from '@ludiek/plugins/skill/SkillExperienceOutput';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';

const skill = new SkillPlugin();
const output = new SkillExperienceProducer();

new LudiekEngine({
  plugins: [skill],
  producers: [output],
});

it('gains experience', () => {
  // Arrange
  skill.loadContent([{ id: '/skill/fishing', experiencePerLevel: [0, 100, 200] }]);

  // Act
  output.produce({
    type: '/skill/experience',
    skill: '/skill/fishing',
    amount: 100,
  });

  const fishingExperience = skill.getExperience('/skill/fishing');

  // Assert
  expect(output.canProduce()).toBe(true);
  expect(fishingExperience).toBe(100);
});
