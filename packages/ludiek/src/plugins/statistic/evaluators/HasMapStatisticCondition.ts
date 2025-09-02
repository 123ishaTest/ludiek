import { BaseConditionShape, LudiekCondition } from '@ludiek/engine/LudiekCondition';
import { StatisticPlugin } from '@ludiek/plugins/statistic/StatisticPlugin';

interface HasMapStatisticConditionShape extends BaseConditionShape {
  type: 'has-map-statistic';
  id: string;
  key: string;
  amount: number;
}

export class HasMapStatisticCondition implements LudiekCondition<HasMapStatisticConditionShape> {
  readonly type = 'has-map-statistic';

  private _statistic: StatisticPlugin;

  constructor(statistic: StatisticPlugin) {
    this._statistic = statistic;
  }

  evaluate(condition: HasMapStatisticConditionShape): boolean {
    return this._statistic.getMapStatistic(condition.id, condition.key) >= condition.amount;
  }
}
