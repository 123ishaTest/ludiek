import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';
import {
  InvalidStatisticTypeError,
  UnknownMapStatisticError,
  UnknownStatisticError,
} from '@ludiek/plugins/statistic/StatisticErrors';
import { createStatisticState, StatisticPluginState } from '@ludiek/plugins/statistic/StatisticPluginState';

export interface StatisticDefinition {
  id: string;
  type: 'scalar' | 'map';
}

export class StatisticPlugin extends LudiekPlugin {
  readonly name = 'statistic';

  protected _state: StatisticPluginState;
  public readonly controllers = [];

  constructor(state: StatisticPluginState = createStatisticState()) {
    super();
    this._state = state;
  }

  public loadContent(statistics: StatisticDefinition[]): void {
    statistics.forEach((statistic) => {
      switch (statistic.type) {
        case 'scalar':
          this._state.scalar[statistic.id] = 0;
          break;
        case 'map':
          this._state.map[statistic.id] = {};
          break;
        default:
          throw new InvalidStatisticTypeError(
            `Statistic type '${(statistic as { type: string }).type}' is not supported`,
          );
      }
    });
  }

  public getStatistic(id: string): number {
    if (!(id in this._state.scalar)) {
      throw new UnknownStatisticError(`Unknown statistic with id '${id}'`);
    }
    return this._state.scalar[id];
  }

  public getMapStatistic(id: string, key: string | number): number {
    if (!(id in this._state.map)) {
      throw new UnknownMapStatisticError(`Unknown map statistic with id '${id}'`);
    }
    return this._state.map[id][key] ?? 0;
  }

  public getMapStatisticObject(id: string): Record<string | number, number> {
    return this._state.map[id];
  }

  /**
   * Increment a statistic with an amount of delta
   */
  public incrementStatistic(id: string, delta: number = 1): void {
    this._state.scalar[id] += delta;
  }

  /**
   * Increment a map statistic with an amount of delta
   */
  public incrementMapStatistic(id: string, key: string | number, delta: number = 1): void {
    this._state.map[id][key] = this.getMapStatistic(id, key) + delta;
  }
}
