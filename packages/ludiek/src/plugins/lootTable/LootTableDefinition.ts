import { AlwaysLootOutcome, RandomLootOutcome, WeightedLootOutcome } from '@ludiek/plugins/lootTable/LootOutcome';

export interface LootTableDefinition {
  id: string;

  always?: AlwaysLootOutcome[];
  oneOf?: WeightedLootOutcome[];
  anyOf?: RandomLootOutcome[];
}
