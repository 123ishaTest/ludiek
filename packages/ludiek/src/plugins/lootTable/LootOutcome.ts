import { BaseOutput } from '@ludiek/engine/output/LudiekProducer';
import { BaseCondition } from '@ludiek/engine/condition/LudiekEvaluator';

export interface LootOutcome {
  output: BaseOutput;
  requirements?: BaseCondition | BaseCondition[];
}

export type AlwaysLootOutcome = LootOutcome;

export interface WeightedLootOutcome extends LootOutcome {
  weight: number;
}

export interface RandomLootOutcome extends LootOutcome {
  percentage: number;
}
