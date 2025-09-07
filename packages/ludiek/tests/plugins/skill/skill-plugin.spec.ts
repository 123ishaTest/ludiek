import { beforeEach, expect, it } from 'vitest';
import { SkillPlugin } from '@ludiek/plugins/skill/SkillPlugin';
import { SkillDefinition } from '@ludiek/plugins/skill/SkillDefinition';
import { UnknownSkillError } from '@ludiek/plugins/skill/SkillErrors';

const skill = new SkillPlugin();
const skillContent = [
  {
    id: '/skill/fishing',
    experiencePerLevel: [0, 10, 30],
  },
  {
    id: '/skill/mining',
    experiencePerLevel: [0, 100, 300],
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

it('gets total exp needed', () => {
  // Act
  const fishing1 = skill.getTotalExpNeededForLevel('/skill/fishing', 1);
  const fishing2 = skill.getTotalExpNeededForLevel('/skill/fishing', 2);
  const mining1 = skill.getTotalExpNeededForLevel('/skill/mining', 1);

  // Assert
  expect(fishing1).toBe(10);
  expect(fishing2).toBe(30);
  expect(mining1).toBe(100);
});

it('calculates exp needed per level', () => {
  // Act
  const fishing1 = skill.getExpNeededForLevel('/skill/fishing', 1);
  const fishing2 = skill.getExpNeededForLevel('/skill/fishing', 2);
  const mining1 = skill.getExpNeededForLevel('/skill/mining', 1);

  // Assert
  expect(fishing1).toBe(20);
  expect(fishing2).toBe(Infinity);
  expect(mining1).toBe(200);
});

it('calculates exp progress', () => {
  // Arrange
  skill.gainExperience({ skill: '/skill/fishing', amount: 25 });

  // Act
  const fishingExp = skill.getExpThisLevel('/skill/fishing');

  // Assert
  expect(fishingExp).toBe(15);
});

it('calculates level progress', () => {
  // Arrange
  skill.gainExperience({ skill: '/skill/mining', amount: 50 }); // With initial 100 brings us to 150

  // Act
  const miningProgress = skill.getLevelProgress('/skill/mining');

  // Assert
  expect(miningProgress.current).toBe(50);
  expect(miningProgress.target).toBe(200);
  expect(miningProgress.percentage).toBe(0.25);
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

  const unsub = skill.onExperienceGained.subscribe((skill, experience) => {
    expect(skill.id).toBe('/skill/fishing');
    expect(experience).toBe(20);
  });

  // Act
  skill.gainExperience({ skill: '/skill/fishing', amount: 20 });

  // After
  unsub();
});

it('sends events on level up', () => {
  // Arrange
  expect.assertions(2);

  const unsub = skill.onLevelUp.subscribe((skill, level) => {
    expect(skill.id).toBe('/skill/fishing');
    expect(level).toBe(1);
  });

  // Act
  skill.gainExperience({ skill: '/skill/fishing', amount: 20 });

  // After
  unsub();
});
