import { BaseMutation } from '@ludiek/engine/mutation/LudiekMutator';
import { BaseCondition } from '@ludiek/engine/condition/LudiekEvaluator';

export interface LootOutcome {
  output: BaseMutation;
  requirements?: BaseCondition | BaseCondition[];
}

export type AlwaysLootOutcome = LootOutcome;

export interface WeightedLootOutcome extends LootOutcome {
  weight: number;
}

export interface RandomLootOutcome extends LootOutcome {
  percentage: number;
}
