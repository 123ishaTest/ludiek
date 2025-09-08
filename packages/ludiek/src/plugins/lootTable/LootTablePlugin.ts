import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';
import { LootTableDefinition } from '@ludiek/plugins/lootTable/LootTableDefinition';
import { getOneFrom } from '@ludiek/util/probability/weightedDistribution';
import { booleanWithProbability } from '@ludiek/util/probability/random';
import { LootOutcome } from '@ludiek/plugins/lootTable/LootOutcome';
import { BaseOutputShape } from '@ludiek/engine/output/LudiekOutput';
import { LootTableOutput, LootTableOutputShape } from '@ludiek/plugins/lootTable/LootTableOutput';
import { simplifyItems } from '@ludiek/util/equality';
import { ISimpleEvent, SimpleEventDispatcher } from 'strongly-typed-events';

export class LootTablePlugin extends LudiekPlugin {
  readonly name: string = 'lootTable';
  public config = {
    outputs: [new LootTableOutput(this)],
  };

  protected _state = {};

  private _tables: Record<string, LootTableDefinition> = {};

  protected _onRoll = new SimpleEventDispatcher<BaseOutputShape[]>();

  public roll(id: string, amount: number = 1, subTable: boolean = false): BaseOutputShape[] {
    const outcomes: LootOutcome[] = [];

    for (let i = 0; i < amount; i++) {
      outcomes.push(...this.getLoot(id));
    }

    const outputs = outcomes.map((l) => l.output);

    const tableOutputs = outputs.filter(
      (output) => output.type === '/output/lootTable-table',
    ) as LootTableOutputShape[];
    const filteredOutputs = outputs.filter((output) => output.type !== '/output/lootTable-table');

    tableOutputs.forEach((output) => {
      filteredOutputs.push(...this.roll(output.table, output.amount, true));
    });

    const loot = simplifyItems(filteredOutputs);
    if (!subTable) {
      this.gainOutput(loot);
      this._onRoll.dispatch(loot);
    }

    return loot;
  }

  private getLoot(id: string): LootOutcome[] {
    return [...this.calculateAlwaysLoot(id), ...this.calculateOneOfLoot(id), ...this.calculateAnyOfLoot(id)];
  }

  private calculateAlwaysLoot(id: string): LootOutcome[] {
    const always = this._tables[id].always;
    if (!always || always.length === 0) {
      return [];
    }
    return this.filterRequirements(always);
  }

  private calculateOneOfLoot(id: string): LootOutcome[] {
    const oneOf = this._tables[id].oneOf;
    if (!oneOf || oneOf.length === 0) {
      return [];
    }
    const available = this.filterRequirements(oneOf);
    return [getOneFrom(available)];
  }

  private calculateAnyOfLoot(id: string): LootOutcome[] {
    const anyOf = this._tables[id].anyOf;
    if (!anyOf || anyOf.length === 0) {
      return [];
    }
    const available = this.filterRequirements(anyOf);
    const result: LootOutcome[] = [];
    available.forEach((loot) => {
      if (booleanWithProbability(loot.percentage)) {
        result.push(loot);
      }
    });
    return result;
  }

  private filterRequirements<Outcome extends LootOutcome>(outcomes: Outcome[]): Outcome[] {
    return outcomes.filter((outcome) => !outcome.requirements || this.evaluate(outcome.requirements));
  }

  public loadContent(tables: LootTableDefinition[]): void {
    tables.forEach((table) => {
      this._tables[table.id] = table;
    });
  }

  /**
   * Emitted when a table is rolled
   */
  public get onRoll(): ISimpleEvent<BaseOutputShape[]> {
    return this._onRoll.asEvent();
  }
}
