import { getContext, setContext } from 'svelte';
import { type DependencyEngine, type LudiekDependencies } from '@123ishatest/ludiek';
import { EngineNotFound } from '$lib/LuiErrors.js';

export const ENGINE_KEY = 'engine';

export const getEngine = <
	Dependencies extends LudiekDependencies
>(): DependencyEngine<Dependencies> => {
	const engine = getContext<DependencyEngine<Dependencies>>(ENGINE_KEY);
	if (!engine) {
		throw new EngineNotFound(
			'Engine is not set in the svelte context. Make sure to call `setEngine(engine)`'
		);
	}
	return engine;
};

export const setEngine = <Dependencies extends LudiekDependencies>(
	engine: DependencyEngine<Dependencies>
): void => {
	setContext('engine', engine);
};
