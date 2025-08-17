import { beforeEach, describe, expect, it } from 'vitest';
import { HasMapStatisticCondition } from '@ludiek/plugins/statistic/evaluators/HasMapStatisticCondition';
import { StatisticDefinition, StatisticPlugin } from '@ludiek/plugins/statistic/StatisticPlugin';

const statistic = new StatisticPlugin();
const statisticContent: StatisticDefinition[] = [
  { id: 'money', type: 'scalar' },
  { id: 'numbers', type: 'map' },
  { id: 'monsters', type: 'map' },
] as const;

beforeEach(() => {
  statistic.loadContent(statisticContent);
});

describe('Has Map Statistic Condition', () => {
  it('evaluates to true on statistics we have', () => {
    // Arrange
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
