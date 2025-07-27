import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';

export class StatisticPlugin<StatisticId extends string, MapStatisticId extends string> extends LudiekPlugin {
  readonly name = 'statistic';

  private _scalarStatistics: Record<string, number> = {};
  private _mapStatistics: Record<string, Record<string, number>> = {};

  constructor(statistics: { scalar: readonly { id: StatisticId }[]; map: readonly { id: MapStatisticId }[] }) {
    super();

    statistics.scalar.forEach((statistic) => {
      this._scalarStatistics[statistic.id] = 0;
    });

    statistics.map.forEach((statistic) => {
      this._mapStatistics[statistic.id] = {};
    });
  }

  public getStatistic(id: StatisticId): number;
  public getStatistic(id: MapStatisticId, index: number): number;
  public getStatistic(id: MapStatisticId, key: string): number;
  public getStatistic(id: StatisticId | MapStatisticId, key?: number | string): number {
    if (key == undefined) {
      return this._scalarStatistics[id];
    }
    return this._mapStatistics[id][key] ?? 0;
  }
}
