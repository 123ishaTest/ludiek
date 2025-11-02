import { BonusContribution } from '@ludiek/engine/modifier/LudiekModifier';

export interface KeyItemDefinition {
  id: string;

  /**
   * Optional modifiers when this KeyItem is unlocked
   */
  rewards?: Omit<BonusContribution, 'source'>[];
}
