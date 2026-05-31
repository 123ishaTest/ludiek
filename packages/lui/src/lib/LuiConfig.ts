import type { Component } from 'svelte';

export interface LuiToolbarConfig {
  isEnabled: boolean;
  items: {
    key: string;
    component: Component;
    order?: number;
  }[];
}

export interface LuiContentRegistryConfig {
  renderers: Record<string, Component<{ value: never }>>;
}

export interface LuiConfig {
  toggleKeys: string[];
  openVisible: boolean;

  // TODO(@Isha): Add builder for pages
  pages: null;
  content: LuiContentRegistryConfig;
  toolbar: LuiToolbarConfig;
}
