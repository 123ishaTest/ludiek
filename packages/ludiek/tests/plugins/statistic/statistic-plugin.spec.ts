import { beforeEach, expect, it } from 'vitest';
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

it('initializes at 0', () => {
  // Act
  const money = statistic.getScalarValue('/statistic/money');
  const number = statistic.getMapValue('/statistic/numbers', 0);
  const monster = statistic.getMapValue('/statistic/monsters', '/monster/zombie');

  // Assert
  expect(money).toBe(0);
  expect(number).toBe(0);
  expect(monster).toBe(0);
});

it('increments with a delta', () => {
  // Act
  statistic.incrementStatistic('/statistic/money', 2);
  statistic.incrementMapStatistic('/statistic/numbers', 0, 3);
  statistic.incrementMapStatistic('/statistic/monsters', '/monster/zombie', 4);

  const money = statistic.getScalarValue('/statistic/money');
  const number = statistic.getMapValue('/statistic/numbers', 0);
  const monster = statistic.getMapValue('/statistic/monsters', '/monster/zombie');

  // Assert
  expect(money).toBe(2);
  expect(number).toBe(3);
  expect(monster).toBe(4);
});

it('increments with a default of 1', () => {
  // Act
  statistic.incrementStatistic('/statistic/money');
  statistic.incrementMapStatistic('/statistic/numbers', 0);
  statistic.incrementMapStatistic('/statistic/monsters', '/monster/zombie');

  const money = statistic.getScalarValue('/statistic/money');
  const number = statistic.getMapValue('/statistic/numbers', 0);
  const monster = statistic.getMapValue('/statistic/monsters', '/monster/zombie');

  // Assert
  expect(money).toBe(1);
  expect(number).toBe(1);
  expect(monster).toBe(1);
});

it('returns map objects', () => {
  // Arrange
  statistic.incrementMapStatistic('/statistic/numbers', 'first', 2);
  statistic.incrementMapStatistic('/statistic/numbers', 'second', 3);

  // Act
  const numbers = statistic.getMap('/statistic/numbers');

  // Assert
  expect(numbers).toEqual({
    first: 2,
    second: 3,
  });
});
