import { BaseOutputShape } from '@ludiek/engine/output/LudiekOutput';
import { BaseConditionShape } from '@ludiek/engine/condition/LudiekCondition';

export interface LootOutcome {
  output: BaseOutputShape;
  requirements?: BaseConditionShape | BaseConditionShape[];
}

export type AlwaysLootOutcome = LootOutcome;

export interface WeightedLootOutcome extends LootOutcome {
  weight: number;
}

export interface RandomLootOutcome extends LootOutcome {
  percentage: number;
}
