import { Feature } from '#ludiek/features/Feature';
import type { StatisticId } from '#ludiek/features/statistics/content/StatisticId';
import type { StatisticState } from '#ludiek/features/statistics/state/StatisticState';
import { StatisticRequirementDefinition } from '#ludiek/features/statistics/requirements/StatisticRequirement';
import { type StatisticDetail, StatisticDetailSchema } from '#ludiek/features/statistics/content/StatisticDetail';

/**
 * Statistics class to keep track of increasing numbers
 */
export class Statistics extends Feature {
  protected _state: {
    statistics: Record<StatisticId, StatisticState>;
  } = {
    statistics: {},
  };

  constructor() {
    super('statistics');
  }

  configure(): void {
    this._engine.requirements.register(new StatisticRequirementDefinition());
  }

  content(): void {
    this._engine.addContent('stat', StatisticDetailSchema);
  }

  increment(id: StatisticId, amount = 1): void {
    if (!this.has(id)) {
      console.warn(`Could not find statistic with id ${id}`);
      return;
    }
    this._state.statistics[id].add(amount);
  }

  public get(id: StatisticId): StatisticState {
    if (!this.has(id)) {
      throw new Error(`Could not find statistic with id ${id}`);
    } else {
      return this._state.statistics[id];
    }
  }

  private has(id: StatisticId): boolean {
    return id in this.statisticDetails;
  }

  private get statisticDetails(): StatisticDetail[] {
    return this._content.statistics;
  }
}
