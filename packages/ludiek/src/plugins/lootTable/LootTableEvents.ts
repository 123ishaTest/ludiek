import { LootTableDefinition } from '@ludiek/plugins/lootTable/LootTableDefinition';
import { BaseOutput } from '@ludiek/engine/output/LudiekProducer';

export interface LootTableRolled extends LootTableDefinition {
  result: BaseOutput[];
}
