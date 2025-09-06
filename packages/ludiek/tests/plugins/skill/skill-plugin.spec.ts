import { beforeEach, expect, it } from 'vitest';
import { SkillPlugin } from '@ludiek/plugins/skill/SkillPlugin';
import { SkillDefinition } from '@ludiek/plugins/skill/SkillDefinition';
import { UnknownSkillError } from '@ludiek/plugins/skill/SkillErrors';

const skill = new SkillPlugin();
const skillContent = [
  {
    id: '/skill/fishing',
    experiencePerLevel: [0, 10, 20],
  },
  {
    id: '/skill/mining',
    experiencePerLevel: [0, 100, 200],
    initialExperience: 100,
  },
] satisfies SkillDefinition[];

beforeEach(() => {
  skill.loadContent(skillContent);
});

it('initializes at 0 or initialExperience', () => {
  // Act
  const fishing = skill.getExperience('/skill/fishing');
  const mining = skill.getExperience('/skill/mining');

  // Assert
  expect(fishing).toBe(0);
  expect(mining).toBe(100);
});

it('calculates level', () => {
  // Act
  const fishingLevel = skill.getLevel('/skill/fishing');
  const miningLevel = skill.getLevel('/skill/mining');

  // Assert
  expect(fishingLevel).toBe(0);
  expect(miningLevel).toBe(1);
});

it('handles going over max level level', () => {
  // Arrange
  skill.gainExperience({ skill: '/skill/fishing', amount: 1000 });

  // Act
  const fishingLevel = skill.getLevel('/skill/fishing');

  // Assert
  expect(fishingLevel).toBe(2);
});

it('gains experience', () => {
  // Act
  skill.gainExperience({ skill: '/skill/fishing', amount: 10 });
  const fishing = skill.getExperience('/skill/fishing');

  // Assert
  expect(fishing).toBe(10);
});

it('gets total xp needed', () => {
  // Act
  const fishing1 = skill.getTotalExpNeededForLevel('/skill/fishing', 1);
  const fishing2 = skill.getTotalExpNeededForLevel('/skill/fishing', 2);
  const mining1 = skill.getTotalExpNeededForLevel('/skill/mining', 1);

  // Assert
  expect(fishing1).toBe(10);
  expect(fishing2).toBe(20);
  expect(mining1).toBe(100);
});

it('checks support for skills', () => {
  // Act
  const hasFishing = skill.supportsSkill('/skill/fishing');
  const hasWrong = skill.supportsSkill('wrong');

  // Assert
  expect(hasFishing).toBe(true);
  expect(hasWrong).toBe(false);
});

it('throws an error when accessing an invalid skill ', () => {
  expect(() => {
    skill.getLevel('unknown');
  }).toThrow(UnknownSkillError);
});

it('sends events on experience gain', () => {
  // Arrange
  expect.assertions(2);

  const unsub = skill.onLevelUp.subscribe((skill, level) => {
    expect(skill.id).toBe('/skill/fishing');
    expect(level).toBe(2);
  });

  // Act
  skill.gainExperience({ skill: '/skill/fishing', amount: 20 });

  // After
  unsub();
});
