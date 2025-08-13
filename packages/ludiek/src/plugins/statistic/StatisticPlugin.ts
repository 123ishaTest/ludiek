import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';
import {
  InvalidStatisticTypeError,
  UnknownMapStatisticError,
  UnknownStatisticError,
} from '@ludiek/plugins/statistic/StatisticErrors';

export type StatisticDetail = { id: string; type: 'scalar' } | { id: string; type: 'map' };

export type StatisticId<Details extends readonly StatisticDetail[]> = Extract<
  Details[number],
  { type: 'scalar' }
>['id'];
export type MapStatisticId<Details extends readonly StatisticDetail[]> = Extract<
  Details[number],
  { type: 'map' }
>['id'];

export class StatisticPlugin<Details extends readonly StatisticDetail[]> extends LudiekPlugin {
  readonly name = 'statistic';

  private _scalarStatistics: Record<string, number> = {};
  private _mapStatistics: Record<string, Record<string, number>> = {};

  constructor(readonly statistics: Details) {
    super();

    statistics.forEach((statistic) => {
      switch (statistic.type) {
        case 'scalar':
          this._scalarStatistics[statistic.id] = 0;
          break;
        case 'map':
          this._mapStatistics[statistic.id] = {};
          break;
        default:
          throw new InvalidStatisticTypeError(
            `Statistic type '${(statistic as { type: string }).type}' is not supported`,
          );
      }
    });
  }

  public getStatistic(id: StatisticId<Details>): number {
    if (!(id in this._scalarStatistics)) {
      throw new UnknownStatisticError(`Unknown statistic with id '${id}'`);
    }
    return this._scalarStatistics[id];
  }

  public getMapStatistic(id: MapStatisticId<Details>, key: string | number): number {
    if (!(id in this._mapStatistics)) {
      throw new UnknownMapStatisticError(`Unknown map statistic with id '${id}'`);
    }
    return this._mapStatistics[id][key] ?? 0;
  }

  public getMapStatisticObject(id: MapStatisticId<Details>): Record<string | number, number> {
    return this._mapStatistics[id];
  }

  /**
   * Increment a statistic with an amount of delta
   */
  public incrementStatistic(id: StatisticId<Details>, delta: number = 1): void {
    this._scalarStatistics[id] += delta;
  }

  /**
   * Increment a map statistic with an amount of delta
   */
  public incrementMapStatistic(id: MapStatisticId<Details>, key: string | number, delta: number = 1): void {
    this._mapStatistics[id][key] = this.getMapStatistic(id, key) + delta;
  }
}
