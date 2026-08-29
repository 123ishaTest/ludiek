import { LootTableDefinition } from '@ludiek/plugins/lootTable/LootTableDefinition';
import { BaseMutation } from '@ludiek/engine/mutation/LudiekMutator';

export interface LootTableRolled extends LootTableDefinition {
  result: BaseMutation[];
}
