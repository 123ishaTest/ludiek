import { BaseOutput, LudiekProducer } from '@ludiek/engine/output/LudiekProducer';
import { LootTablePlugin } from '@ludiek/plugins/lootTable/LootTablePlugin';

export interface LootTableOutput extends BaseOutput {
  type: '/output/loot-table';
  table: string;
  amount: number;
}

type Dependencies = {
  plugins: [LootTablePlugin];
};

export class LootTableProducer extends LudiekProducer<LootTableOutput, Dependencies> {
  readonly type = '/output/loot-table';

  // TODO(@Isha): How should we calculate this?
  //  Leave it up to the caller to know what lootTable table has which restrictions?
  canProduce(): boolean {
    return true;
  }

  produce(output: LootTableOutput): void {
    this.engine.plugins.lootTable.roll(output.table, output.amount, true);
  }
}
