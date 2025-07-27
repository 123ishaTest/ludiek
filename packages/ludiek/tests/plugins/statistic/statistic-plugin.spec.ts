import { beforeEach, expect, it } from 'vitest';
import { StatisticPlugin } from '@ludiek/plugins/statistic/StatisticPlugin';

const statisticContent = {
  scalar: [{ id: 'money' }],
  map: [{ id: 'monsters' }, { id: 'numbers' }],
} as const;

let statistic = new StatisticPlugin(statisticContent);
beforeEach(() => {
  statistic = new StatisticPlugin(statisticContent);
});

it('initializes at 0', () => {
  // Act
  const scalar = statistic.getStatistic('money');
  const list = statistic.getStatistic('numbers', 0);
  const map = statistic.getStatistic('monsters', 'zombie');

  // Assert
  expect(scalar).toBe(0);
  expect(list).toBe(0);
  expect(map).toBe(0);
});
