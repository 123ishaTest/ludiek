import { BaseConditionShape, LudiekCondition } from '@ludiek/engine/LudiekCondition';
import { StatisticDetail, StatisticId, StatisticPlugin } from '@ludiek/plugins/statistic/StatisticPlugin';

interface HasStatisticConditionShape<StatisticId> extends BaseConditionShape {
  type: 'has-statistic';
  id: StatisticId;
  amount: number;
}

export class HasStatisticCondition<Details extends readonly StatisticDetail[]>
  implements LudiekCondition<HasStatisticConditionShape<StatisticId<Details>>>
{
  readonly type: string = 'has-statistic';

  private _statistic: StatisticPlugin<Details>;

  constructor(statistic: StatisticPlugin<Details>) {
    this._statistic = statistic;
  }

  evaluate(condition: HasStatisticConditionShape<StatisticId<Details>>): boolean {
    return this._statistic.getStatistic(condition.id) >= condition.amount;
  }
}
