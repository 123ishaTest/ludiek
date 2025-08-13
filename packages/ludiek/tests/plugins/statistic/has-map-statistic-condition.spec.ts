import { describe, expect, it } from 'vitest';
import { HasMapStatisticCondition } from '@ludiek/plugins/statistic/evaluators/HasMapStatisticCondition';
import { StatisticPlugin } from '@ludiek/plugins/statistic/StatisticPlugin';

const statisticContent = [{ id: 'monsters', type: 'map' }] as const;

describe('Has Map Statistic Condition', () => {
  it('evaluates to true on statistics we have', () => {
    // Arrange
    const statistic = new StatisticPlugin(statisticContent);
    statistic.incrementMapStatistic('monsters', 'goblin', 3);
    const condition = new HasMapStatisticCondition(statistic);

    // Act
    const has3Goblins = condition.evaluate({
      type: 'has-map-statistic',
      id: 'monsters',
      key: 'goblin',
      amount: 3,
    });
    const has4Goblins = condition.evaluate({
      type: 'has-map-statistic',
      id: 'monsters',
      key: 'goblin',
      amount: 4,
    });

    // Assert
    expect(has3Goblins).toBe(true);
    expect(has4Goblins).toBe(false);
  });
});
