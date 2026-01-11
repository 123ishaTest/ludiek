import { type CurrencyDefinition, type CurrencyPlugin } from '@123ishatest/ludiek';
import { getEngine } from '$lib/util/getEngine.js';

export class CurrencyState implements CurrencyDefinition {
	private _engine = getEngine<{ plugins: [CurrencyPlugin] }>();
	constructor(private readonly _id: string) {}

	public get onCurrencyGain(): this['currency']['onCurrencyGain'] {
		return this.currency.onCurrencyGain;
	}

	public get onCurrencyChange(): this['currency']['onCurrencyChange'] {
		return this.currency.onCurrencyChange;
	}

	public get currency(): CurrencyPlugin {
		return this._engine.plugins.currency;
	}

	private get definition(): CurrencyDefinition {
		return this.currency.getCurrency(this._id);
	}

	public get id(): string {
		return this.definition.id;
	}

	public get amount(): number {
		return this.currency.getBalance(this._id);
	}
}
