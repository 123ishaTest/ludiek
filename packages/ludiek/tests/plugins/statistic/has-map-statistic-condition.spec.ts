import { beforeEach, describe, expect, it } from 'vitest';
import { HasMapStatisticEvaluator } from '@ludiek/plugins/statistic/HasMapStatisticCondition';
import { StatisticDefinition, StatisticPlugin } from '@ludiek/plugins/statistic/StatisticPlugin';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';

const statistic = new StatisticPlugin();
const condition = new HasMapStatisticEvaluator();

const statisticContent: StatisticDefinition[] = [
  { id: '/statistic/money', type: 'scalar' },
  { id: '/statistic/numbers', type: 'map' },
  { id: '/statistic/monsters', type: 'map' },
] as const;

new LudiekEngine({
  plugins: [statistic],
  evaluators: [condition],
});

beforeEach(() => {
  statistic.loadContent(statisticContent);
});

describe('Has Map Statistic Condition', () => {
  it('evaluates to true on statistics we have', () => {
    // Arrange
    statistic.incrementMapStatistic('/statistic/monsters', '/monster/goblin', 3);

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
