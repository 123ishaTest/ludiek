import { BaseConditionShape, LudiekCondition } from '@ludiek/engine/condition/LudiekCondition';
import { StatisticPlugin } from '@ludiek/plugins/statistic/StatisticPlugin';

interface HasStatisticConditionShape extends BaseConditionShape {
  type: '/condition/has-statistic';
  id: string;
  amount: number;
}

export class HasStatisticCondition extends LudiekCondition<HasStatisticConditionShape> {
  readonly type = '/condition/has-statistic';

  private _statistic: StatisticPlugin;

  constructor(statistic: StatisticPlugin) {
    super();
    this._statistic = statistic;
  }

  evaluate(condition: HasStatisticConditionShape): boolean {
    return this._statistic.getStatistic(condition.id) >= condition.amount;
  }
}
