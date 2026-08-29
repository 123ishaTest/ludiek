import { z } from 'zod';
import { LudiekMutator } from '@ludiek/engine/mutation/LudiekMutator';
import { LootTablePlugin } from '@ludiek/plugins/lootTable/LootTablePlugin';

export const RollLootTableOutputSchema = z.strictObject({
  type: z.literal('/mutation/roll-loot-table'),
  table: z.string(),
  amount: z.number().positive(),
});

export type RollLootTableOutput = z.infer<typeof RollLootTableOutputSchema>;

type Dependencies = {
  plugins: [LootTablePlugin];
};

export class RollLootTableProducer extends LudiekMutator<RollLootTableOutput, Dependencies> {
  readonly schema = RollLootTableOutputSchema;

  // TODO(@Isha): How should we calculate this?
  //  Leave it up to the caller to know what lootTable table has which restrictions?
  canApply(): boolean {
    return true;
  }

  apply(output: RollLootTableOutput): void {
    this.engine.plugins.lootTable.roll(output.table, output.amount, true);
  }
}
