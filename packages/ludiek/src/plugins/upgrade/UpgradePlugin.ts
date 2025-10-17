import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';
import { UpgradeDefinition } from '@ludiek/plugins/upgrade/UpgradeDefinition';
import { createUpgradeState, UpgradePluginState } from '@ludiek/plugins/upgrade/UpgradePluginState';
import { BonusContribution } from '@ludiek/engine/modifier/LudiekModifier';
import { UnknownLevelMismatchError, UnknownUpgradeError } from '@ludiek/plugins/upgrade/UpgradeErrors';
import { BaseInput } from '@ludiek/engine/input/LudiekConsumer';
import { ISimpleEvent, SimpleEventDispatcher } from 'strongly-typed-events';
import { UpgradeBought } from '@ludiek/plugins/upgrade/UpgradeEvents';

export class UpgradePlugin extends LudiekPlugin {
  readonly name = 'upgrade';
  protected _state: UpgradePluginState;

  private readonly _upgrades: Record<string, UpgradeDefinition> = {};

  constructor(state: UpgradePluginState = createUpgradeState()) {
    super();
    this._state = state;
  }

  public loadContent(content: UpgradeDefinition[]) {
    content.forEach((upgrade) => {
      if (upgrade.costPerLevel.length != upgrade.bonusPerLevel.length) {
        throw new UnknownLevelMismatchError(
          `Upgrade '${upgrade.id}' is defined with ${upgrade.costPerLevel.length} costs and ${upgrade.bonusPerLevel.length} bonuses. These should match`,
        );
      }
      this._upgrades[upgrade.id] = upgrade;
      this._state.levels[upgrade.id] = 0;
    });
  }

  /**
   * Attempt to buy an upgrade and return whether it succeeded
   * @param id
   */
  public buyUpgrade(id: string): boolean {
    this.validate(id);

    if (!this.canBuyUpgrade(id)) {
      return false;
    }

    const cost = this.getCost(id);
    this.consume(cost);

    this._state.levels[id]++;
    this._onUpgradeBought.dispatch({
      ...this.getUpgrade(id),
      level: this.getLevel(id),
      isMaxLevel: this.isMaxLevel(id),
    });
    return true;
  }

  public canBuyUpgrade(id: string) {
    this.validate(id);
    if (this.isMaxLevel(id)) {
      return false;
    }
    const cost = this.getCost(id);
    return this.canConsume(cost);
  }

  /**
   * Get the max level of an upgrade
   * @param id
   */
  public getMaxLevel(id: string): number {
    this.validate(id);
    return this._upgrades[id].costPerLevel.length;
  }

  /**
   * Whether this upgrade is at max level
   * @param id
   */
  public isMaxLevel(id: string): boolean {
    this.validate(id);
    return this.getLevel(id) === this.getMaxLevel(id);
  }

  /**
   * Get the cost for upgrading this upgrade to the next level
   * @param id
   */
  public getCost(id: string): BaseInput {
    this.validate(id);
    const level = this.getLevel(id);
    return this._upgrades[id].costPerLevel[level];
  }

  /**
   * Get the current level of the upgrade
   */
  public getLevel(id: string): number {
    this.validate(id);
    return this._state.levels[id];
  }

  /**
   * Throws an error if the id does not exist
   * @param id
   * @private
   */
  private validate(id: string): void {
    if (!this.supportsUpgrade(id)) {
      throw new UnknownUpgradeError(`Unknown upgrade with id '${id}'`);
    }
  }

  public getUpgrade(id: string): UpgradeDefinition {
    this.validate(id);
    return this._upgrades[id];
  }

  /**
   * Whether the plugin supports this type of upgrade
   * @param id
   */
  public supportsUpgrade(id: string): boolean {
    return this._upgrades[id] != undefined;
  }

  public getBonuses(): BonusContribution[] {
    return this.upgradeList.flatMap((upgrade) => {
      const level = this.getLevel(upgrade.id);
      if (level === 0) {
        return [];
      }
      if (upgrade.accumulateBonuses) {
        return upgrade.bonusPerLevel.slice(0, level);
      } else {
        return upgrade.bonusPerLevel[level - 1];
      }
    });
  }

  public get upgradeList(): UpgradeDefinition[] {
    return Object.values(this._upgrades);
  }

  // Events
  protected _onUpgradeBought = new SimpleEventDispatcher<UpgradeBought>();

  /**
   * Emitted when an upgrade is bought
   */
  public get onUpgradeBought(): ISimpleEvent<UpgradeBought> {
    return this._onUpgradeBought.asEvent();
  }
}
