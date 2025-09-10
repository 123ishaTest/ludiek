import { beforeEach, describe, expect, it } from 'vitest';
import { HasMapStatisticCondition } from '@ludiek/plugins/statistic/HasMapStatisticCondition';
import { StatisticDefinition, StatisticPlugin } from '@ludiek/plugins/statistic/StatisticPlugin';

const statistic = new StatisticPlugin();
const statisticContent: StatisticDefinition[] = [
  { id: '/statistic/money', type: 'scalar' },
  { id: '/statistic/numbers', type: 'map' },
  { id: '/statistic/monsters', type: 'map' },
] as const;

beforeEach(() => {
  statistic.loadContent(statisticContent);
});

describe('Has Map Statistic Condition', () => {
  it('evaluates to true on statistics we have', () => {
    // Arrange
    statistic.incrementMapStatistic('/statistic/monsters', '/monster/goblin', 3);
    const condition = new HasMapStatisticCondition(statistic);

    // Act
    const has3Goblins = condition.evaluate({
      type: '/condition/has-map-statistic',
      id: '/statistic/monsters',
      key: '/monster/goblin',
      amount: 3,
    });
    const has4Goblins = condition.evaluate({
      type: '/condition/has-map-statistic',
      id: '/statistic/monsters',
      key: '/monster/goblin',
      amount: 4,
    });

    // Assert
    expect(has3Goblins).toBe(true);
    expect(has4Goblins).toBe(false);
  });
});
