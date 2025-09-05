import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';
import { EventDispatcher, IEvent } from 'strongly-typed-events';
import { UnknownSkillError } from '@ludiek/plugins/skill/SkillErrors';
import { createSkillState, SkillPluginState } from '@ludiek/plugins/skill/SkillPluginState';
import { SkillDefinition } from '@ludiek/plugins/skill/SkillDefinition';
import { SkillExperience } from '@ludiek/plugins/skill/SkillExperience';
import { SkillExperienceOutput } from '@ludiek/plugins/skill/SkillExperienceOutput';
import { HasSkillLevelCondition } from '@ludiek/plugins/skill/HasSkillLevelCondition';
import { HasSkillExperienceCondition } from '@ludiek/plugins/skill/HasSkillExperienceCondition';

export class SkillPlugin extends LudiekPlugin {
  readonly name = 'skill';
  public readonly config = {
    conditions: [new HasSkillExperienceCondition(this), new HasSkillLevelCondition(this)],
    outputs: [new SkillExperienceOutput(this)],
  };

  protected _state: SkillPluginState;

  private readonly _skills: Record<string, SkillDefinition> = {};

  protected _onLevelUp = new EventDispatcher<SkillDefinition, number>();

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
    if (oldLevel !== newLevel) {
      this._onLevelUp.dispatch(this._skills[experience.skill], newLevel);
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

  /**
   * Emitted when a skill is leveled up
   */
  public get onLevelUp(): IEvent<SkillDefinition, number> {
    return this._onLevelUp.asEvent();
  }
}
