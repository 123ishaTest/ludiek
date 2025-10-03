import { LootTablePlugin } from '@ludiek/plugins/lootTable/LootTablePlugin';
import { beforeEach, expect, it, vi } from 'vitest';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { LootTableDefinition } from '@ludiek/plugins/lootTable/LootTableDefinition';
import { BaseOutput } from '@ludiek/engine/output/LudiekProducer';

const engine = new LudiekEngine({});
const gainOutputSpy = vi.spyOn(engine, 'gainOutput').mockReturnValue();

const lootTable = new LootTablePlugin();
lootTable.inject(engine);

beforeEach(() => {
  lootTable.loadContent([]);
  vi.clearAllMocks();
});

it('rolls nothing on an empty table', () => {
  // Arrange
  lootTable.loadContent([{ id: '/table/empty' }]);

  // Act
  const result = lootTable.roll('/table/empty', 100);

  // Assert
  expect(result).toHaveLength(0);
});

it('rolls for always lootTable', () => {
  // Arrange
  const lootTables = [
    {
      id: '/table/basic',
      always: [{ output: { type: '/output/currency', id: '/currency/money', amount: 10 } }],
    },
  ];
  lootTable.loadContent(lootTables);

  // Act
  const result = lootTable.roll('/table/basic');

  // Assert
  expect(result).toHaveLength(1);
  expect(result).toEqual([
    {
      amount: 10,
      id: '/currency/money',
      type: '/output/currency',
    },
  ]);
});

it('rolls for oneof lootTable', () => {
  // Arrange
  const lootTables = [
    {
      id: '/table/basic',
      oneOf: [
        { output: { type: '/output/1', amount: 1 }, weight: 1 },
        { output: { type: '/output/2', amount: 1 }, weight: 1 },
      ],
    },
  ];
  lootTable.loadContent(lootTables);

  for (let i = 0; i < 1000; i++) {
    // Act
    const result = lootTable.roll('/table/basic');

    // Assert
    expect(result).toHaveLength(1);
    expect(['/output/1', '/output/2']).toContain(result[0].type);
  }
});

it('rolls for anyof lootTable', () => {
  // Arrange
  const lootTables = [
    {
      id: '/table/basic',
      anyOf: [
        { output: { type: '/output/1', amount: 1 }, percentage: 1 },
        { output: { type: '/output/2', amount: 1 }, percentage: 1 },
      ],
    },
  ];
  lootTable.loadContent(lootTables);

  // Act
  const result = lootTable.roll('/table/basic', 3);

  // Assert
  expect(result).toHaveLength(2);
  expect(result).toEqual([
    { type: '/output/1', amount: 3 },
    { type: '/output/2', amount: 3 },
  ]);
});

it('filters out requirements', () => {
  // Arrange
  const lootTables = [
    {
      id: '/table/basic',
      anyOf: [
        {
          output: { type: '/output/1', amount: 1 },
          percentage: 1,
          requirements: [{ type: '/condition/always-false' }],
        },
        { output: { type: '/output/2', amount: 1 }, percentage: 1 },
      ],
    },
  ];
  lootTable.loadContent(lootTables);
  vi.spyOn(engine, 'evaluate').mockReturnValue(false);

  // Act
  const result = lootTable.roll('/table/basic', 100);

  // Assert
  expect(result).toHaveLength(1);
  expect(result).toEqual([{ type: '/output/2', amount: 100 }]);
});

it('supports recursion', () => {
  // Arrange
  const subTableA = {
    id: '/table/sub-a',
    always: [{ output: { type: '/output/a', amount: 1 } }],
  } satisfies LootTableDefinition;

  const subTableB = {
    id: '/table/sub-b',
    always: [{ output: { type: '/output/b', amount: 2 } }],
  } satisfies LootTableDefinition;

  const mainTable = {
    id: '/table/main',
    always: [
      { output: { type: '/output/lootTable-table', table: '/table/sub-a', amount: 1 } },
      { output: { type: '/output/lootTable-table', table: '/table/sub-b', amount: 2 } },
    ],
  };
  lootTable.loadContent([subTableA, subTableB, mainTable]);

  // Act
  const result = lootTable.roll('/table/main', 2);

  // Assert
  expect(gainOutputSpy).toHaveBeenCalledOnce();
  expect(result).toHaveLength(2);
  expect(result[0]).toEqual({
    type: '/output/a',
    amount: 2,
  });
  expect(result[1]).toEqual({
    type: '/output/b',
    amount: 8,
  });
});

it('supports deep recursion', () => {
  // Arrange
  const subTableA = {
    id: '/table/sub-a',
    always: [{ output: { type: '/output/lootTable-table', table: '/table/sub-b', amount: 1 } }],
  };

  const subTableB = {
    id: '/table/sub-b',
    always: [{ output: { type: '/output/lootTable-table', table: '/table/sub-c', amount: 1 } }],
  };

  const subTableC = {
    id: '/table/sub-c',
    always: [{ output: { type: '/output/lootTable-table', table: '/table/sub-d', amount: 1 } }],
  };

  const subTableD = {
    id: '/table/sub-d',
    always: [{ output: { type: '/output/d', amount: 1 } }],
  } satisfies LootTableDefinition;
  lootTable.loadContent([subTableA, subTableB, subTableC, subTableD]);

  // Act
  const result = lootTable.roll('/table/sub-a');

  // Assert
  const expectedOutput = {
    type: '/output/d',
    amount: 1,
  };

  expect(gainOutputSpy).toHaveBeenCalledOnce();
  expect(gainOutputSpy).toHaveBeenCalledWith([expectedOutput]);
  expect(result).toHaveLength(1);

  expect(result[0]).toEqual(expectedOutput);
});

it('sends events on rolls', () => {
  // Arrange
  expect.assertions(2);
  const mainTable = {
    id: '/table/main',
    always: [{ output: { type: '/output/lootTable-table', table: '/table/sub', amount: 3 } }],
  };

  const subTable = {
    id: '/table/sub',
    always: [{ output: { type: '/output/demo', amount: 2 } }],
  };
  lootTable.loadContent([mainTable, subTable]);
  const unsub = lootTable.onRoll.subscribe((loot: BaseOutput[]) => {
    expect(loot).toHaveLength(1);
    expect(loot[0]).toEqual({
      type: '/output/demo',
      amount: 6,
    });
  });

  // Act
  lootTable.roll('/table/main');

  // After
  unsub();
});

it('returns nothing on empty tables', () => {
  // Arrange
  lootTable.loadContent([
    {
      id: '/table/empty',
      always: [],
      oneOf: [],
      anyOf: [],
    },
  ]);

  // Act
  const result = lootTable.roll('/table/empty');

  // Assert
  expect(result).toHaveLength(0);
});
