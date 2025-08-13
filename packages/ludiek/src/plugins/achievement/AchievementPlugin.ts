import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';
import { ISimpleEvent, SimpleEventDispatcher } from 'strongly-typed-events';
import { BaseConditionShape } from '@ludiek/engine/LudiekCondition';

export interface AchievementDetail<AchievementId> {
  id: AchievementId;
  condition: BaseConditionShape[];
}

export class AchievementPlugin<AchievementId extends string> extends LudiekPlugin {
  readonly name = 'achievement';

  private _record: Record<AchievementId, boolean> = {} as Record<AchievementId, boolean>;
  private readonly _achievements: Record<AchievementId, AchievementDetail<AchievementId>>;

  protected _onAchievementGain = new SimpleEventDispatcher<AchievementDetail<AchievementId>>();

  constructor(achievements: AchievementDetail<AchievementId>[]) {
    super();

    this._achievements = Object.fromEntries(achievements.map((a) => [a.id, a]) ?? []) as Record<
      AchievementId,
      AchievementDetail<AchievementId>
    >;
    achievements.forEach((achievement) => {
      this._record[achievement.id] = false;
    });
  }

  /**
   * Loops through all achievements and see if you can earn them
   */
  public checkAchievements(): void {
    Object.keys(this._achievements).forEach((id) => {
      this.tryUnlockAchievement(id as AchievementId);
    });
  }

  /**
   * Unlock the achievement if the condition is met
   */
  public tryUnlockAchievement(id: AchievementId): void {
    console.log(id, this.hasAchievement(id))
    if (this.hasAchievement(id)) {
      return;
    }



    const isMet = this.evaluate(this._achievements[id].condition);
    if (!isMet) {
      return;
    }

    this.earnAchievement(id);
  }

  private earnAchievement(id: AchievementId): void {
    this._record[id] = true;
    this._onAchievementGain.dispatch(this._achievements[id]);
  }

  /**
   * Return whether we have the achievement
   * @param id
   */
  public hasAchievement(id: AchievementId): boolean {
    return this._record[id];
  }

  /**
   * Emitted when an achievement is gained
   */
  public get onAchievementGain(): ISimpleEvent<AchievementDetail<AchievementId>> {
    return this._onAchievementGain.asEvent();
  }
}
