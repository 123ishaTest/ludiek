import { BonusContribution } from '@ludiek/engine/bonus/LudiekModifier';

export interface KeyItemDefinition {
  id: string;

  /**
   * Optional modifiers when this KeyItem is unlocked
   */
  rewards?: BonusContribution[];
}
