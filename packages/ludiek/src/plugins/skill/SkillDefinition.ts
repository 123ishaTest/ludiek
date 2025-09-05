export interface SkillDefinition {
  id: string;

  /**
   * How much is experience is needed per level.
   * The index is the level, starting at 0
   * The skills max level is inferred from the length
   */
  experiencePerLevel: number[];

  /**
   * The experience
   */
  initialExperience?: number;
}
