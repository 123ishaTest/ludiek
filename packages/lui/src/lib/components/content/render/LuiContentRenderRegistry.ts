import type { Component } from 'svelte';
import LuiContentRenderString from './LuiContentRenderString.svelte';
import LuiContentRenderNumber from './LuiContentRenderNumber.svelte';
import LuiContentRenderObject from './LuiContentRenderObject.svelte';

export type LuiContentRenderRegistry = Record<string, Component<{ value: never }>>;

export const defaultContentRenderRegistry: LuiContentRenderRegistry = {
  string: LuiContentRenderString,
  number: LuiContentRenderNumber,
  object: LuiContentRenderObject,
};
