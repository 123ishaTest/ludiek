import { BonusContribution } from '@ludiek/engine/modifier/LudiekModifier';

export interface BuffDefinition {
  id: string;

  /**
   * List of bonuses to apply when this buff is active
   */
  effects: BonusContribution[];
}
