import { LudiekIntrospector, type AnyEngine, type LudiekIntrospection } from '@123ishatest/ludiek';
import { getContext, setContext } from 'svelte';
import { EngineNotFoundError, IntrospectionNotFoundError } from '$lib/util/LuiError.js';

export const LUI_ENGINE_KEY = 'LUI_ENGINE';
export const LUI_INTROSPECTION_KEY = 'LUI_INTROSPECTION';

type EngineGetter = () => AnyEngine;

export const getEngine = (): AnyEngine => {
  const engine = getContext<EngineGetter>(LUI_ENGINE_KEY);
  if (!engine) {
    throw new EngineNotFoundError(
      'Could not get engine from the context. Make sure you only use Lui components within a LuiContext',
    );
  }
  return engine();
};

export const setEngine = (engine: EngineGetter) => {
  setContext(LUI_ENGINE_KEY, engine);
  const introspection = new LudiekIntrospector(engine()).introspect();
  setContext(LUI_INTROSPECTION_KEY, introspection);
};

export const getIntrospection = (): LudiekIntrospection => {
  const introspection = getContext<LudiekIntrospection>(LUI_INTROSPECTION_KEY);
  if (!introspection) {
    throw new IntrospectionNotFoundError(
      'Could not get introspection from the context. Make sure you only use Lui components within a LuiContext',
    );
  }
  return introspection;
};

export const isDebug = (): boolean => {
  return getEngine().debug;
};
