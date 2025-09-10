import { BaseConditionShape, LudiekCondition } from '@ludiek/engine/condition/LudiekCondition';
import { StatisticPlugin } from '@ludiek/plugins/statistic/StatisticPlugin';

interface HasMapStatisticConditionShape extends BaseConditionShape {
  type: '/condition/has-map-statistic';
  id: string;
  key: string;
  amount: number;
}

export class HasMapStatisticCondition extends LudiekCondition<HasMapStatisticConditionShape> {
  readonly type = '/condition/has-map-statistic';

  private _statistic: StatisticPlugin;

  constructor(statistic: StatisticPlugin) {
    super();
    this._statistic = statistic;
  }

  evaluate(condition: HasMapStatisticConditionShape): boolean {
    return this._statistic.getMapStatistic(condition.id, condition.key) >= condition.amount;
  }
}
