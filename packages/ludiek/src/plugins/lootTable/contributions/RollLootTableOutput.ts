import { z } from 'zod';
import { LudiekProducer } from '@ludiek/engine/output/LudiekProducer';
import { LootTablePlugin } from '@ludiek/plugins/lootTable/LootTablePlugin';

export const RollLootTableOutputSchema = z.strictObject({
  type: z.literal('/output/roll-loot-table'),
  table: z.string(),
  amount: z.number().positive(),
});

export type RollLootTableOutput = z.infer<typeof RollLootTableOutputSchema>;

type Dependencies = {
  plugins: [LootTablePlugin];
};

export class RollLootTableProducer extends LudiekProducer<RollLootTableOutput, Dependencies> {
  readonly schema = RollLootTableOutputSchema;

  // TODO(@Isha): How should we calculate this?
  //  Leave it up to the caller to know what lootTable table has which restrictions?
  canProduce(): boolean {
    return true;
  }

  produce(output: RollLootTableOutput): void {
    this.engine.plugins.lootTable.roll(output.table, output.amount, true);
  }
}
