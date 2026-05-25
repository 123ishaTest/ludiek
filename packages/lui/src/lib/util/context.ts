import { LudiekIntrospector, type AnyEngine, type LudiekIntrospection } from '@123ishatest/ludiek';
import { getContext, setContext } from 'svelte';
import { ContentRenderRegistryNotFoundError, EngineNotFoundError, IntrospectionNotFoundError } from './LuiError.js';
import type { LuiContentRenderRegistry } from '$lib/components/content/render/LuiContentRenderRegistry';

export const LUI_ENGINE_KEY = 'LUI_ENGINE';
export const LUI_INTROSPECTION_KEY = 'LUI_INTROSPECTION';
export const LUI_CONTENT_RENDER_REGISTRY_KEY = 'LUI_CONTENT_RENDER_REGISTRY_KEY';

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

export const setContentREnderRegistry = (registry: () => LuiContentRenderRegistry) => {
  setContext(LUI_CONTENT_RENDER_REGISTRY_KEY, registry);
};

export const getContentRenderRegistry = (): LuiContentRenderRegistry => {
  const registry = getContext<() => LuiContentRenderRegistry>(LUI_CONTENT_RENDER_REGISTRY_KEY);
  if (!registry) {
    throw new ContentRenderRegistryNotFoundError(
      'Could not get registry from the context. Make sure you only use Lui components within a LuiContext',
    );
  }
  return registry();
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
