import { BaseOutput, LudiekProducer } from '@ludiek/engine/output/LudiekProducer';
import { LootTablePlugin } from '@ludiek/plugins/lootTable/LootTablePlugin';

export interface RollLootTableOutput extends BaseOutput {
  type: '/output/roll-loot-table';
  table: string;
  amount: number;
}

type Dependencies = {
  plugins: [LootTablePlugin];
};

export class RollLootTableProducer extends LudiekProducer<RollLootTableOutput, Dependencies> {
  readonly type = '/output/roll-loot-table';

  // TODO(@Isha): How should we calculate this?
  //  Leave it up to the caller to know what lootTable table has which restrictions?
  canProduce(): boolean {
    return true;
  }

  produce(output: RollLootTableOutput): void {
    this.engine.plugins.lootTable.roll(output.table, output.amount, true);
  }
}
