import { UpgradeDefinition } from '@ludiek/plugins/upgrade/UpgradeDefinition';

export interface UpgradeBought extends UpgradeDefinition {
  /**
   * The new level of the upgrade
   */
  level: number;

  /**
   * Whether the upgrade is now at the max level
   */
  isMaxLevel: boolean;
}
