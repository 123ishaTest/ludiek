import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';

import { LudiekElement } from '@ludiek/engine/LudiekElement';

export abstract class LudiekFeature<Plugins extends Record<string, LudiekPlugin>> extends LudiekElement {
  protected _plugins!: Plugins;

  public init(plugins: Plugins) {
    this._plugins = plugins;
  }

  /**
   * Called every tick
   * @param delta how much time has passed in seconds
   */
  update?(delta: number): void;
}
