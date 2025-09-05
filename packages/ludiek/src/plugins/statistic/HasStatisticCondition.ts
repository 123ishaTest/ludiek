import { BaseConditionShape, LudiekCondition } from '@ludiek/engine/condition/LudiekCondition';
import { StatisticPlugin } from '@ludiek/plugins/statistic/StatisticPlugin';

interface HasStatisticConditionShape extends BaseConditionShape {
  type: 'has-statistic';
  id: string;
  amount: number;
}

export class HasStatisticCondition implements LudiekCondition<HasStatisticConditionShape> {
  readonly type = 'has-statistic';

  private _statistic: StatisticPlugin;

  constructor(statistic: StatisticPlugin) {
    this._statistic = statistic;
  }

  evaluate(condition: HasStatisticConditionShape): boolean {
    return this._statistic.getStatistic(condition.id) >= condition.amount;
  }
}
