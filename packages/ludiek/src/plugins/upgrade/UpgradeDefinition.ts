import { BaseInput } from '@ludiek/engine/input/LudiekConsumer';
import { BonusContribution } from '@ludiek/engine/modifier/LudiekModifier';

export interface UpgradeDefinition {
  id: string;

  /**
   * The cost needed to buy this upgrade
   */
  costPerLevel: BaseInput[];

  /**
   * The bonus per level
   */
  bonusPerLevel: BonusContribution[];

  /**
   * Whether we get all bonuses up to the current level or only the current level
   */
  accumulateBonuses: boolean;
}
