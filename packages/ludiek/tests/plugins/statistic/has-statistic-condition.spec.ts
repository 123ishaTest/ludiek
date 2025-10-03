import { beforeEach, describe, expect, it } from 'vitest';
import { StatisticDefinition, StatisticPlugin } from '@ludiek/plugins/statistic/StatisticPlugin';
import { HasStatisticEvaluator } from '@ludiek/plugins/statistic/HasStatisticCondition';
import { UnknownStatisticError } from '@ludiek/plugins/statistic/StatisticErrors';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';

const statistic = new StatisticPlugin();
const condition = new HasStatisticEvaluator();

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

describe('Has Statistic Condition', () => {
  it('evaluates to true on statistics we have', () => {
    // Arrange
    statistic.incrementStatistic('/statistic/money', 3);

    // Act
    const has3Money = condition.evaluate({
      type: '/condition/has-statistic',
      id: '/statistic/money',
      amount: 3,
    });
    const has4Money = condition.evaluate({
      type: '/condition/has-statistic',
      id: '/statistic/money',
      amount: 4,
    });

    // Assert
    expect(has3Money).toBe(true);
    expect(has4Money).toBe(false);
  });

  it('retains full type-safety', () => {
    // Arrange
    expect(() => {
      condition.evaluate({
        // @ts-expect-error 'wrong' is not a StatisticId
        type: 'wrong',
        // @ts-expect-error Type string is not assignable to type number
        amount: 'number',
      });
    }).toThrow(UnknownStatisticError);

    condition.evaluate({
      type: '/condition/has-statistic',
      id: '/statistic/money',
      amount: 0,
      // @ts-expect-error Object literal may only specify known properties
      unknown: 'unknown',
    });
  });
});
