import { BaseOutputShape, LudiekOutput } from '@ludiek/engine/output/LudiekOutput';
import { LootTablePlugin } from '@ludiek/plugins/lootTable/LootTablePlugin';

export interface LootTableOutputShape extends BaseOutputShape {
  type: '/output/loot-table';
  table: string;
  amount: number;
}

export class LootTableOutput extends LudiekOutput<LootTableOutputShape> {
  readonly type = '/output/loot-table';

  private _loot: LootTablePlugin;

  constructor(loot: LootTablePlugin) {
    super();
    this._loot = loot;
  }

  // TODO(@Isha): How should we calculate this?
  //  Leave it up to the caller to know what lootTable table has which restrictions?
  canGain(): boolean {
    return true;
  }

  gain(output: LootTableOutputShape): void {
    this._loot.roll(output.table, output.amount, true);
  }
}
