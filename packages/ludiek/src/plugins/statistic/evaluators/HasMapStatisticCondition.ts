import { BaseConditionShape, LudiekCondition } from '@ludiek/engine/LudiekCondition';
import { MapStatisticId, StatisticDetail, StatisticPlugin } from '@ludiek/plugins/statistic/StatisticPlugin';

interface HasMapStatisticConditionShape<MapStatisticId> extends BaseConditionShape {
  type: 'has-map-statistic';
  id: MapStatisticId;
  key: string;
  amount: number;
}

export class HasMapStatisticCondition<Details extends readonly StatisticDetail[]>
  implements LudiekCondition<HasMapStatisticConditionShape<MapStatisticId<Details>>>
{
  readonly type: string = 'has-map-statistic';

  private _statistic: StatisticPlugin<Details>;

  constructor(statistic: StatisticPlugin<Details>) {
    this._statistic = statistic;
  }

  evaluate(condition: HasMapStatisticConditionShape<MapStatisticId<Details>>): boolean {
    return this._statistic.getMapStatistic(condition.id, condition.key) >= condition.amount;
  }
}
