import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';
import { ISimpleEvent, SimpleEventDispatcher } from 'strongly-typed-events';
import { UnknownSkillError } from '@ludiek/plugins/skill/SkillErrors';
import { createSkillState, SkillPluginState } from '@ludiek/plugins/skill/SkillPluginState';
import { SkillDefinition } from '@ludiek/plugins/skill/SkillDefinition';
import { SkillExperience } from '@ludiek/plugins/skill/SkillExperience';
import { progress, Progress } from '@ludiek/util/progress';
import { ExperienceGained, LevelUp } from '@ludiek/plugins/skill/SkillEvents';

export class SkillPlugin extends LudiekPlugin {
  readonly name = 'skill';

  protected _state: SkillPluginState;

  private readonly _skills: Record<string, SkillDefinition> = {};

  private _onLevelUp = new SimpleEventDispatcher<LevelUp>();
  private _onExperienceGained = new SimpleEventDispatcher<ExperienceGained>();

  constructor(state: SkillPluginState = createSkillState()) {
    super();
    this._state = state;
  }

  public loadContent(skills: SkillDefinition[]): void {
    skills.forEach((skill) => {
      this._skills[skill.id] = skill;
      this._state.experience[skill.id] = skill.initialExperience ?? 0;
    });
  }

  public gainExperience(experience: SkillExperience): void {
    const oldLevel = this.getLevel(experience.skill);
    this._state.experience[experience.skill] += experience.amount;
    const newLevel = this.getLevel(experience.skill);

    this._onExperienceGained.dispatch({
      ...this._skills[experience.skill],
      experience: experience.amount,
    });
    if (oldLevel !== newLevel) {
      this._onLevelUp.dispatch({
        ...this._skills[experience.skill],
        level: newLevel,
      });
    }
  }

  /**
   * Return the amount of experience for a skill
   * @param id
   */
  public getExperience(id: string): number {
    this.validate(id);

    return this._state.experience[id];
  }

  /**
   * Return the level for a skill
   * @param id
   */
  public getLevel(id: string): number {
    this.validate(id);

    const skill = this._skills[id];
    const experience = this.getExperience(id);

    // TODO(@Isha): Improve performance?
    const index = skill.experiencePerLevel.findIndex((expNeeded) => {
      return expNeeded > experience;
    });
    if (index === -1) {
      return skill.experiencePerLevel.length - 1;
    }
    return index - 1;
  }

  public getLevelProgress(id: string): Progress {
    const currentLevel = this.getLevel(id);
    return progress(this.getExpThisLevel(id), this.getExpNeededForLevel(id, currentLevel));
  }

  /**
   * Get the amount of exp that we have made in this current level
   * @param id
   */
  public getExpThisLevel(id: string): number {
    const totalExperience = this.getExperience(id);
    const currentLevel = this.getLevel(id);
    const currentLevelExperience = this.getTotalExpNeededForLevel(id, currentLevel);
    return totalExperience - currentLevelExperience;
  }

  /**
   * Get the exp that is needed to move from level to level + 1
   * @param id
   * @param level
   */
  public getExpNeededForLevel(id: string, level: number): number {
    if (level >= this._skills[id].experiencePerLevel.length - 1) {
      return Infinity;
    }
    const currentLevelExperience = this.getTotalExpNeededForLevel(id, level);
    const nextLevelExperience = this.getTotalExpNeededForLevel(id, level + 1);
    return nextLevelExperience - currentLevelExperience;
  }

  /**
   * Get the total exp needed tp reach the provided level
   * @param id the skill to check
   * @param level the target level
   */
  public getTotalExpNeededForLevel(id: string, level: number): number {
    this.validate(id);
    return this._skills[id].experiencePerLevel[level];
  }

  /**
   * Throws an error if the id does not exist
   * @param id
   * @private
   */
  private validate(id: string): void {
    if (!this.supportsSkill(id)) {
      throw new UnknownSkillError(`Unknown skill with id '${id}'`);
    }
  }

  /**
   * Whether the plugin supports this type of skill
   * @param id
   */
  public supportsSkill(id: string): boolean {
    return this._skills[id] != undefined;
  }

  public getSkill(id: string): SkillDefinition {
    return this._skills[id];
  }

  /**
   * Emitted when experience is gained
   */
  public get onExperienceGained(): ISimpleEvent<ExperienceGained> {
    return this._onExperienceGained.asEvent();
  }

  /**
   * Emitted when a skill is leveled up
   */
  public get onLevelUp(): ISimpleEvent<LevelUp> {
    return this._onLevelUp.asEvent();
  }
}
