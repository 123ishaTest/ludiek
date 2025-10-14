import { LudiekBonusContribution, LudiekModifier } from '@ludiek/engine/modifier/LudiekModifier';

export interface BuffDefinition {
  id: string;

  /**
   * List of bonuses to apply when this buff is active
   */
  effects: LudiekBonusContribution<LudiekModifier[]>[];
}
