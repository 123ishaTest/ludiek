import { type ScalarStatisticDefinition, type StatisticPlugin } from '@123ishatest/ludiek';
import { getEngine } from '$lib/util/getEngine.js';

/**
 * State object which combines the provided definition with the statistic state
 */
export class ScalarStatisticState {
	private _engine = getEngine<{ plugins: [StatisticPlugin] }>();
	constructor(private readonly _id: string) {}

	public get definition(): ScalarStatisticDefinition {
		return this.statistic.getStatistic(this._id) as ScalarStatisticDefinition;
	}

	public get value(): number {
		return this.statistic.getScalarValue(this._id);
	}

	private get statistic(): StatisticPlugin {
		return this._engine.plugins.statistic;
	}
}
