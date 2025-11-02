import { SkillDefinition } from '@ludiek/plugins/skill/SkillDefinition';

export interface LevelUp extends SkillDefinition {
  level: number;
}

export interface ExperienceGained extends SkillDefinition {
  experience: number;
}
