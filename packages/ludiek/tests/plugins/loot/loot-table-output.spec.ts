import { expect, it, vi } from 'vitest';
import { LootTableOutput } from '@ludiek/plugins/lootTable/LootTableOutput';
import { LootTablePlugin } from '@ludiek/plugins/lootTable/LootTablePlugin';

it('Can always gain', () => {
  // Arrange
  const loot = new LootTablePlugin();
  const output = new LootTableOutput(loot);

  // Act
  const canGain = output.canGain();

  // Assert
  expect(canGain).toBe(true);
});

it('Rolls on a lootTable table', () => {
  // Arrange
  const loot = new LootTablePlugin();
  const output = new LootTableOutput(loot);
  const spy = vi.spyOn(loot, 'roll').mockReturnValue([]);

  // Act
  output.gain({
    type: '/output/lootTable-table',
    amount: 3,
    table: '/table/dummy',
  });

  // Assert
  expect(spy).toBeCalledWith('/table/dummy', 3, true);
});
