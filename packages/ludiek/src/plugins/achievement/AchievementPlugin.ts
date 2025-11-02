import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';
import { ISimpleEvent, SimpleEventDispatcher } from 'strongly-typed-events';
import { UnknownAchievementError } from '@ludiek/plugins/achievement/AchievementErrors';
import { AchievementPluginState, createAchievementState } from '@ludiek/plugins/achievement/AchievementPluginState';
import { AchievementDefinition } from '@ludiek/plugins/achievement/AchievementDefinition';
import { AchievementEarned } from '@ludiek/plugins/achievement/AchievementEvents';

export class AchievementPlugin extends LudiekPlugin {
  readonly name = 'achievement';
  protected _state: AchievementPluginState;

  private readonly _achievements: Record<string, AchievementDefinition> = {};

  constructor(state: AchievementPluginState = createAchievementState()) {
    super();
    this._state = state;
  }

  public loadContent(achievements: AchievementDefinition[]): void {
    achievements.forEach((achievement) => {
      this._achievements[achievement.id] = achievement;
      this._state.record[achievement.id] = false;
    });
  }

  /**
   * Loops through all achievements and see if you can earn them
   */
  public checkAchievements(): void {
    Object.keys(this._achievements).forEach((id) => {
      this.tryEarnAchievement(id as string);
    });
  }

  /**
   * Unlock the achievement if the condition is met
   */
  public tryEarnAchievement(id: string): void {
    this.validate(id);

    if (this.hasAchievement(id)) {
      return;
    }

    if (this._achievements[id].condition == null) {
      return;
    }

    const isMet = this.evaluate(this._achievements[id].condition);
    if (!isMet) {
      return;
    }

    this.earnAchievement(id);
  }

  /**
   * Earns the achievement, this bypasses any potential requirements
   * @param id
   */
  public earnAchievement(id: string): void {
    this.validate(id);

    if (this.hasAchievement(id)) {
      return;
    }

    this._state.record[id] = true;
    this._onAchievementEarn.dispatch(this._achievements[id]);
  }

  /**
   * Return whether we have earned the achievement
   * @param id
   */
  public hasAchievement(id: string): boolean {
    this.validate(id);

    return this._state.record[id];
  }

  /**
   * Get an AchievementDefinition
   * @param id
   */
  public getAchievement(id: string): AchievementDefinition {
    this.validate(id);
    return this._achievements[id];
  }

  /**
   * Throws an error if the id does not exist
   * @param id
   * @private
   */
  private validate(id: string): void {
    if (!this.supportsAchievement(id)) {
      throw new UnknownAchievementError(`Unknown achievement with id '${id}'`);
    }
  }

  /**
   * Whether the plugin supports this type of achievement
   * @param id
   */
  public supportsAchievement(id: string): boolean {
    return this._achievements[id] != undefined;
  }

  // Events
  protected _onAchievementEarn = new SimpleEventDispatcher<AchievementEarned>();

  /**
   * Emitted when an achievement is earned
   */
  public get onAchievementEarn(): ISimpleEvent<AchievementEarned> {
    return this._onAchievementEarn.asEvent();
  }
}
