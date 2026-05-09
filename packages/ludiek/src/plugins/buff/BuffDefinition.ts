import { BonusContribution } from '@ludiek/engine/bonus/LudiekModifier';

export interface BuffDefinition {
  id: string;

  /**
   * List of bonuses to apply when this buff is active
   */
  effects: BonusContribution[];
}
