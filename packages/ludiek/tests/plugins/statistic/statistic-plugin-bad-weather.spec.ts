import { beforeEach, describe, expect, it } from 'vitest';
import { StatisticDefinition, StatisticPlugin } from '@ludiek/plugins/statistic/StatisticPlugin';
import {
  InvalidStatisticTypeError,
  UnknownMapStatisticError,
  UnknownStatisticError,
} from '@ludiek/plugins/statistic/StatisticErrors';

const statistic = new StatisticPlugin();
const statisticContent: StatisticDefinition[] = [
  { id: '/statistic/money', type: 'scalar' },
  { id: '/statistic/numbers', type: 'map' },
  { id: '/statistic/monsters', type: 'map' },
] as const;

beforeEach(() => {
  statistic.loadContent(statisticContent);
});

describe('Bad flow', () => {
  it('throws an error when passing a wrong statistic type', () => {
    // Arrange
    expect(() => {
      statistic.loadContent([
        // @ts-expect-error 'wrong' is not a valid type
        { id: 'wrong', type: 'wrong' },
      ]);
    }).toThrow(InvalidStatisticTypeError);
  });

  it('throws an error when accessing an unknown statistic ', () => {
    expect(() => statistic.getStatistic('/statistic/numbers')).toThrow(UnknownStatisticError);
  });

  it('throws an error when accessing an unknown mapStatistic ', () => {
    // @ts-expect-error '/statistic/money' is not a valid MapStatisticId
    expect(() => statistic.getMapStatistic('/statistic/money')).toThrow(UnknownMapStatisticError);
  });
});
