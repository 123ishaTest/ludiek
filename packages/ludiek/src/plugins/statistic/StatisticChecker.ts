import { StatisticDetail, StatisticPlugin } from '@ludiek/plugins/statistic/StatisticPlugin';
import { RequirementChecker } from '@ludiek/engine/LudiekRequirement';

export interface StatisticRequirement<StatisticId> {
  type: 'statistic';
  id: StatisticId;
  value: number;
}

export class StatisticChecker<ScalarStatisticId extends string, MapStatisticId extends string>
  implements RequirementChecker<StatisticRequirement<ScalarStatisticId | MapStatisticId>>
{
  readonly type: string = 'statistic';

  // TODO(@Isha): Refactor types?
  private _statistic: StatisticPlugin<StatisticDetail[], ScalarStatisticId, MapStatisticId>;

  constructor(statistic: StatisticPlugin<StatisticDetail[], ScalarStatisticId, MapStatisticId>) {
    this._statistic = statistic;
  }

  has(req: StatisticRequirement<ScalarStatisticId>): boolean {
    return this._statistic.getStatistic(req.id) >= req.value;
  }
}
