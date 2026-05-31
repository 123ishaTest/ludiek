import { type AnyEngine, type LudiekIntrospection, LudiekIntrospector } from '@123ishatest/ludiek';
import { createContext } from 'svelte';
import { ConfigNotFoundError, EngineNotFoundError, IntrospectionNotFoundError } from '$lui/util/LuiError';
import type { LuiConfig } from '$lui/LuiConfig';

export const [getEngineContext, setEngineContext] = createContext<AnyEngine>();
export const [getConfigContext, setConfigContext] = createContext<LuiConfig>();
export const [getIntrospectionContext, setIntrospectionContext] = createContext<LudiekIntrospection>();

export const getEngine = (): AnyEngine => {
  const engine = getEngineContext();
  if (!engine) {
    throw new EngineNotFoundError(
      'Could not get engine from the context. Make sure you only use Lui components within a LuiContext',
    );
  }
  return engine;
};

export const setEngine = (engine: AnyEngine) => {
  const introspection = new LudiekIntrospector(engine).introspect();
  setEngineContext(engine);
  setIntrospectionContext(introspection);
};

export const getIntrospection = (): LudiekIntrospection => {
  const introspection = getIntrospectionContext();
  if (!introspection) {
    throw new IntrospectionNotFoundError(
      'Could not get introspection from the context. Make sure you only use Lui components within a LuiContext',
    );
  }
  return introspection;
};

export const getConfig = (): LuiConfig => {
  const config = getConfigContext();
  if (!config) {
    throw new ConfigNotFoundError(
      'Could not get config from the context. Make sure you only use Lui components within a LuiContext',
    );
  }
  return config;
};

export const isDebug = (): boolean => {
  return getEngine().debug;
};
