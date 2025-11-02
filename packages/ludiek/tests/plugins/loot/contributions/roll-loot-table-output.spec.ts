import { expect, it, vi } from 'vitest';
import { RollLootTableProducer } from '@ludiek/plugins/lootTable/contributions/RollLootTableOutput';
import { LootTablePlugin } from '@ludiek/plugins/lootTable/LootTablePlugin';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';

const loot = new LootTablePlugin();
const output = new RollLootTableProducer();

new LudiekEngine({
  plugins: [loot],
  producers: [output],
});

it('Can always gain', () => {
  // Act
  const canProduce = output.canProduce();

  // Assert
  expect(canProduce).toBe(true);
});

it('Rolls on a lootTable table', () => {
  // Arrange
  const spy = vi.spyOn(loot, 'roll').mockReturnValue([]);

  // Act
  output.produce({
    type: '/output/roll-loot-table',
    amount: 3,
    table: '/table/dummy',
  });

  // Assert
  expect(spy).toBeCalledWith('/table/dummy', 3, true);
});
