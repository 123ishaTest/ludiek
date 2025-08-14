import { beforeEach, expect, it } from 'vitest';
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

it('initializes at 0', () => {
  // Act
  const money = statistic.getStatistic('money');
  const number = statistic.getMapStatistic('numbers', 0);
  const monster = statistic.getMapStatistic('monsters', 'zombie');

  // Assert
  expect(money).toBe(0);
  expect(number).toBe(0);
  expect(monster).toBe(0);
});

it('increments with a delta', () => {
  // Act
  statistic.incrementStatistic('money', 2);
  statistic.incrementMapStatistic('numbers', 0, 3);
  statistic.incrementMapStatistic('monsters', 'zombie', 4);

  const money = statistic.getStatistic('money');
  const number = statistic.getMapStatistic('numbers', 0);
  const monster = statistic.getMapStatistic('monsters', 'zombie');

  // Assert
  expect(money).toBe(2);
  expect(number).toBe(3);
  expect(monster).toBe(4);
});

it('increments with a default of 1', () => {
  // Act
  statistic.incrementStatistic('money');
  statistic.incrementMapStatistic('numbers', 0);
  statistic.incrementMapStatistic('monsters', 'zombie');

  const money = statistic.getStatistic('money');
  const number = statistic.getMapStatistic('numbers', 0);
  const monster = statistic.getMapStatistic('monsters', 'zombie');

  // Assert
  expect(money).toBe(1);
  expect(number).toBe(1);
  expect(monster).toBe(1);
});

it('returns map objects', () => {
  // Arrange
  statistic.incrementMapStatistic('numbers', 'first', 2);
  statistic.incrementMapStatistic('numbers', 'second', 3);

  // Act
  const numbers = statistic.getMapStatisticObject('numbers');

  // Assert
  expect(numbers).toEqual({
    first: 2,
    second: 3,
  });
});
