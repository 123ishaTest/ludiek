import { BaseCondition } from '@ludiek/engine/condition/LudiekEvaluator';

export interface AchievementDefinition {
  id: string;
  /**
   * Optional condition to automatically unlock.
   * If left empty it can only be unlocked manually
   */
  condition?: BaseCondition;
}
