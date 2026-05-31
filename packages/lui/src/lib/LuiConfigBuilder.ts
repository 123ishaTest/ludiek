import type { LuiConfig } from '$lui/LuiConfig';
import LuiContentToolbarEntry from '$lui/components/toolbar/stdlib/LuiContentToolbarEntry.svelte';
import LuiFeatureToolbarEntry from '$lui/components/toolbar/stdlib/LuiFeatureToolbarEntry.svelte';
import LuiPluginToolbarEntry from '$lui/components/toolbar/stdlib/LuiPluginToolbarEntry.svelte';
import LuiToolbarTimeScaleEntry from '$lui/components/toolbar/stdlib/LuiToolbarTimeScaleEntry.svelte';
import type { Component } from 'svelte';
import LuiContentRenderString from '$lui/components/content/render/LuiContentRenderString.svelte';
import LuiContentRenderNumber from '$lui/components/content/render/LuiContentRenderNumber.svelte';
import LuiContentRenderObject from '$lui/components/content/render/LuiContentRenderObject.svelte';
import LuiConditionToolbarEntry from '$lui/components/toolbar/stdlib/LuiConditionToolbarEntry.svelte';
import LuiBonusToolbarEntry from '$lui/components/toolbar/stdlib/LuiBonusToolbarEntry.svelte';
import LuiRequestToolbarEntry from '$lui/components/toolbar/stdlib/LuiRequestToolbarEntry.svelte';
import LuiOutputToolbarEntry from '$lui/components/toolbar/stdlib/LuiOutputToolbarEntry.svelte';
import LuiInputToolbarEntry from '$lui/components/toolbar/stdlib/LuiInputToolbarEntry.svelte';

export class LuiConfigBuilder {
  private static DEFAULT_TOOLBAR_ORDER = 200;

  private readonly _config: Required<LuiConfig> = {
    openVisible: false,
    toggleKeys: ['`'],
    pages: null,
    content: {
      renderers: {
        string: LuiContentRenderString,
        number: LuiContentRenderNumber,
        object: LuiContentRenderObject,
      },
    },
    toolbar: {
      isEnabled: true,
      items: [
        { key: 'lui/content', component: LuiContentToolbarEntry, order: 10 },
        { key: 'lui/feature', component: LuiFeatureToolbarEntry, order: 20 },
        { key: 'lui/plugin', component: LuiPluginToolbarEntry, order: 30 },
        { key: 'lui/condition', component: LuiConditionToolbarEntry, order: 30 },
        { key: 'lui/input', component: LuiInputToolbarEntry, order: 40 },
        { key: 'lui/output', component: LuiOutputToolbarEntry, order: 50 },
        { key: 'lui/request', component: LuiRequestToolbarEntry, order: 60 },
        { key: 'lui/bonus', component: LuiBonusToolbarEntry, order: 70 },
        { key: 'lui/time-scale', component: LuiToolbarTimeScaleEntry, order: 200 },
      ],
    },
  };

  public openVisible(value: boolean = true): this {
    this._config.openVisible = value;
    return this;
  }

  public withToolbar(value: boolean): this {
    this._config.toolbar.isEnabled = value;
    return this;
  }

  public setToggleKeys(keys: string[]): this {
    this._config.toggleKeys = keys;
    return this;
  }

  /**
   * Remove an item from the toolbar
   */
  public addToolbarItem(
    key: string,
    component: Component,
    order: number = LuiConfigBuilder.DEFAULT_TOOLBAR_ORDER,
  ): this {
    this._config.toolbar.items.push({ key, component, order });

    this.sortToolbar();
    return this;
  }

  /**
   * Remove an item from the toolbar
   * @param key
   */
  public removeToolbarItem(key: string): this {
    this._config.toolbar.items = this._config.toolbar.items.filter((toolbarItem) => toolbarItem.key !== key);
    return this;
  }

  public setToolbarOrder(key: string, order: number): this {
    const item = this._config.toolbar.items.find((item) => item.key === key);
    if (!item) {
      return this;
    }
    item.order = order;

    this.sortToolbar();
    return this;
  }

  private sortToolbar(): void {
    this._config.toolbar.items.sort(
      (a, b) =>
        (a.order ?? LuiConfigBuilder.DEFAULT_TOOLBAR_ORDER) - (b.order ?? LuiConfigBuilder.DEFAULT_TOOLBAR_ORDER),
    );
  }

  public setContentRenderer(kind: string, component: Component<{ value: never }>): this {
    this._config.content.renderers[kind] = component;
    return this;
  }

  public build(): LuiConfig {
    return this._config;
  }
}
