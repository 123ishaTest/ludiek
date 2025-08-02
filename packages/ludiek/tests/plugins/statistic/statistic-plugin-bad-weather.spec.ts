import { beforeEach, describe, expect, it } from 'vitest';
import { StatisticPlugin } from '@ludiek/plugins/statistic/StatisticPlugin';
import {
  InvalidStatisticTypeError,
  UnknownMapStatisticError,
  UnknownStatisticError,
} from '@ludiek/plugins/statistic/StatisticErrors';

const statisticContent = [
  { id: 'money', type: 'scalar' },
  { id: 'numbers', type: 'map' },
  { id: 'monsters', type: 'map' },
] as const;

let statistic = new StatisticPlugin(statisticContent);
beforeEach(() => {
  statistic = new StatisticPlugin(statisticContent);
});

describe('Bad flow', () => {
  it('throws an error when passing a wrong statistic type', () => {
    // Arrange
    expect(() => {
      new StatisticPlugin([
        // @ts-expect-error 'wrong' is not a valid type
        { id: 'wrong', type: 'wrong' },
      ]);
    }).toThrow(InvalidStatisticTypeError);
  });

  it('throws an error when accessing an unknown statistic ', () => {
    // @ts-expect-error 'numbers' is not a valid StatisticId
    expect(() => statistic.getStatistic('numbers')).toThrow(UnknownStatisticError);
  });

  it('throws an error when accessing an unknown mapStatistic ', () => {
    // @ts-expect-error 'money' is not a valid MapStatisticId
    expect(() => statistic.getMapStatistic('money')).toThrow(UnknownMapStatisticError);
  });
});
