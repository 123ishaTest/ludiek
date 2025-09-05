import { beforeEach, describe, expect, it } from 'vitest';
import { StatisticDefinition, StatisticPlugin } from '@ludiek/plugins/statistic/StatisticPlugin';
import { HasStatisticCondition } from '@ludiek/plugins/statistic/HasStatisticCondition';
import { UnknownStatisticError } from '@ludiek/plugins/statistic/StatisticErrors';

const statistic = new StatisticPlugin();
const statisticContent: StatisticDefinition[] = [
  { id: 'money', type: 'scalar' },
  { id: 'numbers', type: 'map' },
  { id: 'monsters', type: 'map' },
] as const;

beforeEach(() => {
  statistic.loadContent(statisticContent);
});

describe('Has Statistic Condition', () => {
  it('evaluates to true on statistics we have', () => {
    // Arrange
    statistic.incrementStatistic('money', 3);
    const condition = new HasStatisticCondition(statistic);

    // Act
    const has3Money = condition.evaluate({
      type: 'has-statistic',
      id: 'money',
      amount: 3,
    });
    const has4Money = condition.evaluate({
      type: 'has-statistic',
      id: 'money',
      amount: 4,
    });

    // Assert
    expect(has3Money).toBe(true);
    expect(has4Money).toBe(false);
  });

  it('retains full type-safety', () => {
    // Arrange
    const condition = new HasStatisticCondition(statistic);

    expect(() => {
      condition.evaluate({
        // @ts-expect-error 'wrong' is not a StatisticId
        type: 'wrong',
        // @ts-expect-error Type string is not assignable to type number
        amount: 'number',
      });
    }).toThrow(UnknownStatisticError);

    condition.evaluate({
      type: 'has-statistic',
      id: 'money',
      amount: 0,
      // @ts-expect-error Object literal may only specify known properties
      unknown: 'unknown',
    });
  });
});
